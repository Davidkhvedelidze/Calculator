"use server";

import { saveInquiry } from "@/src/lib/services/db";
import { logger } from "@/src/lib/services/logger";
import { InquiryInput, validateInquiry } from "@/src/lib/utils/validation";

export async function submitInquiry(formData: FormData) {
  const inquiry: InquiryInput = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    preferences: String(formData.get("preferences") ?? ""),
    travelDates: formData.get("travelDates")?.toString(),
    groupSize: formData.get("groupSize") ? Number(formData.get("groupSize")) : undefined,
  };

  const validation = validateInquiry(inquiry);
  if (!validation.success) {
    logger.warn("Inquiry validation failed", { scope: "inquiries", metadata: { errors: validation.errors } });
    return { success: false, errors: validation.errors };
  }

  const record = await saveInquiry(inquiry);
  logger.info("Inquiry persisted", { scope: "inquiries", metadata: { id: record.id } });
  return { success: true, record };
}
