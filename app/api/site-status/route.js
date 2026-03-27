import { NextResponse } from "next/server";
import { getMaintenanceEnabled } from "@/app/lib/siteMaintenance";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const maintenance = await getMaintenanceEnabled();
    return NextResponse.json({ maintenance });
  } catch {
    return NextResponse.json({ maintenance: false });
  }
}
