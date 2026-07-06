import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const videos = await prisma.videoGalleryItem.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ videos });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { title, description, videoUrl, thumbnailUrl, displayOrder, isEnabled } = await req.json();

    if (!title || !videoUrl || !thumbnailUrl) {
      return NextResponse.json({ error: "Title, Video URL, and Thumbnail URL are required" }, { status: 400 });
    }

    const newVideo = await prisma.videoGalleryItem.create({
      data: {
        title,
        description: description || "",
        videoUrl,
        thumbnailUrl,
        displayOrder: displayOrder ? parseInt(displayOrder.toString(), 10) : 0,
        isEnabled: isEnabled ?? true,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, video: newVideo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, title, description, videoUrl, thumbnailUrl, displayOrder, isEnabled } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Video ID required" }, { status: 400 });
    }

    const updatedVideo = await prisma.videoGalleryItem.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(videoUrl !== undefined && { videoUrl }),
        ...(thumbnailUrl !== undefined && { thumbnailUrl }),
        ...(displayOrder !== undefined && { displayOrder: parseInt(displayOrder.toString(), 10) }),
        ...(isEnabled !== undefined && { isEnabled }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, video: updatedVideo });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Video ID required" }, { status: 400 });
    }

    await prisma.videoGalleryItem.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
  }
}
