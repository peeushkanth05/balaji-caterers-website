import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const alerts = await prisma.alertTicker.findMany({
      orderBy: { priority: "desc" },
    });
    return NextResponse.json({ alerts });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { text, bgColor, textColor, speed, priority, isEnabled } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const newAlert = await prisma.alertTicker.create({
      data: {
        text,
        bgColor: bgColor || "#f59e0b",
        textColor: textColor || "#ffffff",
        speed: speed ? parseInt(speed.toString(), 10) : 40,
        priority: priority ? parseInt(priority.toString(), 10) : 0,
        isEnabled: isEnabled ?? true,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, alert: newAlert }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, text, bgColor, textColor, speed, priority, isEnabled } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Alert ID required" }, { status: 400 });
    }

    const updatedAlert = await prisma.alertTicker.update({
      where: { id },
      data: {
        ...(text !== undefined && { text }),
        ...(bgColor !== undefined && { bgColor }),
        ...(textColor !== undefined && { textColor }),
        ...(speed !== undefined && { speed: parseInt(speed.toString(), 10) }),
        ...(priority !== undefined && { priority: parseInt(priority.toString(), 10) }),
        ...(isEnabled !== undefined && { isEnabled }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, alert: updatedAlert });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update alert" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Alert ID required" }, { status: 400 });
    }

    await prisma.alertTicker.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete alert" }, { status: 500 });
  }
}
