import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { logger } from "./logger";
import { AuthenticatedUser } from "./auth";

const DB_PATH = path.join(process.cwd(), "data", "runtime-db.json");

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  preferences: string;
  travelDates?: string;
  groupSize?: number;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed";
  createdAt: string;
}

export interface UploadedFileRecord {
  id: string;
  filename: string;
  url: string;
  size: number;
  uploadedAt: string;
}

interface DatabaseShape {
  users: AuthenticatedUser[];
  inquiries: InquiryRecord[];
  payments: PaymentRecord[];
  uploads: UploadedFileRecord[];
}

const defaultDb: DatabaseShape = {
  users: [
    {
      id: "1",
      email: "concierge@mustseegeorgia.com",
      name: "Concierge Admin",
      roles: ["admin", "editor"],
    },
  ],
  inquiries: [],
  payments: [],
  uploads: [],
};

async function readDb(): Promise<DatabaseShape> {
  try {
    const buffer = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(buffer) as DatabaseShape;
  } catch (error) {
    logger.warn("Initializing database file", { scope: "database" });
    await persistDb(defaultDb);
    return defaultDb;
  }
}

async function persistDb(data: DatabaseShape): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function findUserByEmail(email: string): Promise<AuthenticatedUser | null> {
  const db = await readDb();
  return db.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function saveInquiry(record: Omit<InquiryRecord, "id" | "createdAt">): Promise<InquiryRecord> {
  const db = await readDb();
  const inquiry: InquiryRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  db.inquiries.unshift(inquiry);
  await persistDb(db);
  return inquiry;
}

export async function listInquiries(limit = 25): Promise<InquiryRecord[]> {
  const db = await readDb();
  return db.inquiries.slice(0, limit);
}

export async function recordPayment(payment: Omit<PaymentRecord, "id" | "createdAt">): Promise<PaymentRecord> {
  const db = await readDb();
  const record: PaymentRecord = {
    ...payment,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  db.payments.unshift(record);
  await persistDb(db);
  return record;
}

export async function storeUpload(upload: Omit<UploadedFileRecord, "id" | "uploadedAt">): Promise<UploadedFileRecord> {
  const db = await readDb();
  const record: UploadedFileRecord = {
    ...upload,
    id: crypto.randomUUID(),
    uploadedAt: new Date().toISOString(),
  };
  db.uploads.unshift(record);
  await persistDb(db);
  return record;
}

export async function getDashboardSnapshot() {
  const db = await readDb();
  return {
    totalInquiries: db.inquiries.length,
    totalPayments: db.payments.length,
    totalUploads: db.uploads.length,
    lastUpdated: new Date().toISOString(),
  };
}
