import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/hero - Public: Fetch active hero section payload
export async function GET() {
  try {
    const hero = await prisma.heroSection.findUnique({
      where: { id: "default" },
      include: {
        statistics: {
          where: { isEnabled: true },
          orderBy: { sortOrder: "asc" },
        },
        images: {
          where: { isEnabled: true },
          orderBy: { displayOrder: "asc" },
        },
        floatingCards: {
          where: { isEnabled: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return NextResponse.json({ hero });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero section" }, { status: 500 });
  }
}
