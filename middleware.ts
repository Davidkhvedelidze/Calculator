import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserFromRequest } from "@/src/lib/services/auth";
import { logger } from "@/src/lib/services/logger";

const protectedPaths = [/^\/dashboard/, /^\/api\/dashboard/];

export function middleware(request: NextRequest) {
  const isProtected = protectedPaths.some((pattern) => pattern.test(request.nextUrl.pathname));
  if (!isProtected) return NextResponse.next();

  const user = getUserFromRequest(request);
  if (!user) {
    logger.warn("Blocked unauthorized access", { scope: "middleware", metadata: { path: request.nextUrl.pathname } });
    const url = new URL("/contact", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard"],
};
