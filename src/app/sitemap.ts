import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://vermacaterersevents.com";

  // Static public & Local SEO routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wedding-catering-dwarka`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wedding-catering-gurugram`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/catering-services-delhi-ncr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/birthday-catering-dwarka`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/corporate-catering-gurugram`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/puja-kirtan-catering-delhi-ncr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/small-gathering-catering-dwarka`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs/wedding-catering-menu-guide-dwarka`,
      lastModified: new Date(),
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
      lastModified: p.updatedAt || new Date(),
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
      lastModified: b.updatedAt || new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    }));
  } catch (e) {
    console.error("Error fetching blogs for sitemap:", e);
  }

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes];
}
