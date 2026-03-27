import { getAdvayaDb } from "@/app/lib/connect";

export const MAINTENANCE_DOC_ID = "site_maintenance";

/** When DB is missing or read fails, site stays available (fail-open). */
export async function getMaintenanceEnabled() {
  try {
    const db = await getAdvayaDb();
    if (!db) return false;
    const doc = await db.collection("site_settings").findOne({ _id: MAINTENANCE_DOC_ID });
    return doc?.maintenanceEnabled === true;
  } catch {
    return false;
  }
}
