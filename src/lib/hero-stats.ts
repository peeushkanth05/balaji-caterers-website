import { prisma } from "@/lib/prisma";
import { BUSINESS_CONFIG } from "@/lib/config";

export interface DefaultHeroStatistic {
  icon: string;
  number: string;
  title: string;
  sortOrder: number;
  isEnabled: boolean;
}

export const DEFAULT_HERO_STATISTICS: DefaultHeroStatistic[] = [
  { icon: "🏆", number: BUSINESS_CONFIG.experienceStats[1].value, title: BUSINESS_CONFIG.experienceStats[1].label, sortOrder: 1, isEnabled: true },
  { icon: "⭐", number: BUSINESS_CONFIG.experienceStats[0].value, title: BUSINESS_CONFIG.experienceStats[0].label, sortOrder: 2, isEnabled: true },
  { icon: "💗", number: BUSINESS_CONFIG.experienceStats[2].value, title: BUSINESS_CONFIG.experienceStats[2].label, sortOrder: 3, isEnabled: true },
];

/**
 * Ensures default hero statistics exist in the database.
 * If none exist, seeds the 4 default cards (🏆 500+, ⭐ 15+, 💗 1000+, 💯 100%).
 */
export async function ensureDefaultHeroStatistics() {
  try {
    // Ensure default heroSection exists
    await prisma.heroSection.upsert({
      where: { id: "default" },
      update: {},
      create: {
        id: "default",
        isEnabled: true,
      },
    });

    const existing = await prisma.heroStatistic.findMany({
      where: { heroSectionId: "default" },
      orderBy: { sortOrder: "asc" },
    });

    if (existing.length === 0) {
      await prisma.heroStatistic.createMany({
        data: DEFAULT_HERO_STATISTICS.map((stat) => ({
          heroSectionId: "default",
          icon: stat.icon,
          number: stat.number,
          title: stat.title,
          sortOrder: stat.sortOrder,
          isEnabled: stat.isEnabled,
        })),
      });

      return await prisma.heroStatistic.findMany({
        where: { heroSectionId: "default" },
        orderBy: { sortOrder: "asc" },
      });
    }

    return existing;
  } catch (error) {
    console.warn("Could not ensure default hero statistics in DB:", error);
    return DEFAULT_HERO_STATISTICS.map((stat, idx) => ({
      id: `fallback-s${idx + 1}`,
      heroSectionId: "default",
      icon: stat.icon,
      number: stat.number,
      prefix: "",
      suffix: "",
      title: stat.title,
      sortOrder: stat.sortOrder,
      isEnabled: stat.isEnabled,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }
}
