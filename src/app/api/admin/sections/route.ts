import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const sections = await prisma.homepageSection.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ sections });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch homepage sections" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { sectionType, name, displayOrder, isEnabled, settings } = await req.json();

    if (!sectionType || !name) {
      return NextResponse.json({ error: "Section Type and Name are required" }, { status: 400 });
    }

    const newSection = await prisma.homepageSection.create({
      data: {
        sectionType,
        name,
        displayOrder: displayOrder ? parseInt(displayOrder.toString(), 10) : 0,
        isEnabled: isEnabled ?? true,
        settings: settings ? (typeof settings === "string" ? settings : JSON.stringify(settings)) : null,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, section: newSection }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create homepage section" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const body = await req.json();

    // Bulk update display orders for drag-and-drop
    if (body.sections && Array.isArray(body.sections)) {
      const updates = body.sections.map((sec: any) =>
        prisma.homepageSection.update({
          where: { id: sec.id },
          data: {
            displayOrder: parseInt(sec.displayOrder.toString(), 10),
            ...(sec.isEnabled !== undefined && { isEnabled: sec.isEnabled }),
          },
        })
      );
      await prisma.$transaction(updates);
      revalidatePath("/");
      return NextResponse.json({ success: true });
    }

    // Single section update
    const { id, name, displayOrder, isEnabled, settings } = body;
    if (!id) {
      return NextResponse.json({ error: "Section ID required" }, { status: 400 });
    }

    const updatedSection = await prisma.homepageSection.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(displayOrder !== undefined && { displayOrder: parseInt(displayOrder.toString(), 10) }),
        ...(isEnabled !== undefined && { isEnabled }),
        ...(settings !== undefined && {
          settings: typeof settings === "string" ? settings : JSON.stringify(settings),
        }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, section: updatedSection });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update homepage section" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Section ID required" }, { status: 400 });
    }

    await prisma.homepageSection.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete homepage section" }, { status: 500 });
  }
}
