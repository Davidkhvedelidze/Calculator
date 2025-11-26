import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { logger } from "./logger";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

interface TokenPayload extends AuthenticatedUser {
  exp: number;
  iat: number;
}

const JWT_SECRET = process.env.AUTH_SECRET ?? "development-insecure-secret";
const SESSION_COOKIE = "travel_web_session";
const TOKEN_EXPIRY_SECONDS = 60 * 60; // 1 hour

export function createJwt(payload: AuthenticatedUser): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const issuedAt = Math.floor(Date.now() / 1000);
  const body: TokenPayload = { ...payload, iat: issuedAt, exp: issuedAt + TOKEN_EXPIRY_SECONDS };
  const encodedPayload = Buffer.from(JSON.stringify(body)).toString("base64url");
  const signature = sign(`${header}.${encodedPayload}`);
  return `${header}.${encodedPayload}.${signature}`;
}

export function verifyJwt(token: string): AuthenticatedUser | null {
  try {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) return null;
    const expectedSignature = sign(`${header}.${payload}`);
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString()) as TokenPayload;
    if (decoded.exp * 1000 < Date.now()) {
      return null;
    }
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      roles: decoded.roles,
    };
  } catch (error) {
    logger.error("Failed to verify JWT", error as Error, { scope: "auth" });
    return null;
  }
}

function sign(input: string): string {
  return crypto.createHmac("sha256", JWT_SECRET).update(input).digest("base64url");
}

export function setSessionCookie(user: AuthenticatedUser): void {
  const token = createJwt(user);
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TOKEN_EXPIRY_SECONDS,
  });
}

export function clearSessionCookie(): void {
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function getUserFromRequest(request: NextRequest): AuthenticatedUser | null {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyJwt(token);
}

export function isUserAuthorized(user: AuthenticatedUser | null, requiredRoles: string[]): boolean {
  if (!user) return false;
  return requiredRoles.every((role) => user.roles.includes(role));
}
