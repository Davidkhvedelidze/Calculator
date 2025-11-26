import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/src/lib/services/auth";

export async function POST() {
  clearSessionCookie();
  return NextResponse.json({ success: true });
}
