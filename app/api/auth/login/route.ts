import { NextResponse } from "next/server";
import { authenticate } from "@/src/features/auth/api/login";
import { Credentials } from "@/src/features/auth/types";
import { logger } from "@/src/lib/services/logger";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<Credentials>;
    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const result = await authenticate({ email: body.email, password: body.password });
    return NextResponse.json({ user: result.user, token: result.token });
  } catch (error) {
    logger.error("Authentication failed", error as Error, { scope: "auth" });
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
