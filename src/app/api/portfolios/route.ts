import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/portfolios — Public API to search, filter, and sort active portfolios
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    const searchQuery = searchParams.get("search");
    const sort = searchParams.get("sort") || "displayOrder"; // "latest" | "oldest" | "title" | "displayOrder" | "featured"
    const featuredOnly = searchParams.get("featured") === "true";

    // Build Prisma query condition
    const whereCondition: any = {
      active: true,
    };

    if (categorySlug && categorySlug !== "all") {
      whereCondition.category = {
        slug: categorySlug,
      };
    }

    if (featuredOnly) {
      whereCondition.featured = true;
    }

    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.trim();
      whereCondition.OR = [
        { title: { contains: q } },
        { shortDescription: { contains: q } },
        { longDescription: { contains: q } },
        { tags: { contains: q } },
      ];
    }

    // Determine orderBy
    let orderBy: any = { displayOrder: "asc" };
    if (sort === "latest") orderBy = { createdAt: "desc" };
    if (sort === "oldest") orderBy = { createdAt: "asc" };
    if (sort === "title") orderBy = { title: "asc" };
    if (sort === "featured") orderBy = [{ featured: "desc" }, { displayOrder: "asc" }];
    if (sort === "displayOrder") orderBy = { displayOrder: "asc" };

    const portfoliosRaw = await prisma.portfolio.findMany({
      where: whereCondition,
      orderBy,
      include: {
        category: {
          select: {
            id: true,
            categoryName: true,
            slug: true,
            icon: true,
          },
        },
      },
    });

    // Safely parse JSON string arrays for galleryImages and tags
    const portfolios = portfoliosRaw.map((p) => {
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
    console.error("Public Portfolios GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolios" }, { status: 500 });
  }
}
