import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Explicit safety bypass for public auth routes and login page
  if (pathname === "/admin/login" || pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  const secret = process.env.NEXTAUTH_SECRET;

  // Fail-safe: if NEXTAUTH_SECRET is missing, block protected routes completely
  if (!secret) {
    console.error("CRITICAL: NEXTAUTH_SECRET environment variable is missing.");
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Server authentication configuration error: Secret missing" },
        { status: 500 }
      );
    }
    return new NextResponse(
      "Server configuration error: Authentication secret missing.",
      { status: 500 }
    );
  }

  // Check if any NextAuth session cookie is present
  const hasSecureToken = req.cookies.has("__Secure-next-auth.session-token");
  const hasHostToken = req.cookies.has("__Host-next-auth.session-token");
  const hasRegularToken = req.cookies.has("next-auth.session-token");
  const hasAnyCookie = hasSecureToken || hasHostToken || hasRegularToken;

  let token = null;

  // Only attempt decoding if a session cookie actually exists
  if (hasAnyCookie) {
    try {
      token = await getToken({
        req,
        secret,
        secureCookie: process.env.NODE_ENV === "production" || req.nextUrl.protocol === "https:",
      });

      // Fallback decode attempts for proxy / protocol mismatch
      if (!token && (hasSecureToken || hasHostToken)) {
        token = await getToken({ req, secret, secureCookie: true });
      }

      if (!token && hasRegularToken) {
        token = await getToken({ req, secret, secureCookie: false });
      }
    } catch (err) {
      token = null;
    }
  }

  // STRICT CHECK: If no valid verified token could be obtained, reject immediately.
  // Expired, invalid, or missing tokens will have token === null and are rejected here.
  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Enforce SUPER_ADMIN role for /admin/super/* routes
  if (pathname.startsWith("/admin/super") && token.role !== "SUPER_ADMIN") {
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
