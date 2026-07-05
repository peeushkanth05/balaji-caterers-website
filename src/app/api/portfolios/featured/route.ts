import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/portfolios/featured — Public API for Featured Hero Slider items
export async function GET() {
  try {
    const rawPortfolios = await prisma.portfolio.findMany({
      where: {
        active: true,
        featured: true,
      },
      orderBy: { displayOrder: "asc" },
      include: {
        category: {
          select: {
            categoryName: true,
            slug: true,
            icon: true,
          },
        },
      },
    });

    const portfolios = rawPortfolios.map((p) => {
      let galleryImages: string[] = [];
      let tags: string[] = [];
      try {
        galleryImages = JSON.parse(p.galleryImages || "[]");
      } catch {
        galleryImages = [];
      }
      try {
        tags = JSON.parse(p.tags || "[]");
      } catch {
        tags = [];
      }

      return {
        ...p,
        galleryImages,
        tags,
      };
    });

    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error("Public Featured Portfolios Error:", error);
    return NextResponse.json({ error: "Failed to fetch featured portfolios" }, { status: 500 });
  }
}
