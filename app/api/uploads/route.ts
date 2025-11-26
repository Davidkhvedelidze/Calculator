import { NextResponse } from "next/server";
import { persistFile } from "@/src/lib/services/storage";
import { logger } from "@/src/lib/services/logger";

export const runtime = "nodejs";
export const maxDuration = 10;

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File exceeds 5MB limit." }, { status: 413 });
  }

  try {
    const { fileName, publicUrl } = await persistFile(file);
    return NextResponse.json({ fileName, url: publicUrl });
  } catch (error) {
    logger.error("Upload failed", error as Error, { scope: "uploads" });
    return NextResponse.json({ error: "Unable to store file" }, { status: 500 });
  }
}
