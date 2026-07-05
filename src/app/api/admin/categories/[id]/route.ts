import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/categories/[id] — Update a category
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
    if (body.categoryName !== undefined) updateData.categoryName = body.categoryName;
    if (body.slug !== undefined) {
      updateData.slug = body.slug.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    }
    if (body.description !== undefined) updateData.description = body.description;
    if (body.icon !== undefined) updateData.icon = body.icon;
    if (body.bannerImage !== undefined) updateData.bannerImage = body.bannerImage;
    if (body.displayOrder !== undefined) updateData.displayOrder = parseInt(body.displayOrder);
    if (body.active !== undefined) updateData.active = Boolean(body.active);

    const category = await prisma.portfolioCategory.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/");

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    console.error("Admin Category PATCH Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update category" }, { status: 500 });
  }
}

// DELETE /api/admin/categories/[id] — Delete a category
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = params;

    await prisma.portfolioCategory.delete({
      where: { id },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin Category DELETE Error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete category" }, { status: 500 });
  }
}
