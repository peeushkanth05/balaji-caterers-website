import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const pathname = req.nextUrl.pathname;

  if (!secret) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Check if any NextAuth session token exists in request cookies
  const hasSessionToken =
    req.cookies.has("__Secure-next-auth.session-token") ||
    req.cookies.has("next-auth.session-token") ||
    req.cookies.has("__Host-next-auth.session-token");

  // Attempt decoding JWT token with NextAuth getToken
  let token = await getToken({
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

  // If no valid decoded token exists, reject access (redirect web pages to login, return 401 for API)
  if (!token) {
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