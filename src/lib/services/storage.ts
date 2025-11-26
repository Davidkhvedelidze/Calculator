import fs from "node:fs/promises";
import path from "node:path";
import { storeUpload } from "./db";
import { logger } from "./logger";

const uploadDir = path.join(process.cwd(), "public", "uploads");

export async function persistFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.mkdir(uploadDir, { recursive: true });
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, buffer);
  const publicUrl = `/uploads/${fileName}`;
  await storeUpload({ filename: fileName, url: publicUrl, size: buffer.byteLength });
  logger.info("Stored uploaded file", { scope: "uploads", metadata: { fileName, size: buffer.byteLength } });
  return { fileName, publicUrl };
}
