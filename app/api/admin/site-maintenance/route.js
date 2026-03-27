import { NextResponse } from "next/server";
import { getAdvayaDb } from "@/app/lib/connect";
import { MAINTENANCE_DOC_ID } from "@/app/lib/siteMaintenance";

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

  const raw = body.maintenanceEnabled;
  if (typeof raw !== "boolean") {
    return NextResponse.json({ error: "maintenanceEnabled must be a boolean" }, { status: 400 });
  }

  const db = await getAdvayaDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database not configured; cannot persist maintenance mode" },
      { status: 503 }
    );
  }

  try {
    const col = db.collection("site_settings");
    await col.updateOne(
      { _id: MAINTENANCE_DOC_ID },
      { $set: { maintenanceEnabled: raw, updatedAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json({ ok: true, maintenanceEnabled: raw });
  } catch (e) {
    console.error("PUT /api/admin/site-maintenance", e);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
