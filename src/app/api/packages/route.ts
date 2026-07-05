import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/packages - Public: Fetch packages
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const featuredOnly = searchParams.get("featured") === "true";
  const category = searchParams.get("category");

  try {
    const packages = await prisma.package.findMany({
      where: {
        ...(featuredOnly && { isFeatured: true }),
        ...(category && { category }),
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ packages });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}
