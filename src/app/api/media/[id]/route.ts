import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;
    if (!fileId) {
      return new Response("Media ID is required", { status: 400 });
    }

    const file = await prisma.databaseFile.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return new Response("Media file not found", { status: 404 });
    }

    return new Response(file.data as any, {
      headers: {
        "Content-Type": file.mimeType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Database media serving error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
