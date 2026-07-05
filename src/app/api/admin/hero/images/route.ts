import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// POST /api/admin/hero/images - Admin only: Add a hero slide image
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { imageUrl, altText, caption, displayOrder, isEnabled } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const image = await prisma.heroImage.create({
      data: {
        heroSectionId: "default",
        imageUrl,
        altText: altText || "Hero Image",
        caption: caption || "",
        displayOrder: displayOrder ? Number(displayOrder) : 0,
        isEnabled: isEnabled ?? true,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create hero image" }, { status: 500 });
  }
}

// PUT /api/admin/hero/images - Admin only: Update a hero slide image
export async function PUT(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, imageUrl, altText, caption, displayOrder, isEnabled } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    const image = await prisma.heroImage.update({
      where: { id },
      data: {
        ...(imageUrl !== undefined && { imageUrl }),
        ...(altText !== undefined && { altText }),
        ...(caption !== undefined && { caption }),
        ...(displayOrder !== undefined && { displayOrder: Number(displayOrder) }),
        ...(isEnabled !== undefined && { isEnabled }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, image });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update hero image" }, { status: 500 });
  }
}

// DELETE /api/admin/hero/images - Admin only: Delete a hero slide image
export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    await prisma.heroImage.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete hero image" }, { status: 500 });
  }
}
