import { prisma } from "@/lib/prisma";

export interface DefaultHeroStatistic {
  icon: string;
  number: string;
  title: string;
  sortOrder: number;
  isEnabled: boolean;
}

export const DEFAULT_HERO_STATISTICS: DefaultHeroStatistic[] = [
  { icon: "🏆", number: "500+", title: "Events Managed", sortOrder: 1, isEnabled: true },
  { icon: "⭐", number: "15+", title: "Years Experience", sortOrder: 2, isEnabled: true },
  { icon: "💗", number: "1000+", title: "Happy Families", sortOrder: 3, isEnabled: true },
  { icon: "💯", number: "100%", title: "Satisfaction", sortOrder: 4, isEnabled: true },
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
