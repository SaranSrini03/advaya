import { NextResponse } from "next/server";
import { getAdvayaDb } from "@/app/lib/connect";
import { mergeEventFlags, defaultEventFlags } from "@/app/lib/eventsCatalog";

const DOC_ID = "event_registration_flags";

export async function GET() {
  try {
    const db = await getAdvayaDb();
    if (!db) {
      return NextResponse.json(
        { flags: defaultEventFlags(), persisted: false },
        { status: 200 }
      );
    }

    const col = db.collection("site_settings");
    const doc = await col.findOne({ _id: DOC_ID });
    const raw = doc?.flags ?? null;
    const flags = mergeEventFlags(raw);

    return NextResponse.json({ flags, persisted: !!doc });
  } catch (e) {
    console.error("GET /api/event-settings", e);
    return NextResponse.json(
      { flags: defaultEventFlags(), persisted: false, error: "read_failed" },
      { status: 200 }
    );
  }
}
