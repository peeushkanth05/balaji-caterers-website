import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { DEFAULT_HERO_STATISTICS, ensureDefaultHeroStatistics } from "@/lib/hero-stats";

// GET /api/admin/emojis - Fetch all statistic card emojis
export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const statistics = await ensureDefaultHeroStatistics();
    return NextResponse.json({ success: true, statistics, defaults: DEFAULT_HERO_STATISTICS });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch emoji statistics" }, { status: 500 });
  }
}

// PUT /api/admin/emojis - Update individual emoji / statistic card
export async function PUT(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, icon, isEnabled, number, title, sortOrder } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Statistic ID is required" }, { status: 400 });
    }

    const updated = await prisma.heroStatistic.update({
      where: { id },
      data: {
        ...(icon !== undefined && { icon }),
        ...(isEnabled !== undefined && { isEnabled }),
        ...(number !== undefined && { number }),
        ...(title !== undefined && { title }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/emojis");
    revalidatePath("/admin/hero");

    return NextResponse.json({ success: true, statistic: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update emoji" }, { status: 500 });
  }
}

// POST /api/admin/emojis - Bulk update or restore defaults
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const body = await req.json();
    const { action, id, defaultIcon } = body;

    if (action === "restore-defaults") {
      // Restore all 4 cards to official defaults
      await prisma.heroStatistic.deleteMany({
        where: { heroSectionId: "default" },
      });

      await prisma.heroStatistic.createMany({
        data: DEFAULT_HERO_STATISTICS.map((s) => ({
          heroSectionId: "default",
          icon: s.icon,
          number: s.number,
          title: s.title,
          sortOrder: s.sortOrder,
          isEnabled: s.isEnabled,
        })),
      });

      const fresh = await prisma.heroStatistic.findMany({
        where: { heroSectionId: "default" },
        orderBy: { sortOrder: "asc" },
      });

      revalidatePath("/");
      revalidatePath("/admin/emojis");
      revalidatePath("/admin/hero");

      return NextResponse.json({ success: true, statistics: fresh, message: "Restored all 4 default emojis" });
    }

    if (action === "restore-single" && id && defaultIcon) {
      const updated = await prisma.heroStatistic.update({
        where: { id },
        data: { icon: defaultIcon, isEnabled: true },
      });

      revalidatePath("/");
      revalidatePath("/admin/emojis");
      revalidatePath("/admin/hero");

      return NextResponse.json({ success: true, statistic: updated });
    }

    if (action === "remove-emoji" && id) {
      // Clears emoji icon
      const updated = await prisma.heroStatistic.update({
        where: { id },
        data: { icon: "" },
      });

      revalidatePath("/");
      revalidatePath("/admin/emojis");
      revalidatePath("/admin/hero");

      return NextResponse.json({ success: true, statistic: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to perform emoji action" }, { status: 500 });
  }
}
