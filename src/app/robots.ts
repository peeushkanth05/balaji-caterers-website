import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://vermacaterersevents.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api",
          "/api/*",
          "/login",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
