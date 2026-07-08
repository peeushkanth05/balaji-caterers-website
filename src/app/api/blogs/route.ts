import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const limit = searchParams.get("limit");

    const now = new Date();

    if (slug) {
      const blog = await prisma.blogPost.findUnique({
        where: { slug, isActive: true },
      });
      if (!blog) {
        return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
      }
      return NextResponse.json({ blog });
    }

    const blogs = await prisma.blogPost.findMany({
      where: {
        isActive: true,
        publishDate: { lte: now },
      },
      orderBy: { publishDate: "desc" },
      ...(limit && { take: parseInt(limit, 10) }),
    });

    return NextResponse.json({ blogs });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
