import { AuthenticatedUser, createJwt, setSessionCookie } from "@/src/lib/services/auth";
import { findUserByEmail } from "@/src/lib/services/db";
import { logger } from "@/src/lib/services/logger";
import { Credentials, AuthResponse } from "../types";

const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "changeme";

export async function authenticate(credentials: Credentials): Promise<AuthResponse> {
  const user = await findUserByEmail(credentials.email);
  if (!user) {
    logger.warn("Unknown user attempted login", { scope: "auth", metadata: { email: credentials.email } });
    throw new Error("Invalid credentials");
  }

  if (credentials.password !== DEMO_PASSWORD) {
    logger.warn("Incorrect password attempt", { scope: "auth", metadata: { email: credentials.email } });
    throw new Error("Invalid credentials");
  }

  const token = createJwt(user as AuthenticatedUser);
  setSessionCookie(user as AuthenticatedUser);
  return { user, token };
}
