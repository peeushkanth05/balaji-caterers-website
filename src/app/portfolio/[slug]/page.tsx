import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PortfolioDetailView } from "@/components/portfolio/PortfolioDetailView";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";

import { Footer } from "@/components/Footer";

interface PageProps {
  params: { slug: string };
}

// Generate dynamic SEO Metadata for each portfolio item
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const portfolio = await prisma.portfolio.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      seoTitle: true,
      seoDescription: true,
      shortDescription: true,
      coverImage: true,
    },
  });

  if (!portfolio) {
    return {
      title: "Portfolio Not Found | Shree Balaji Caterers",
    };
  }

  return {
    title: portfolio.seoTitle || `${portfolio.title} | Shree Balaji Caterers`,
    description: portfolio.seoDescription || portfolio.shortDescription,
    openGraph: {
      title: portfolio.seoTitle || portfolio.title,
      description: portfolio.seoDescription || portfolio.shortDescription,
      images: portfolio.coverImage ? [portfolio.coverImage] : [],
    },
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = params;

  const portfolioRaw = await prisma.portfolio.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!portfolioRaw || !portfolioRaw.active) {
    notFound();
  }

  let galleryImages: string[] = [];
  let tags: string[] = [];
  try {
    galleryImages = JSON.parse(portfolioRaw.galleryImages || "[]");
  } catch {
    galleryImages = [];
  }
  try {
    tags = JSON.parse(portfolioRaw.tags || "[]");
  } catch {
    tags = [];
  }

  const portfolio = {
    ...portfolioRaw,
    galleryImages,
    tags,
  };

  // Related Portfolios
  const relatedRaw = await prisma.portfolio.findMany({
    where: {
      active: true,
      categoryId: portfolio.categoryId,
      id: { not: portfolio.id },
    },
    take: 3,
    orderBy: { displayOrder: "asc" },
    include: { category: true },
  });

  const relatedPortfolios = relatedRaw.map((p) => ({
    ...p,
    galleryImages: JSON.parse(p.galleryImages || "[]"),
    tags: JSON.parse(p.tags || "[]"),
  }));

  // Navigation Prev/Next
  const prevRaw = await prisma.portfolio.findFirst({
    where: {
      active: true,
      displayOrder: { lt: portfolio.displayOrder },
    },
    orderBy: { displayOrder: "desc" },
    select: { title: true, slug: true, coverImage: true },
  });

  const nextRaw = await prisma.portfolio.findFirst({
    where: {
      active: true,
      displayOrder: { gt: portfolio.displayOrder },
    },
    orderBy: { displayOrder: "asc" },
    select: { title: true, slug: true, coverImage: true },
  });

  const settings = await prisma.siteSetting.findUnique({
    where: { id: "default" },
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header Navigation */}
      <Header />

      {/* Page Body */}
      <main className="pt-10 pb-20 px-6 max-w-7xl mx-auto">
        <PortfolioDetailView
          portfolio={portfolio}
          relatedPortfolios={relatedPortfolios}
          navigation={{ prev: prevRaw, next: nextRaw }}
          whatsappNumber={settings?.whatsapp || "919810483544"}
          phone={settings?.phone || "+91 98104 83544"}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
