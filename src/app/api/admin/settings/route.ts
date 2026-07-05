import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// GET /api/admin/settings - Admin only: Fetch site settings
export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch site settings" }, { status: 500 });
  }
}

// PATCH /api/admin/settings - Admin only: Update site settings
export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const body = await req.json();
    const {
      companyName,
      logoUrl,
      faviconUrl,
      phone,
      whatsapp,
      email,
      ownerName,
      address,
      mapsUrl,
      businessHours,
      facebookUrl,
      instagramUrl,
      youtubeUrl,
      twitterUrl,
      googleAnalyticsId,
      seoTitle,
      seoDescription,
      seoOgImage,
      aboutTag,
      aboutTitle,
      aboutSubtitle,
    } = body;

    const updatedSettings = await prisma.siteSetting.upsert({
      where: { id: "default" },
      update: {
        ...(companyName !== undefined && { companyName }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(faviconUrl !== undefined && { faviconUrl }),
        ...(phone !== undefined && { phone }),
        ...(whatsapp !== undefined && { whatsapp }),
        ...(email !== undefined && { email }),
        ...(ownerName !== undefined && { ownerName }),
        ...(address !== undefined && { address }),
        ...(mapsUrl !== undefined && { mapsUrl }),
        ...(businessHours !== undefined && { businessHours }),
        ...(facebookUrl !== undefined && { facebookUrl }),
        ...(instagramUrl !== undefined && { instagramUrl }),
        ...(youtubeUrl !== undefined && { youtubeUrl }),
        ...(twitterUrl !== undefined && { twitterUrl }),
        ...(googleAnalyticsId !== undefined && { googleAnalyticsId }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDescription !== undefined && { seoDescription }),
        ...(seoOgImage !== undefined && { seoOgImage }),
        ...(aboutTag !== undefined && { aboutTag }),
        ...(aboutTitle !== undefined && { aboutTitle }),
        ...(aboutSubtitle !== undefined && { aboutSubtitle }),
      },
      create: {
        id: "default",
        companyName: companyName || "Shree Balaji Caterers",
        logoUrl: logoUrl || "/new-logo.png",
        faviconUrl: faviconUrl || "/favicon.ico",
        phone: phone || "+91 98104 83544",
        whatsapp: whatsapp || "919810483544",
        email: email || "vermasandeep124@gmail.com",
        ownerName: ownerName || "Sandeep Verma",
        address: address || "Dwarka Sector 5, Madhu Vihar, New Delhi",
        mapsUrl: mapsUrl || "https://www.google.com/maps/search/?api=1&query=28.5921,77.0460&query_place_id=Dwarka+Sector+5+New+Delhi",
        businessHours: businessHours || "9:00 AM - 9:00 PM (Daily)",
        facebookUrl: facebookUrl || "",
        instagramUrl: instagramUrl || "",
        youtubeUrl: youtubeUrl || "",
        twitterUrl: twitterUrl || "",
        googleAnalyticsId: googleAnalyticsId || "",
        seoTitle: seoTitle || "Shree Balaji Caterers | Best Catering & Event Services in Delhi NCR",
        seoDescription: seoDescription || "Premium catering, floral décor, DJ & sound, and full event management services in Delhi NCR. 15+ years, 500+ events.",
        seoOgImage: seoOgImage || "/new-logo.png",
        aboutTag: aboutTag || "Why Us",
        aboutTitle: aboutTitle || "Why Choose Shree Balaji Caterers",
        aboutSubtitle: aboutSubtitle || "With 15+ years of experience and 500+ successful events in Delhi NCR, we bring passion, precision, and a personal touch to every celebration.",
      },
    });

    // Revalidate public landing page cache
    revalidatePath("/");

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 });
  }
}
