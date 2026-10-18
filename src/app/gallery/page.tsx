import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FullGalleryClient } from "@/components/FullGalleryClient";
import { Image as ImageIcon, ChevronRight } from "lucide-react";

export const revalidate = 0; // Fresh content on each request

export const metadata: Metadata = {
  title: "Event & Food Photo Gallery | Verma Caterers & Events Delhi NCR",
  description:
    "Explore our complete authentic photography gallery showcasing wedding catering, multi-cuisine live food counters, mandap decorations, floral stage styling, and banquet setups across Delhi, Dwarka & Gurugram.",
  alternates: {
    canonical: "https://vermacaterersevents.com/gallery",
  },
  openGraph: {
    title: "Event & Food Photo Gallery | Verma Caterers & Events Delhi NCR",
    description:
      "Explore our authentic photography gallery showcasing wedding catering, live food counters, mandap decorations, and banquet setups across Delhi NCR.",
    url: "https://vermacaterersevents.com/gallery",
    siteName: "Verma Caterers & Events",
    images: [
      {
        url: "/verma-logo-512.png",
        width: 512,
        height: 512,
        alt: "Verma Caterers Photo Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event & Food Photo Gallery | Verma Caterers & Events Delhi NCR",
    description:
      "Explore our authentic photography gallery showcasing wedding catering, live food counters, and banquet setups across Delhi NCR.",
    images: ["/verma-logo-512.png"],
  },
};

export default async function GalleryPage() {
  let galleryItems: any[] = [];
  let settings: any = null;

  try {
    galleryItems = await prisma.galleryItem.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });
  } catch (e) {
    console.error("Failed to load gallery items for gallery page:", e);
  }

  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-slate-950 text-[#111827] dark:text-slate-100 font-sans flex flex-col justify-between transition-colors">
      <div>
        <Header />

        {/* Hero Banner with Breadcrumbs */}
        <section className="bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent py-14 sm:py-20 px-6 border-b border-slate-200/60 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            {/* Breadcrumbs */}
            <div className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 dark:text-white font-semibold">Photo Gallery</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-400/30 mx-auto">
              <ImageIcon className="w-3.5 h-3.5" /> Authentic Event Photography
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Visual Culinary & Banqueting Gallery
            </h1>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Browse our complete collection of catering setups, authentic multi-cuisine live stations, luxury mandap decorations, banquet arrangements, and sound setups across Delhi NCR.
            </p>
          </div>
        </section>

        {/* Gallery Client Grid */}
        <main className="py-14 sm:py-16 px-5 sm:px-8 max-w-7xl mx-auto">
          <FullGalleryClient
            galleryItems={galleryItems}
            phone={settings?.phone}
            whatsapp={settings?.whatsappNumber}
          />
        </main>
      </div>

      <Footer />
    </div>
  );
}
