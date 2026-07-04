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
    const { phone, whatsapp, email, ownerName, address, mapsUrl } = await req.json();

    const updatedSettings = await prisma.siteSetting.upsert({
      where: { id: "default" },
      update: {
        ...(phone && { phone }),
        ...(whatsapp && { whatsapp }),
        ...(email && { email }),
        ...(ownerName && { ownerName }),
        ...(address && { address }),
        ...(mapsUrl && { mapsUrl }),
      },
      create: {
        id: "default",
        phone: phone || "+91 98104 83544",
        whatsapp: whatsapp || "919810483544",
        email: email || "vermasandeep124@gmail.com",
        ownerName: ownerName || "Sandeep Verma",
        address: address || "Dwarka Sector 5, Madhu Vihar, New Delhi",
        mapsUrl: mapsUrl || "https://www.google.com/maps",
      },
    });

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 });
  }
}
