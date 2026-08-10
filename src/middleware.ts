import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET || "7yJrT0h3h4xN9kM8vL2QeA5bC1sF6pZrW8uYdI3nXoKqE7tG9mV2aL5cB0rN4sHx";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Try retrieving token with secureCookie: true first (for production HTTPS on custom domain)
  let token = await getToken({ req, secret, secureCookie: true });
  if (!token) {
    // Fallback to standard cookie lookup (for local dev or proxies)
    token = await getToken({ req, secret, secureCookie: false });
  }

  // If unauthenticated, redirect to /admin/login
  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protection for Super Admin routes (e.g. /admin/super/*)
  if (pathname.startsWith("/admin/super") && token?.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/portfolio/:path*",
    "/admin/leads/:path*",
    "/admin/packages/:path*",
    "/admin/services/:path*",
    "/admin/gallery/:path*",
    "/admin/settings/:path*",
    "/admin/super/:path*",
    "/admin/advertisements/:path*",
    "/admin/alerts/:path*",
    "/admin/blogs/:path*",
    "/admin/clients/:path*",
    "/admin/consent/:path*",
    "/admin/contact/:path*",
    "/admin/faqs/:path*",
    "/admin/footer/:path*",
    "/admin/header/:path*",
    "/admin/hero/:path*",
    "/admin/reports/:path*",
    "/admin/sections/:path*",
    "/admin/social/:path*",
    "/admin/testimonials/:path*",
    "/admin/users/:path*",
    "/admin/venues/:path*",
    "/admin/videos/:path*",
  ],
};