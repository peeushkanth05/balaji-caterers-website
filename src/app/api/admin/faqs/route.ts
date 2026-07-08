import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { priority: "asc" },
    });
    return NextResponse.json({ faqs });
  } catch (error) {
    console.error("Fetch FAQs Error:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { question, answer, category, priority, isActive } = await req.json();

    if (!question || !answer) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
    }

    const newFaq = await prisma.faq.create({
      data: {
        question,
        answer,
        category: category || "General",
        priority: priority ? parseInt(priority.toString(), 10) : 0,
        isActive: isActive ?? true,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, faq: newFaq }, { status: 201 });
  } catch (error) {
    console.error("Create FAQ Error:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, question, answer, category, priority, isActive } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "FAQ ID is required" }, { status: 400 });
    }

    const updatedFaq = await prisma.faq.update({
      where: { id },
      data: {
        ...(question !== undefined && { question }),
        ...(answer !== undefined && { answer }),
        ...(category !== undefined && { category }),
        ...(priority !== undefined && { priority: parseInt(priority.toString(), 10) }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, faq: updatedFaq });
  } catch (error) {
    console.error("Update FAQ Error:", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "FAQ ID is required" }, { status: 400 });
    }

    await prisma.faq.delete({
      where: { id },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete FAQ Error:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
