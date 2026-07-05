import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/portfolios/[slug] — Public API for single portfolio details + related + prev/next
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const portfolioRaw = await prisma.portfolio.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!portfolioRaw || !portfolioRaw.active) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
    }

    let galleryImages: string[] = [];
    let tags: string[] = [];
    try {
      galleryImages = JSON.parse(portfolioRaw.galleryImages || "[]");
    } catch {
      galleryImages = [];
    }
    try {
      tags = JSON.parse(portfolioRaw.tags || "[]");
    } catch {
      tags = [];
    }

    const portfolio = {
      ...portfolioRaw,
      galleryImages,
      tags,
    };

    // Fetch related projects in the same category (excluding current)
    const relatedRaw = await prisma.portfolio.findMany({
      where: {
        active: true,
        categoryId: portfolio.categoryId,
        id: { not: portfolio.id },
      },
      take: 3,
      orderBy: { displayOrder: "asc" },
      include: {
        category: true,
      },
    });

    const related = relatedRaw.map((p) => ({
      ...p,
      galleryImages: JSON.parse(p.galleryImages || "[]"),
      tags: JSON.parse(p.tags || "[]"),
    }));

    // Previous & Next portfolios for pagination navigation
    const prevRaw = await prisma.portfolio.findFirst({
      where: {
        active: true,
        displayOrder: { lt: portfolio.displayOrder },
      },
      orderBy: { displayOrder: "desc" },
      select: { title: true, slug: true, coverImage: true },
    });

    const nextRaw = await prisma.portfolio.findFirst({
      where: {
        active: true,
        displayOrder: { gt: portfolio.displayOrder },
      },
      orderBy: { displayOrder: "asc" },
      select: { title: true, slug: true, coverImage: true },
    });

    return NextResponse.json({
      portfolio,
      related,
      navigation: {
        prev: prevRaw,
        next: nextRaw,
      },
    });
  } catch (error) {
    console.error("Public Portfolio Detail GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio details" }, { status: 500 });
  }
}
