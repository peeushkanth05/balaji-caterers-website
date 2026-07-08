import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// Helper to generate a slug from a title
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { publishDate: "desc" },
    });
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Fetch Blogs Error:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { title, slug, content, excerpt, coverImage, category, tags, authorName, seoTitle, seoDescription, isFeatured, isActive, publishDate } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const finalSlug = (slug || slugify(title)).trim();

    // Check slug uniqueness
    const existing = await prisma.blogPost.findUnique({
      where: { slug: finalSlug },
    });
    if (existing) {
      return NextResponse.json({ error: "A blog post with this slug or title already exists" }, { status: 400 });
    }

    const newBlog = await prisma.blogPost.create({
      data: {
        title,
        slug: finalSlug,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        category: category || "News",
        tags: tags || "[]",
        authorName: authorName || "Sandeep Verma",
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || "",
        isFeatured: isFeatured ?? false,
        isActive: isActive ?? true,
        publishDate: publishDate ? new Date(publishDate) : new Date(),
      },
    });

    revalidatePath("/blogs");
    revalidatePath("/");
    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error("Create Blog Error:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, title, slug, content, excerpt, coverImage, category, tags, authorName, seoTitle, seoDescription, isFeatured, isActive, publishDate } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Blog post ID is required" }, { status: 400 });
    }

    const updatedBlog = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug: slug.trim() }),
        ...(content !== undefined && { content }),
        ...(excerpt !== undefined && { excerpt: excerpt || null }),
        ...(coverImage !== undefined && { coverImage: coverImage || null }),
        ...(category !== undefined && { category }),
        ...(tags !== undefined && { tags }),
        ...(authorName !== undefined && { authorName }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDescription !== undefined && { seoDescription }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(isActive !== undefined && { isActive }),
        ...(publishDate !== undefined && { publishDate: publishDate ? new Date(publishDate) : new Date() }),
      },
    });

    revalidatePath("/blogs");
    revalidatePath("/");
    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error("Update Blog Error:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    revalidatePath("/blogs");
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
