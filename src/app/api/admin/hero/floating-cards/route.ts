import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// POST /api/admin/hero/floating-cards - Admin only: Add a floating card
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { icon, title, description, link, color, sortOrder, isEnabled } = await req.json();

    if (!icon || !title || !description) {
      return NextResponse.json({ error: "Icon, title, and description are required" }, { status: 400 });
    }

    const card = await prisma.heroFloatingCard.create({
      data: {
        heroSectionId: "default",
        icon,
        title,
        description,
        link: link || "",
        color: color || "amber",
        sortOrder: sortOrder ? Number(sortOrder) : 0,
        isEnabled: isEnabled ?? true,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, card }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create floating card" }, { status: 500 });
  }
}

// PUT /api/admin/hero/floating-cards - Admin only: Update a floating card
export async function PUT(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, icon, title, description, link, color, sortOrder, isEnabled } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Card ID is required" }, { status: 400 });
    }

    const card = await prisma.heroFloatingCard.update({
      where: { id },
      data: {
        ...(icon !== undefined && { icon }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(link !== undefined && { link }),
        ...(color !== undefined && { color }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
        ...(isEnabled !== undefined && { isEnabled }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, card });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update floating card" }, { status: 500 });
  }
}

// DELETE /api/admin/hero/floating-cards - Admin only: Delete a floating card
export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Card ID is required" }, { status: 400 });
    }

    await prisma.heroFloatingCard.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete floating card" }, { status: 500 });
  }
}
