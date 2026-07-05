import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// GET /api/admin/portfolios — Admin list all portfolios (active & inactive)
export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const rawPortfolios = await prisma.portfolio.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        category: true,
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
    console.error("Admin Portfolios GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolios" }, { status: 500 });
  }
}

// POST /api/admin/portfolios — Create a new portfolio item
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const body = await req.json();
    const {
      title,
      slug,
      shortDescription,
      longDescription,
      categoryId,
      coverImage,
      galleryImages,
      featuredImage,
      altText,
      seoTitle,
      seoDescription,
      tags,
      featured,
      displayOrder,
      active,
    } = body;

    if (!title || !shortDescription || !categoryId || !coverImage) {
      return NextResponse.json(
        { error: "Title, short description, category, and cover image are required" },
        { status: 400 }
      );
    }

    const generatedSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const existing = await prisma.portfolio.findUnique({
      where: { slug: generatedSlug },
    });

    if (existing) {
      return NextResponse.json({ error: "Portfolio slug already exists" }, { status: 400 });
    }

    // Convert galleryImages and tags arrays into JSON string for SQLite storage
    const galleryJson = Array.isArray(galleryImages) ? JSON.stringify(galleryImages) : "[]";
    const tagsJson = Array.isArray(tags) ? JSON.stringify(tags) : "[]";

    const portfolioRaw = await prisma.portfolio.create({
      data: {
        title,
        slug: generatedSlug,
        shortDescription,
        longDescription: longDescription || shortDescription,
        categoryId,
        coverImage,
        galleryImages: galleryJson,
        featuredImage: featuredImage || coverImage,
        altText: altText || title,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || shortDescription,
        tags: tagsJson,
        featured: Boolean(featured),
        displayOrder: displayOrder ? parseInt(displayOrder) : 0,
        active: active !== undefined ? Boolean(active) : true,
      },
      include: {
        category: true,
      },
    });

    const portfolio = {
      ...portfolioRaw,
      galleryImages: JSON.parse(portfolioRaw.galleryImages || "[]"),
      tags: JSON.parse(portfolioRaw.tags || "[]"),
    };

    revalidatePath("/");

    return NextResponse.json({ success: true, portfolio }, { status: 201 });
  } catch (error: any) {
    console.error("Admin Portfolio POST Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create portfolio" }, { status: 500 });
  }
}
