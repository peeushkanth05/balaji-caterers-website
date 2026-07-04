import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/settings
export async function GET() {
  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch site settings" }, { status: 500 });
  }
}

// PATCH /api/admin/settings
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      phone,
      whatsapp,
      email,
      ownerName,
      address,
      mapsUrl,
      heroBadge,
      heroTitle,
      heroSubtitle,
      stat1Number,
      stat1Label,
      stat2Number,
      stat2Label,
      stat3Number,
      stat3Label,
      stat4Number,
      stat4Label,
      aboutTag,
      aboutTitle,
      aboutSubtitle,
    } = body;

    const updatedSettings = await prisma.siteSetting.upsert({
      where: { id: "default" },
      update: {
        ...(phone && { phone }),
        ...(whatsapp && { whatsapp }),
        ...(email && { email }),
        ...(ownerName && { ownerName }),
        ...(address && { address }),
        ...(mapsUrl && { mapsUrl }),
        ...(heroBadge && { heroBadge }),
        ...(heroTitle && { heroTitle }),
        ...(heroSubtitle && { heroSubtitle }),
        ...(stat1Number && { stat1Number }),
        ...(stat1Label && { stat1Label }),
        ...(stat2Number && { stat2Number }),
        ...(stat2Label && { stat2Label }),
        ...(stat3Number && { stat3Number }),
        ...(stat3Label && { stat3Label }),
        ...(stat4Number && { stat4Number }),
        ...(stat4Label && { stat4Label }),
        ...(aboutTag && { aboutTag }),
        ...(aboutTitle && { aboutTitle }),
        ...(aboutSubtitle && { aboutSubtitle }),
      },
      create: {
        id: "default",
        phone: phone || "+91 98104 83544",
        whatsapp: whatsapp || "919810483544",
        email: email || "vermasandeep124@gmail.com",
        ownerName: ownerName || "Sandeep Verma",
        address: address || "Dwarka Sector 5, Madhu Vihar, New Delhi",
        mapsUrl: mapsUrl || "https://www.google.com/maps",
        heroBadge: heroBadge || "Delhi NCR's Premier Event Partner",
        heroTitle: heroTitle || "Every Celebration, Perfectly Crafted.",
        heroSubtitle: heroSubtitle || "From grand weddings to intimate family gatherings — Shree Balaji Caterers brings you world-class catering, stunning floral décor, seamless sound, and complete event management.",
        stat1Number: stat1Number || "500+",
        stat1Label: stat1Label || "Events Managed",
        stat2Number: stat2Number || "15+",
        stat2Label: stat2Label || "Years Experience",
        stat3Number: stat3Number || "1000+",
        stat3Label: stat3Label || "Happy Families",
        stat4Number: stat4Number || "100%",
        stat4Label: stat4Label || "Satisfaction",
        aboutTag: aboutTag || "Why Us",
        aboutTitle: aboutTitle || "Why Choose Shree Balaji Caterers",
        aboutSubtitle: aboutSubtitle || "With 15+ years of experience and 500+ successful events in Delhi NCR, we bring passion, precision, and a personal touch to every celebration.",
      },
    });

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 });
  }
}
