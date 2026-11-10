import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://vermacaterersevents.com";

  // Stable baseline date for verified static content (avoids daily churn in GSC)
  const staticContentDate = new Date("2026-10-30T00:00:00.000Z");

  // Static public & Local SEO routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wedding-catering-dwarka`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wedding-catering-gurugram`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/catering-services-delhi-ncr`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/birthday-catering-dwarka`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/corporate-catering-gurugram`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/puja-kirtan-catering-delhi-ncr`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/small-gathering-catering-dwarka`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: staticContentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: staticContentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: staticContentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs/wedding-catering-menu-guide-dwarka`,
      lastModified: staticContentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs/puja-kirtan-satvik-catering-tips`,
      lastModified: staticContentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs/small-gathering-catering-guest-calculator`,
      lastModified: staticContentDate,
      changeFrequency: "monthly",
      priority: 0.7,
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
      lastModified: p.updatedAt || staticContentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Error fetching portfolios for sitemap:", e);
  }

  // Dynamic blog routes from database
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await prisma.blogPost.findMany({
      select: { slug: true, updatedAt: true },
    });

    blogRoutes = blogs.map((b) => ({
      url: `${baseUrl}/blogs/${b.slug}`,
      lastModified: b.updatedAt || staticContentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    }));
  } catch (e) {
    console.error("Error fetching blogs for sitemap:", e);
  }

  const allRoutes = [...staticRoutes, ...portfolioRoutes, ...blogRoutes];
  const uniqueRoutesMap = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const route of allRoutes) {
    if (!uniqueRoutesMap.has(route.url)) {
      uniqueRoutesMap.set(route.url, route);
    }
  }

  return Array.from(uniqueRoutesMap.values());
}