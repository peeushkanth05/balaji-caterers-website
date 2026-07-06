import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const socialLinks = await prisma.socialMediaLink.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ socialLinks });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch social links" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { platform, url, icon, displayOrder, isEnabled } = await req.json();

    if (!platform || !url) {
      return NextResponse.json({ error: "Platform and URL are required" }, { status: 400 });
    }

    const newLink = await prisma.socialMediaLink.create({
      data: {
        platform,
        url,
        icon: icon || "",
        displayOrder: displayOrder ? parseInt(displayOrder.toString(), 10) : 0,
        isEnabled: isEnabled ?? true,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, socialLink: newLink }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create social link" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, platform, url, icon, displayOrder, isEnabled } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Link ID required" }, { status: 400 });
    }

    const updatedLink = await prisma.socialMediaLink.update({
      where: { id },
      data: {
        ...(platform !== undefined && { platform }),
        ...(url !== undefined && { url }),
        ...(icon !== undefined && { icon }),
        ...(displayOrder !== undefined && { displayOrder: parseInt(displayOrder.toString(), 10) }),
        ...(isEnabled !== undefined && { isEnabled }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, socialLink: updatedLink });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update social link" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Link ID required" }, { status: 400 });
    }

    await prisma.socialMediaLink.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete social link" }, { status: 500 });
  }
}
