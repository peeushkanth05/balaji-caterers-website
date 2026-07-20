import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// GET /api/admin/hero - Admin only: Fetch full hero section configuration
export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    let hero = await prisma.heroSection.findUnique({
      where: { id: "default" },
      include: {
        statistics: { orderBy: { sortOrder: "asc" } },
        images: { orderBy: { displayOrder: "asc" } },
        floatingCards: { orderBy: { sortOrder: "asc" } },
      },
    });

    // If default hero does not exist yet, initialize it
    if (!hero) {
      hero = await prisma.heroSection.create({
        data: {
          id: "default",
          isEnabled: true,
          badgeShow: true,
          badgeText: "Delhi NCR's Premier Event Partner",
          badgeIcon: "⭐",
          heading: "Every Celebration, Perfectly Crafted.",
          subheading: "From grand royal weddings to intimate family gatherings — Verma Caterers brings you world-class catering, stunning floral décor, seamless sound, and complete event management.",
          primaryBtnText: "Book Your Event ✨",
          primaryBtnLink: "#contact",
          secondaryBtnText: "View Our Work 🎨",
          secondaryBtnLink: "#portfolio",
          sliderAutoPlay: true,
          sliderSpeed: 5000,
        },
        include: {
          statistics: { orderBy: { sortOrder: "asc" } },
          images: { orderBy: { displayOrder: "asc" } },
          floatingCards: { orderBy: { sortOrder: "asc" } },
        },
      });
    }

    return NextResponse.json({ hero });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero configuration" }, { status: 500 });
  }
}

// PATCH /api/admin/hero - Admin only: Update main hero configuration
export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const body = await req.json();

    const updatedHero = await prisma.heroSection.upsert({
      where: { id: "default" },
      update: {
        ...(body.isEnabled !== undefined && { isEnabled: body.isEnabled }),
        ...(body.badgeShow !== undefined && { badgeShow: body.badgeShow }),
        ...(body.badgeText !== undefined && { badgeText: body.badgeText }),
        ...(body.badgeIcon !== undefined && { badgeIcon: body.badgeIcon }),
        ...(body.heading !== undefined && { heading: body.heading }),
        ...(body.subheading !== undefined && { subheading: body.subheading }),
        ...(body.primaryBtnText !== undefined && { primaryBtnText: body.primaryBtnText }),
        ...(body.primaryBtnLink !== undefined && { primaryBtnLink: body.primaryBtnLink }),
        ...(body.secondaryBtnText !== undefined && { secondaryBtnText: body.secondaryBtnText }),
        ...(body.secondaryBtnLink !== undefined && { secondaryBtnLink: body.secondaryBtnLink }),
        ...(body.sliderAutoPlay !== undefined && { sliderAutoPlay: body.sliderAutoPlay }),
        ...(body.sliderSpeed !== undefined && { sliderSpeed: Number(body.sliderSpeed) }),
      },
      create: {
        id: "default",
        isEnabled: body.isEnabled ?? true,
        badgeShow: body.badgeShow ?? true,
        badgeText: body.badgeText || "Delhi NCR's Premier Event Partner",
        badgeIcon: body.badgeIcon || "⭐",
        heading: body.heading || "Every Celebration, Perfectly Crafted.",
        subheading: body.subheading || "From grand royal weddings to intimate family gatherings — Verma Caterers brings you world-class catering, stunning floral décor, seamless sound, and complete event management.",
        primaryBtnText: body.primaryBtnText || "Book Your Event ✨",
        primaryBtnLink: body.primaryBtnLink || "#contact",
        secondaryBtnText: body.secondaryBtnText || "View Our Work 🎨",
        secondaryBtnLink: body.secondaryBtnLink || "#portfolio",
        sliderAutoPlay: body.sliderAutoPlay ?? true,
        sliderSpeed: Number(body.sliderSpeed) || 5000,
      },
      include: {
        statistics: { orderBy: { sortOrder: "asc" } },
        images: { orderBy: { displayOrder: "asc" } },
        floatingCards: { orderBy: { sortOrder: "asc" } },
      },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true, hero: updatedHero });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 });
  }
}
