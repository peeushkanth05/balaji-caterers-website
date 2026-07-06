import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const authMiddleware = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Protection for Super Admin routes (e.g. /admin/super/*)
    if (pathname.startsWith("/admin/super") && token?.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  },
  {
    secret: process.env.NEXTAUTH_SECRET || "shreebalaji_secret_jwt_key_2026_super_secure",
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export default async function middleware(req: any, event: any) {
  const host = req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  process.env.NEXTAUTH_URL = `${proto}://${host}`;

  return (authMiddleware as any)(req, event);
}

export const config = {
  matcher: [
    "/admin",
    "/admin/dashboard/:path*",
    "/admin/portfolio/:path*",
    "/admin/leads/:path*",
    "/admin/packages/:path*",
    "/admin/services/:path*",
    "/admin/gallery/:path*",
    "/admin/settings/:path*",
    "/admin/super/:path*",
  ],
};