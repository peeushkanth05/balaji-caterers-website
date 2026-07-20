import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";

// Initialize Cloudinary if credentials are set
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
} else {
  console.warn("Cloudinary environment variables are not fully configured. Falling back to local disk storage.");
}

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"];
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB limit

// Helper to upload a buffer to Cloudinary
const uploadToCloudinary = (buffer: Buffer, filename: string, folder: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `verma-caterers/${folder || "portfolio"}`,
        public_id: `${Date.now()}_${path.parse(filename).name.replace(/[^a-zA-Z0-9_-]/g, "_")}`,
        resource_type: "auto",
        format: "webp", // Force WebP conversion for images
        quality: "auto:good", // Cloudinary auto quality compression
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

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
      return NextResponse.json({ error: "No image file provided in the request" }, { status: 400 });
    }

    const savedUrls: string[] = [];
    let primaryItem: any = null;

    for (const file of uploadList) {
      // Validate File Size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the 15MB limit (Size: ${(file.size / 1024 / 1024).toFixed(2)}MB)` },
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

      let fileUrl = "";

      if (isCloudinaryConfigured) {
        try {
          const cloudRes = await uploadToCloudinary(buffer, file.name, "portfolio");
          fileUrl = cloudRes.secure_url;
        } catch (cloudinaryError: any) {
          console.error("Cloudinary upload failed for file:", file.name, cloudinaryError);
          return NextResponse.json(
            { error: `Cloudinary upload failed: ${cloudinaryError.message || JSON.stringify(cloudinaryError)}` },
            { status: 502 }
          );
        }
      } else {
        // Fallback to database storage to prevent EROFS errors on Vercel
        try {
          const dbFile = await prisma.databaseFile.create({
            data: {
              filename: file.name,
              mimeType: file.type || "image/jpeg",
              data: buffer,
            },
          });
          fileUrl = `/api/media/${dbFile.id}`;
        } catch (dbWriteError: any) {
          console.error("Database fallback write failed for file:", file.name, dbWriteError);
          return NextResponse.json(
            { error: `Database fallback write failed: ${dbWriteError.message || dbWriteError}` },
            { status: 500 }
          );
        }
      }

      savedUrls.push(fileUrl);

      // Save to GalleryItem table for backwards compatibility
      try {
        const item = await prisma.galleryItem.create({
          data: {
            title,
            category,
            imageUrl: fileUrl,
            isActive: true,
          },
        });
        if (!primaryItem) primaryItem = item;
      } catch (dbError: any) {
        console.error("Database save failed for GalleryItem:", dbError);
        return NextResponse.json(
          { error: `Database save failed: ${dbError.message || dbError}` },
          { status: 500 }
        );
      }
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
    console.error("Secure Image Upload Catch Block Error:", error);
    return NextResponse.json(
      { error: `Failed to process image upload: ${error.message || error}` },
      { status: 500 }
    );
  }
}
