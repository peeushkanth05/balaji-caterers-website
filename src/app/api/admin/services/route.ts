import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// GET /api/admin/services - Admin only: List all services
export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const services = await prisma.service.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// POST /api/admin/services - Admin only: Create a new service
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { title, icon, description, tag, displayOrder, isActive } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const newService = await prisma.service.create({
      data: {
        title,
        icon: icon || "✨",
        description,
        tag: tag || "Service",
        displayOrder: displayOrder ? parseInt(displayOrder.toString(), 10) : 0,
        isActive: isActive ?? true,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

// PATCH /api/admin/services - Admin only: Update service properties or status
export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, title, icon, description, tag, displayOrder, isActive } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Service ID required" }, { status: 400 });
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(icon !== undefined && { icon }),
        ...(description !== undefined && { description }),
        ...(tag !== undefined && { tag }),
        ...(displayOrder !== undefined && { displayOrder: parseInt(displayOrder.toString(), 10) }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, service: updatedService });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE /api/admin/services - Admin only: Remove a service
export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Service ID required" }, { status: 400 });
    }

    await prisma.service.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
