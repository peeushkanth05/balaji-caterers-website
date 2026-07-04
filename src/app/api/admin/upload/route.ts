import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "Event Photo";
    const category = (formData.get("category") as string) || "General";

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads folder inside public if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Clean filename & make unique
    const ext = path.extname(file.name) || ".jpg";
    const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, "_");
    const uniqueFileName = `${Date.now()}_${cleanBase}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    // Write file to public/uploads
    await fs.writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${uniqueFileName}`;

    // Create entry in Prisma database
    const item = await prisma.galleryItem.create({
      data: {
        title,
        category,
        imageUrl: relativeUrl,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error: any) {
    console.error("Image Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to upload image file" },
      { status: 500 }
    );
  }
}
