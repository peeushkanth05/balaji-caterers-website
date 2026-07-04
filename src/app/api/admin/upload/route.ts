import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

export async function POST(req: Request) {
  // 1. Strict Session Authentication Check
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string || "Event Photo").trim();
    const category = (formData.get("category") as string || "General").trim();

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    // 2. Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // 3. Validate File Extension
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: `Invalid file format. Allowed formats: ${ALLOWED_EXTENSIONS.join(", ")}` },
        { status: 400 }
      );
    }

    // 4. Validate MIME Type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads folder inside public safely
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // 5. Sanitize Filename to prevent directory traversal
    const safeBaseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFileName = `${Date.now()}_${safeBaseName}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    // Write file to disk
    await fs.writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${uniqueFileName}`;

    // Save to Database
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
    console.error("Secure Image Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to process image upload" },
      { status: 500 }
    );
  }
}
