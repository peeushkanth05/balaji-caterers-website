import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://vermacaterersevents.com";

  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic portfolio routes from database
  let portfolioRoutes: MetadataRoute.Sitemap = [];
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true },
    });

    portfolioRoutes = portfolios.map((p) => ({
      url: `${baseUrl}/portfolio/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Error fetching portfolios for sitemap:", e);
  }

  return [...staticRoutes, ...portfolioRoutes];
}
