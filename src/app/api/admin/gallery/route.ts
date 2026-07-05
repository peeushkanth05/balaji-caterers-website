import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// GET /api/admin/gallery - Admin only: List all gallery items
export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

// POST /api/admin/gallery - Admin only: Create reference gallery item
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { title, category, imageUrl } = await req.json();

    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Title and Image URL are required" }, { status: 400 });
    }

    const newItem = await prisma.galleryItem.create({
      data: {
        title,
        category: category || "General",
        imageUrl,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}

// DELETE /api/admin/gallery - Admin only: Delete gallery item
export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Gallery Item ID required" }, { status: 400 });
    }

    await prisma.galleryItem.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}
