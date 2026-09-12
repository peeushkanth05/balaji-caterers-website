import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import sharp from "sharp";

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

    let buffer = Buffer.from(file.data);
    let mimeType = file.mimeType || "image/jpeg";

    const { searchParams } = new URL(req.url);
    const widthParam = searchParams.get("w");
    const targetWidth = widthParam ? parseInt(widthParam, 10) : null;

    if (mimeType.startsWith("image/") && !mimeType.includes("svg")) {
      try {
        let instance = sharp(buffer);
        if (targetWidth && !isNaN(targetWidth) && targetWidth > 0 && targetWidth < 3000) {
          instance = instance.resize({ width: targetWidth, withoutEnlargement: true });
        }
        buffer = await instance.webp({ quality: 80 }).toBuffer();
        mimeType = "image/webp";
      } catch (err) {
        // Fallback to original buffer if sharp fails
      }
    }

    return new Response(buffer as any, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Database media serving error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
