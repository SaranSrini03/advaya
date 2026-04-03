import { NextResponse } from "next/server";
import { getAdvayaDb } from "@/app/lib/connect";
import { sanitizeStudentCoordinatorNames } from "@/app/lib/studentCoordinatorRoster";

const DOC_ID = "student_coordinator_roster";

function authorize(request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || typeof secret !== "string" || !secret.trim()) {
    return { ok: false, status: 503, message: "ADMIN_SECRET is not configured on the server" };
  }
  const header = request.headers.get("x-admin-secret");
  if (!header || header !== secret) {
    return { ok: false, status: 401, message: "Invalid admin secret" };
  }
  return { ok: true };
}

export async function PUT(request) {
  const auth = authorize(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const names = sanitizeStudentCoordinatorNames(body.names);

  const db = await getAdvayaDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database not configured; cannot persist team roster" },
      { status: 503 }
    );
  }

  try {
    const col = db.collection("site_settings");
    await col.updateOne(
      { _id: DOC_ID },
      { $set: { names, updatedAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json({ ok: true, names });
  } catch (e) {
    console.error("PUT /api/admin/team-roster", e);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
