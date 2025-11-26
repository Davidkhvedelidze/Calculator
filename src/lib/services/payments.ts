import { recordPayment } from "./db";
import { logger } from "./logger";

export interface PaymentRequest {
  amount: number;
  currency?: string;
  reference?: string;
}

export interface PaymentResponse {
  id: string;
  status: "pending" | "succeeded" | "failed";
  approvalUrl?: string;
}

export async function createPaymentIntent(request: PaymentRequest): Promise<PaymentResponse> {
  if (request.amount <= 0) {
    throw new Error("Payment amount must be positive.");
  }

  logger.info("Creating payment intent", {
    scope: "payments",
    metadata: { amount: request.amount, currency: request.currency ?? "USD" },
  });

  const record = await recordPayment({
    amount: request.amount,
    currency: request.currency ?? "USD",
    status: "pending",
  });

  return {
    id: record.id,
    status: record.status,
    approvalUrl: `/payments/confirm/${record.id}`,
  };
}
