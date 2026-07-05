import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"];
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB limit

export async function POST(req: Request) {
  // 1. Strict Session Authentication Check
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const formData = await req.formData();

    // Check if multiple files or single file uploaded
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;
    const title = (formData.get("title") as string || "Uploaded Photo").trim();
    const category = (formData.get("category") as string || "General").trim();

    const uploadList: File[] = [];
    if (files && files.length > 0) {
      uploadList.push(...files.filter((f) => f && f.name));
    }
    if (singleFile && singleFile.name) {
      uploadList.push(singleFile);
    }

    if (uploadList.length === 0) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const savedUrls: string[] = [];
    let primaryItem: any = null;

    for (const file of uploadList) {
      // Validate File Size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds 15MB limit` },
          { status: 400 }
        );
      }

      // Validate File Extension
      const ext = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json(
          { error: `Invalid file format for "${file.name}". Allowed: ${ALLOWED_EXTENSIONS.join(", ")}` },
          { status: 400 }
        );
      }

      // Convert file to Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const safeBaseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${safeBaseName}${ext}`;
      const filePath = path.join(uploadsDir, uniqueFileName);

      await fs.writeFile(filePath, buffer);
      const relativeUrl = `/uploads/${uniqueFileName}`;
      savedUrls.push(relativeUrl);

      // Save to GalleryItem table as well for backwards compatibility
      const item = await prisma.galleryItem.create({
        data: {
          title,
          category,
          imageUrl: relativeUrl,
          isActive: true,
        },
      });
      if (!primaryItem) primaryItem = item;
    }

    revalidatePath("/");

    return NextResponse.json(
      {
        success: true,
        url: savedUrls[0],
        urls: savedUrls,
        item: primaryItem,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Secure Image Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to process image upload" },
      { status: 500 }
    );
  }
}
