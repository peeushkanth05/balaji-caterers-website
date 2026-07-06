import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ testimonials });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { name, review, rating, photoUrl, companyName, displayOrder, isEnabled } = await req.json();

    if (!name || !review) {
      return NextResponse.json({ error: "Name and Review are required" }, { status: 400 });
    }

    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        review,
        rating: rating ? parseInt(rating.toString(), 10) : 5,
        photoUrl: photoUrl || "",
        companyName: companyName || "",
        displayOrder: displayOrder ? parseInt(displayOrder.toString(), 10) : 0,
        isEnabled: isEnabled ?? true,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, testimonial: newTestimonial }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, name, review, rating, photoUrl, companyName, displayOrder, isEnabled } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID required" }, { status: 400 });
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(review !== undefined && { review }),
        ...(rating !== undefined && { rating: parseInt(rating.toString(), 10) }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(companyName !== undefined && { companyName }),
        ...(displayOrder !== undefined && { displayOrder: parseInt(displayOrder.toString(), 10) }),
        ...(isEnabled !== undefined && { isEnabled }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, testimonial: updatedTestimonial });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Testimonial ID required" }, { status: 400 });
    }

    await prisma.testimonial.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
