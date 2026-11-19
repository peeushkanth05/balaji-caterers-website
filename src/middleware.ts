import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret =
  process.env.NEXTAUTH_SECRET ||
  "4xQ9nK7!mR2#Lz8$Wf1@Vp6^Hs3&Yt5*Ae9%Ju0?Bg7!Nc4=Rq2" ||
  "7yJrT0h3h4xN9kM8vL2QeA5bC1sF6pZrW8uYdI3nXoKqE7tG9mV2aL5cB0rN4sHx";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Explicit safety bypass for public auth routes and login page
  if (pathname === "/admin/login" || pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  // Check if any NextAuth session cookie is present
  const hasSecureToken = req.cookies.has("__Secure-next-auth.session-token");
  const hasHostToken = req.cookies.has("__Host-next-auth.session-token");
  const hasRegularToken = req.cookies.has("next-auth.session-token");
  const hasAnyCookie = hasSecureToken || hasHostToken || hasRegularToken;

  let token = null;

  if (hasAnyCookie) {
    try {
      // 1. Try secureCookie: true first (standard HTTPS in production)
      token = await getToken({ req, secret, secureCookie: true });

      // 2. Try secureCookie: false (for proxies where req is forwarded as http)
      if (!token) {
        token = await getToken({ req, secret, secureCookie: false });
      }

      // 3. Explicit cookie name override with secureCookie: true
      if (!token && (hasSecureToken || hasHostToken)) {
        token = await getToken({
          req,
          secret,
          cookieName: "__Secure-next-auth.session-token",
          secureCookie: true,
        } as any);
      }

      // 4. Fallback without explicit secureCookie option
      if (!token) {
        token = await getToken({ req, secret });
      }
    } catch (err) {
      token = null;
    }
  }

  // STRICT CHECK: If no valid verified token could be obtained, reject immediately.
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
