import { NextResponse } from "next/server";
import { getDashboardSnapshot, listInquiries } from "@/src/lib/services/db";
import { logger } from "@/src/lib/services/logger";

export async function GET() {
  try {
    const [snapshot, inquiries] = await Promise.all([getDashboardSnapshot(), listInquiries(10)]);
    return NextResponse.json({ snapshot, inquiries });
  } catch (error) {
    logger.error("Dashboard data failed", error as Error, { scope: "dashboard" });
    return NextResponse.json({ error: "Unable to load dashboard" }, { status: 500 });
  }
}
