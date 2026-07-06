import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// GET /api/admin/advertisements - Fetch all ads
export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const ads = await prisma.advertisement.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ ads });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch advertisements" }, { status: 500 });
  }
}

// POST /api/admin/advertisements - Create new ad
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const body = await req.json();
    const { title, description, brandName, imageUrl, redirectUrl, ctaText, isEnabled, startDate, endDate, displayOrder } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Title and Banner Image are required" }, { status: 400 });
    }

    const ad = await prisma.advertisement.create({
      data: {
        title,
        description: description || null,
        brandName: brandName || null,
        imageUrl,
        redirectUrl: redirectUrl || null,
        ctaText: ctaText || "Learn More",
        isEnabled: isEnabled ?? true,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        displayOrder: displayOrder ? parseInt(displayOrder.toString(), 10) : 0,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, ad }, { status: 201 });
  } catch (error) {
    console.error("Create Ad Error:", error);
    return NextResponse.json({ error: "Failed to create advertisement" }, { status: 500 });
  }
}

// PATCH /api/admin/advertisements - Update ad
export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const body = await req.json();
    const { id, title, description, brandName, imageUrl, redirectUrl, ctaText, isEnabled, startDate, endDate, displayOrder } = body;

    if (!id) {
      return NextResponse.json({ error: "Advertisement ID required" }, { status: 400 });
    }

    const ad = await prisma.advertisement.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description: description || null }),
        ...(brandName !== undefined && { brandName: brandName || null }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(redirectUrl !== undefined && { redirectUrl: redirectUrl || null }),
        ...(ctaText !== undefined && { ctaText }),
        ...(isEnabled !== undefined && { isEnabled }),
        ...(startDate !== undefined && { startDate: startDate ? new Date(startDate) : null }),
        ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
        ...(displayOrder !== undefined && { displayOrder: parseInt(displayOrder.toString(), 10) }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, ad });
  } catch (error) {
    console.error("Update Ad Error:", error);
    return NextResponse.json({ error: "Failed to update advertisement" }, { status: 500 });
  }
}

// DELETE /api/admin/advertisements - Delete ad
export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Advertisement ID required" }, { status: 400 });
    }

    await prisma.advertisement.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Ad Error:", error);
    return NextResponse.json({ error: "Failed to delete advertisement" }, { status: 500 });
  }
}
