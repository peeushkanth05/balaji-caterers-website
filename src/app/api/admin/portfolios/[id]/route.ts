import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// GET /api/admin/portfolios/[id] — Fetch single portfolio for editing
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = params;
    const portfolioRaw = await prisma.portfolio.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!portfolioRaw) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
    }

    const portfolio = {
      ...portfolioRaw,
      galleryImages: JSON.parse(portfolioRaw.galleryImages || "[]"),
      tags: JSON.parse(portfolioRaw.tags || "[]"),
    };

    return NextResponse.json({ portfolio });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch portfolio" }, { status: 500 });
  }
}

// PATCH /api/admin/portfolios/[id] — Update portfolio item
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = params;
    const body = await req.json();

    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) {
      updateData.slug = body.slug.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    }
    if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription;
    if (body.longDescription !== undefined) updateData.longDescription = body.longDescription;
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
    if (body.coverImage !== undefined) updateData.coverImage = body.coverImage;
    if (body.galleryImages !== undefined) {
      updateData.galleryImages = Array.isArray(body.galleryImages)
        ? JSON.stringify(body.galleryImages)
        : body.galleryImages;
    }
    if (body.featuredImage !== undefined) updateData.featuredImage = body.featuredImage;
    if (body.altText !== undefined) updateData.altText = body.altText;
    if (body.seoTitle !== undefined) updateData.seoTitle = body.seoTitle;
    if (body.seoDescription !== undefined) updateData.seoDescription = body.seoDescription;
    if (body.tags !== undefined) {
      updateData.tags = Array.isArray(body.tags) ? JSON.stringify(body.tags) : body.tags;
    }
    if (body.featured !== undefined) updateData.featured = Boolean(body.featured);
    if (body.displayOrder !== undefined) updateData.displayOrder = parseInt(body.displayOrder);
    if (body.active !== undefined) updateData.active = Boolean(body.active);

    const portfolioRaw = await prisma.portfolio.update({
      where: { id },
      data: updateData,
      include: { category: true },
    });

    const portfolio = {
      ...portfolioRaw,
      galleryImages: JSON.parse(portfolioRaw.galleryImages || "[]"),
      tags: JSON.parse(portfolioRaw.tags || "[]"),
    };

    revalidatePath("/");

    return NextResponse.json({ success: true, portfolio });
  } catch (error: any) {
    console.error("Admin Portfolio PATCH Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update portfolio" }, { status: 500 });
  }
}

// DELETE /api/admin/portfolios/[id] — Delete portfolio item
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = params;
    await prisma.portfolio.delete({ where: { id } });

    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin Portfolio DELETE Error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete portfolio" }, { status: 500 });
  }
}
