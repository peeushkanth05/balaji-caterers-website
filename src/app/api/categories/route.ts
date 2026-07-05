import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/categories — Public API to fetch all active portfolio categories
export async function GET() {
  try {
    const categories = await prisma.portfolioCategory.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
      include: {
        _count: {
          select: { portfolios: { where: { active: true } } },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Public Categories GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
