import { NextResponse } from "next/server";
import { getAdvayaDb } from "@/app/lib/connect";
import {
  defaultStudentCoordinatorNames,
  ensureCoordinatorList,
  sanitizeStudentCoordinatorNames,
} from "@/app/lib/studentCoordinatorRoster";

const DOC_ID = "student_coordinator_roster";

export async function GET() {
  try {
    const db = await getAdvayaDb();
    if (!db) {
      return NextResponse.json({
        names: defaultStudentCoordinatorNames(),
        persisted: false,
      });
    }

    const col = db.collection("site_settings");
    const doc = await col.findOne({ _id: DOC_ID });
    const raw = doc?.names ?? null;
    const names = ensureCoordinatorList(sanitizeStudentCoordinatorNames(raw));

    return NextResponse.json({ names, persisted: !!doc });
  } catch (e) {
    console.error("GET /api/team-roster", e);
    return NextResponse.json(
      {
        names: defaultStudentCoordinatorNames(),
        persisted: false,
        error: "read_failed",
      },
      { status: 200 }
    );
  }
}
