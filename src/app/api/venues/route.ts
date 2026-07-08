import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const venues = await prisma.venuePartner.findMany({
      where: { isActive: true },
      orderBy: { priority: "asc" },
    });
    return NextResponse.json({ venues });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch venue partners" }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
