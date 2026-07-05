import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/settings - Public: Fetch public site settings & contact details
export async function GET() {
  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}
