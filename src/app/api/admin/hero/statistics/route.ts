import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// POST /api/admin/hero/statistics - Admin only: Add a statistic item
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { icon, number, title, sortOrder, isEnabled } = await req.json();

    if (!number || !title) {
      return NextResponse.json({ error: "Number and title are required" }, { status: 400 });
    }

    const stat = await prisma.heroStatistic.create({
      data: {
        heroSectionId: "default",
        icon: icon || "📊",
        number,
        title,
        sortOrder: sortOrder ? Number(sortOrder) : 0,
        isEnabled: isEnabled ?? true,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, stat }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create statistic item" }, { status: 500 });
  }
}

// PUT /api/admin/hero/statistics - Admin only: Update a statistic item
export async function PUT(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, icon, number, title, sortOrder, isEnabled } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Statistic ID is required" }, { status: 400 });
    }

    const stat = await prisma.heroStatistic.update({
      where: { id },
      data: {
        ...(icon !== undefined && { icon }),
        ...(number !== undefined && { number }),
        ...(title !== undefined && { title }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
        ...(isEnabled !== undefined && { isEnabled }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, stat });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update statistic item" }, { status: 500 });
  }
}

// DELETE /api/admin/hero/statistics - Admin only: Delete a statistic item
export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Statistic ID is required" }, { status: 400 });
    }

    await prisma.heroStatistic.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete statistic item" }, { status: 500 });
  }
}
