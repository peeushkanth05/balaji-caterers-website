import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export async function requireAdminSession() {
  const session = await getAuthSession();
  if (!session || !session.user) {
    return {
      authorized: false as const,
      errorResponse: NextResponse.json(
        { error: "Authentication required. Please sign in." },
        { status: 401 }
      ),
    };
  }

  return {
    authorized: true as const,
    session,
    user: session.user as {
      id: string;
      name?: string | null;
      email?: string | null;
      role: "SUPER_ADMIN" | "ADMIN";
    },
  };
}

export async function requireSuperAdminSession() {
  const authResult = await requireAdminSession();
  if (!authResult.authorized) {
    return authResult;
  }

  if (authResult.user.role !== "SUPER_ADMIN") {
    return {
      authorized: false as const,
      errorResponse: NextResponse.json(
        { error: "Forbidden. Super Admin privileges required." },
        { status: 403 }
      ),
    };
  }

  return authResult;
}
