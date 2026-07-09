import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let footer = await prisma.footerSettings.findUnique({
      where: { id: "default" },
    });

    if (!footer) {
      footer = await prisma.footerSettings.create({
        data: {
          id: "default",
          aboutText: "Shree Balaji Caterers — Delhi NCR's premium wedding catering, fresh menus, floral decorators, and event management since 2011.",
          locationText: "Dwarka Sector 5, Madhu Vihar, New Delhi",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=28.5921,77.0460",
          phone: "+91 98104 83544",
          email: "vermasandeep124@gmail.com",
          copyrightText: "© 2026 Shree Balaji Caterers. All Rights Reserved.",
        },
      });
    }

    const socialLinks = await prisma.socialMediaLink.findMany({
      where: { isEnabled: true },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ footer, socialLinks });
  } catch (error) {
    console.error("Footer GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch footer settings" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
