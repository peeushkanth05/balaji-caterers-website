import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/advertisements - Fetch active, scheduled advertisements for public display
export async function GET() {
  try {
    const now = new Date();

    const ads = await prisma.advertisement.findMany({
      where: {
        isEnabled: true,
        OR: [
          // No schedule set — always show
          { startDate: null, endDate: null },
          // Started but no end date
          { startDate: { lte: now }, endDate: null },
          // Has end date but no start date
          { startDate: null, endDate: { gte: now } },
          // Within scheduled window
          { startDate: { lte: now }, endDate: { gte: now } },
        ],
      },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ ads });
  } catch (error) {
    return NextResponse.json({ ads: [] });
  }
}
