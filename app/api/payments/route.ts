import { NextResponse } from "next/server";
import { createPaymentIntent } from "@/src/lib/services/payments";
import { logger } from "@/src/lib/services/logger";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body.amount ?? 0);
    const currency = body.currency ?? "USD";
    const reference = body.reference as string | undefined;
    const intent = await createPaymentIntent({ amount, currency, reference });
    return NextResponse.json(intent);
  } catch (error) {
    logger.error("Failed to create payment intent", error as Error, { scope: "payments" });
    return NextResponse.json({ error: "Unable to create payment" }, { status: 400 });
  }
}
