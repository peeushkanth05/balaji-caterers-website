import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const logs = await prisma.consentLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 200, // Cap at 200 logs for efficiency
    });
    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Fetch Consent Logs Error:", error);
    return NextResponse.json({ error: "Failed to fetch consent logs" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
