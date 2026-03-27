import { NextResponse } from "next/server";
import { getAdvayaDb } from "@/app/lib/connect";
import { sanitizeIncomingFlags, mergeEventFlags } from "@/app/lib/eventsCatalog";

const DOC_ID = "event_registration_flags";

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

  const flags = mergeEventFlags(sanitizeIncomingFlags(body));

  const db = await getAdvayaDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database not configured; cannot persist flags" },
      { status: 503 }
    );
  }

  try {
    const col = db.collection("site_settings");
    await col.updateOne(
      { _id: DOC_ID },
      { $set: { flags, updatedAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json({ ok: true, flags });
  } catch (e) {
    console.error("PUT /api/admin/event-settings", e);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
