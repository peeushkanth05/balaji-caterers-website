import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const FALLBACK_SECRET = "7yJrT0h3h4xN9kM8vL2QeA5bC1sF6pZrW8uYdI3nXoKqE7tG9mV2aL5cB0rN4sHx";

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET || FALLBACK_SECRET;
  const pathname = req.nextUrl.pathname;

  // Check if any NextAuth session token exists in request cookies
  const hasSessionToken =
    req.cookies.has("__Secure-next-auth.session-token") ||
    req.cookies.has("next-auth.session-token") ||
    req.cookies.has("__Host-next-auth.session-token");

  // Attempt decoding JWT token with NextAuth getToken
  let token = null;
  try {
    token = await getToken({
      req,
      secret,
      secureCookie: process.env.NODE_ENV === "production" || req.nextUrl.protocol === "https:",
    });

    if (!token && hasSessionToken) {
      token = await getToken({ req, secret, secureCookie: true });
    }

    if (!token && hasSessionToken) {
      token = await getToken({ req, secret, secureCookie: false });
    }
  } catch (err) {
    token = null;
  }

  // If no session cookie exists and no valid token could be retrieved, redirect to /admin/login
  if (!token && !hasSessionToken) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protection for Super Admin routes (e.g. /admin/super/*)
  if (pathname.startsWith("/admin/super") && token && token?.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/((?!login).*)",
    "/api/admin/:path*",
  ],
};