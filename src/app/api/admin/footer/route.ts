import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const footer = await prisma.footerSettings.upsert({
      where: { id: "default" },
      update: {},
      create: {
        id: "default",
        aboutText: "Shree Balaji Caterers — Delhi NCR's premium wedding catering, fresh menus, floral decorators, and event management since 2011.",
        locationText: "Dwarka Sector 5, Madhu Vihar, New Delhi",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=28.5921,77.0460",
        phone: "+91 98104 83544",
        email: "vermasandeep124@gmail.com",
        copyrightText: "© 2026 Shree Balaji Caterers. All Rights Reserved.",
      },
    });

    return NextResponse.json({ footer });
  } catch (error) {
    console.error("Admin Footer GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch footer settings" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const payload = await req.json();

    const footer = await prisma.footerSettings.upsert({
      where: { id: "default" },
      update: {
        aboutText: payload.aboutText,
        locationText: payload.locationText,
        mapsUrl: payload.mapsUrl,
        phone: payload.phone,
        email: payload.email,
        copyrightText: payload.copyrightText,
        privacyPolicy: payload.privacyPolicy,
        termsOfService: payload.termsOfService,
        refundPolicy: payload.refundPolicy,
        cancellationPolicy: payload.cancellationPolicy,
        cookiePolicy: payload.cookiePolicy,
        disclaimer: payload.disclaimer,
      },
      create: {
        id: "default",
        aboutText: payload.aboutText || "",
        locationText: payload.locationText || "",
        mapsUrl: payload.mapsUrl || "",
        phone: payload.phone || "",
        email: payload.email || "",
        copyrightText: payload.copyrightText || "",
        privacyPolicy: payload.privacyPolicy || "",
        termsOfService: payload.termsOfService || "",
        refundPolicy: payload.refundPolicy || "",
        cancellationPolicy: payload.cancellationPolicy || "",
        cookiePolicy: payload.cookiePolicy || "",
        disclaimer: payload.disclaimer || "",
      },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true, footer });
  } catch (error: any) {
    console.error("Admin Footer PATCH Error:", error);
    return NextResponse.json({ error: `Failed to update footer settings: ${error.message || error}` }, { status: 500 });
  }
}
