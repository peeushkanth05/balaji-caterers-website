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
}

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".mp4", ".mov", ".webm"];
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

// Helper to upload a buffer to Cloudinary
const uploadToCloudinary = (buffer: Buffer, filename: string, folder: string): Promise<any> => {
  const ext = path.extname(filename).toLowerCase();
  const isVideo = [".mp4", ".mov", ".webm"].includes(ext);
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `shreebalaji/${folder || "general"}`,
        public_id: `${Date.now()}_${path.parse(filename).name.replace(/[^a-zA-Z0-9_-]/g, "_")}`,
        resource_type: "auto",
        ...(!isVideo && { format: "webp" }),          // Force WebP conversion only for images
        quality: "auto:good",     // Cloudinary auto quality compression
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

// GET /api/admin/media - Fetch asset list with search, folder, & tag filters
export async function GET(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const folder = searchParams.get("folder") || "";
  const tag = searchParams.get("tag") || "";

  try {
    const assets = await prisma.mediaAsset.findMany({
      where: {
        ...(search && {
          filename: { contains: search },
        }),
        ...(folder && folder !== "all" && {
          folder: folder,
        }),
        ...(tag && {
          tags: { contains: tag },
        }),
      },
      orderBy: { createdAt: "desc" },
    });

    // Map tags safely from stringified array
    const parsedAssets = assets.map((a) => {
      let parsedTags: string[] = [];
      try {
        parsedTags = JSON.parse(a.tags || "[]");
      } catch {
        parsedTags = [];
      }
      return {
        ...a,
        tags: parsedTags,
      };
    });

    // Extract unique folders list for filter dropdown
    const foldersData = await prisma.mediaAsset.findMany({
      select: { folder: true },
      distinct: ["folder"],
    });
    const folders = foldersData.map((f) => f.folder || "general").filter((v, i, self) => self.indexOf(v) === i);

    return NextResponse.json({ assets: parsedAssets, folders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media assets" }, { status: 500 });
  }
}

// POST /api/admin/media - Upload assets (handles Cloudinary with local disk fallback)
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string || "general").trim();
    const altText = (formData.get("altText") as string || "").trim();
    const tagsInput = (formData.get("tags") as string || "[]");

    const uploadList: File[] = [];
    if (files && files.length > 0) {
      uploadList.push(...files.filter((f) => f && f.name));
    }
    if (singleFile && singleFile.name) {
      uploadList.push(singleFile);
    }

    if (uploadList.length === 0) {
      return NextResponse.json({ error: "No files selected" }, { status: 400 });
    }

    const savedAssets: any[] = [];

    for (const file of uploadList) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json({ error: `File ${file.name} exceeds 15MB limit` }, { status: 400 });
      }

      const ext = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json({ error: `Unsupported file format for ${file.name}` }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      let fileUrl = "";
      let publicId: string | null = null;

      if (isCloudinaryConfigured) {
        // Upload to Cloudinary (forces auto quality + WebP conversion)
        const cloudRes = await uploadToCloudinary(buffer, file.name, folder);
        fileUrl = cloudRes.secure_url;
        publicId = cloudRes.public_id;
      } else {
        // Fallback to database storage to prevent EROFS errors on Vercel
        const dbFile = await prisma.databaseFile.create({
          data: {
            filename: file.name,
            mimeType: file.type || "image/jpeg",
            data: buffer,
          },
        });
        fileUrl = `/api/media/${dbFile.id}`;
      }

      // Save to database
      const asset = await prisma.mediaAsset.create({
        data: {
          filename: file.name,
          url: fileUrl,
          publicId: publicId,
          folder: folder,
          altText: altText || file.name,
          tags: tagsInput,
          mimeType: file.type || "image/jpeg",
          fileSize: file.size,
        },
      });

      savedAssets.push(asset);
    }

    revalidatePath("/");

    return NextResponse.json({ success: true, assets: savedAssets }, { status: 201 });
  } catch (error: any) {
    console.error("Media Upload API Error:", error);
    return NextResponse.json({ error: `Failed to upload media files: ${error.message || error}` }, { status: 500 });
  }
}

// PATCH /api/admin/media - Edit metadata (tags, folder, altText) or Replace file
export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const folder = formData.get("folder") as string | null;
    const altText = formData.get("altText") as string | null;
    const tagsInput = formData.get("tags") as string | null;
    const replacementFile = formData.get("replacementFile") as File | null;

    if (!id) {
      return NextResponse.json({ error: "Asset ID required" }, { status: 400 });
    }

    const currentAsset = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!currentAsset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    let updatedUrl = currentAsset.url;
    let updatedPublicId = currentAsset.publicId;
    let updatedSize = currentAsset.fileSize;
    let updatedMime = currentAsset.mimeType;

    // Handle File Replacement
    if (replacementFile && replacementFile.name) {
      if (replacementFile.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json({ error: "Replacement file exceeds 15MB limit" }, { status: 400 });
      }

      const ext = path.extname(replacementFile.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json({ error: "Unsupported replacement format" }, { status: 400 });
      }

      // Delete old file first from Cloudinary/Disk
      if (currentAsset.publicId && isCloudinaryConfigured) {
        try {
          await cloudinary.uploader.destroy(currentAsset.publicId);
        } catch (e) {
          console.error("Cloudinary old file delete error:", e);
        }
      } else if (currentAsset.url.startsWith("/uploads/")) {
        try {
          const oldFilePath = path.join(process.cwd(), "public", currentAsset.url);
          await fs.unlink(oldFilePath);
        } catch (e) {
          console.error("Local disk delete error:", e);
        }
      }

      const arrayBuffer = await replacementFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (isCloudinaryConfigured) {
        const cloudRes = await uploadToCloudinary(buffer, replacementFile.name, folder || currentAsset.folder || "general");
        updatedUrl = cloudRes.secure_url;
        updatedPublicId = cloudRes.public_id;
      } else {
        // Fallback to database storage to prevent EROFS errors on Vercel
        const dbFile = await prisma.databaseFile.create({
          data: {
            filename: replacementFile.name,
            mimeType: replacementFile.type || "image/jpeg",
            data: buffer,
          },
        });
        updatedUrl = `/api/media/${dbFile.id}`;
        updatedPublicId = null;
      }

      updatedSize = replacementFile.size;
      updatedMime = replacementFile.type || "image/jpeg";
    }

    const updatedAsset = await prisma.mediaAsset.update({
      where: { id },
      data: {
        url: updatedUrl,
        publicId: updatedPublicId,
        fileSize: updatedSize,
        mimeType: updatedMime,
        ...(folder !== null && { folder }),
        ...(altText !== null && { altText }),
        ...(tagsInput !== null && { tags: tagsInput }),
      },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true, asset: updatedAsset });
  } catch (error) {
    console.error("Media Patch Error:", error);
    return NextResponse.json({ error: "Failed to update media details" }, { status: 500 });
  }
}

// DELETE /api/admin/media - Remove file from DB and disk/Cloudinary
export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Asset ID required" }, { status: 400 });
    }

    const asset = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // 1. Delete from Cloudinary
    if (asset.publicId && isCloudinaryConfigured) {
      try {
        await cloudinary.uploader.destroy(asset.publicId);
      } catch (e) {
        console.error("Cloudinary delete error:", e);
      }
    }

    // 2. Delete from Local disk or database (if applicable)
    if (asset.url.startsWith("/uploads/")) {
      try {
        const filePath = path.join(process.cwd(), "public", asset.url);
        await fs.unlink(filePath);
      } catch (e) {
        console.error("Local disk file unlink failed:", e);
      }
    } else if (asset.url.startsWith("/api/media/")) {
      try {
        const fileId = asset.url.split("/").pop();
        if (fileId) {
          await prisma.databaseFile.delete({
            where: { id: fileId },
          });
        }
      } catch (e) {
        console.error("DatabaseFile deletion failed:", e);
      }
    }

    // 3. Delete from Prisma Database
    await prisma.mediaAsset.delete({ where: { id } });

    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete media asset" }, { status: 500 });
  }
}
