import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// GET /api/admin/categories — List all categories (active & inactive)
export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const categories = await prisma.portfolioCategory.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        _count: {
          select: { portfolios: true },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Admin Categories GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST /api/admin/categories — Create a new portfolio category
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const body = await req.json();
    const { categoryName, slug, description, icon, bannerImage, displayOrder, active } = body;

    if (!categoryName) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const generatedSlug = (slug || categoryName)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const existing = await prisma.portfolioCategory.findUnique({
      where: { slug: generatedSlug },
    });

    if (existing) {
      return NextResponse.json({ error: "Category slug already exists" }, { status: 400 });
    }

    const category = await prisma.portfolioCategory.create({
      data: {
        categoryName,
        slug: generatedSlug,
        description: description || null,
        icon: icon || "📁",
        bannerImage: bannerImage || null,
        displayOrder: displayOrder ? parseInt(displayOrder) : 0,
        active: active !== undefined ? Boolean(active) : true,
      },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    console.error("Admin Category POST Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create category" }, { status: 500 });
  }
}
