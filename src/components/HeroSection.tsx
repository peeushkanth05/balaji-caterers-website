"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Utensils, Award, ShieldCheck } from "lucide-react";
import { HeroSectionData } from "@/types/hero";

// Lazy-load 3D stage with high-performance SSR disabled
const HeroScene3D = dynamic(() => import("./HeroScene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
    </div>
  ),
});

interface HeroSectionProps {
  hero: HeroSectionData | null;
  phone?: string;
  whatsapp?: string;
}

export function HeroSection({
  hero,
  phone = "+91 98104 83544",
  whatsapp = "919810483544",
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeView, setActiveView] = useState<"3d" | "photos">("3d");

  // Fallbacks if DB hero is null or disabled
  const isEnabled = hero?.isEnabled ?? true;
  const badgeShow = hero?.badgeShow ?? true;
  const badgeText = hero?.badgeText || "Weddings · Catering · Event Management";

  const rawHeading = hero?.heading || "Exceptional Events. Unforgettable Experiences.";
  let headlinePart1 = rawHeading;
  let headlinePart2 = hero?.headingHighlight || "";

  if (!headlinePart2 && rawHeading.includes(".")) {
    const parts = rawHeading.split(".");
    headlinePart1 = parts[0].trim() + ".";
    headlinePart2 = parts.slice(1).join(".").trim();
  }

  const subheading =
    hero?.subheading ||
    "Fine culinary artistry, authentic regional flavors, and bespoke event management for luxury weddings and grand celebrations across Delhi NCR.";
  const primaryBtnText = hero?.primaryBtnText || "Request Tasting & Quote";
  const primaryBtnLink = hero?.primaryBtnLink || "#contact";
  const secondaryBtnText = hero?.secondaryBtnText || "Explore Menus";
  const secondaryBtnLink = hero?.secondaryBtnLink || "/packages";

  // Service highlights
  const serviceHighlights =
    hero?.floatingCards && hero.floatingCards.length >= 3
      ? hero.floatingCards.filter((c) => c.isEnabled).slice(0, 3)
      : [
          { title: "Pure Veg & Gourmet", description: "Bespoke menus & live stations" },
          { title: "Royal Event Decor", description: "Mandap & ambient styling" },
          { title: "Flawless Execution", description: "White-glove service staff" },
        ];

  // Statistics counters
  const statistics =
    hero?.statistics && hero.statistics.length > 0
      ? hero.statistics.filter((s) => s.isEnabled)
      : [
          { id: "s1", icon: "", number: "500+", title: "Grand Events Executed", sortOrder: 1 },
          { id: "s2", icon: "", number: "15+", title: "Years Culinary Craft", sortOrder: 2 },
          { id: "s3", icon: "", number: "1000+", title: "Delighted Families", sortOrder: 3 },
          { id: "s4", icon: "", number: "100%", title: "Hygiene & Purity", sortOrder: 4 },
        ];

  const slides =
    hero?.images && hero.images.length > 0
      ? hero.images.filter((img) => img.isEnabled)
      : [
          {
            id: "i1",
            imageUrl: "/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.webp",
            altText: "Grand Royal Wedding Mandap by Verma Caterers",
            caption: "Royal Wedding Mandap & Floral Decor",
          },
          {
            id: "i2",
            imageUrl: "/grand_wedding_decor/7b473ea8-3932-41ab-bac7-910973b59980.webp",
            altText: "Lavish Food Buffets & Live Counters",
            caption: "Lavish Food Buffets & Live Counters",
          },
          {
            id: "i3",
            imageUrl: "/grand_wedding_decor/93f97c61-cb64-4b24-b9ed-3cef9082b0f4.webp",
            altText: "Floral Stage Design & Ambient Lighting",
            caption: "Floral Stage Design & Ambient Lighting",
          },
          {
            id: "i4",
            imageUrl: "/grand_wedding_decor/fd3ad0c0-af52-4014-9461-a00f49abc506.webp",
            altText: "Luxury Event Seating & Reception Arrangement",
            caption: "Complete Event Management Execution",
          },
        ];

  const autoPlay = hero?.sliderAutoPlay ?? true;
  const speed = hero?.sliderSpeed || 5000;

  useEffect(() => {
    if (!autoPlay || slides.length <= 1 || activeView !== "photos") return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, speed);
    return () => clearInterval(interval);
  }, [autoPlay, speed, slides.length, activeView]);

  if (!isEnabled) return null;

  return (
    <section className="relative overflow-hidden bg-[#F8F7F3] text-slate-900 dark:bg-slate-950 dark:text-white transition-colors">
      {/* Background Soft Ambient Light */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20 relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Minimal Premium Restaurant Typography & CTAs (7 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {badgeShow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                {badgeText}
              </span>
            )}

            <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[54px] text-slate-900 dark:text-white">
              {headlinePart1}{" "}
              {headlinePart2 && (
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-400 dark:to-orange-400">
                  {headlinePart2}
                </span>
              )}
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg font-normal">
              {subheading}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row pt-2">
              <Link
                href={primaryBtnLink}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-600 px-7 py-3.5 font-semibold text-white transition hover:bg-amber-700 active:scale-95 shadow-sm hover:shadow"
              >
                {primaryBtnText} <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={secondaryBtnLink}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white/80 backdrop-blur-sm px-7 py-3.5 font-semibold text-slate-800 transition hover:border-amber-600 hover:text-amber-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white active:scale-95"
              >
                {secondaryBtnText}
              </Link>
            </div>

            {/* Service Highlights */}
            <div className="grid grid-cols-3 gap-4 border-t border-stone-200/80 pt-6 dark:border-slate-800">
              {serviceHighlights.map((hl, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                    {hl.title}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    {hl.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Cloche Showcase with Photo Toggle (6 cols) */}
          <div className="lg:col-span-6 relative">
            {/* View Mode Toggle (Interactive 3D vs Real Gallery) */}
            <div className="flex items-center justify-center sm:justify-end gap-2 mb-3">
              <div className="inline-flex p-1 rounded-full bg-stone-200/70 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <button
                  type="button"
                  onClick={() => setActiveView("3d")}
                  className={`px-3.5 py-1.5 rounded-full transition-all ${
                    activeView === "3d"
                      ? "bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-sm"
                      : "hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Interactive 3D
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView("photos")}
                  className={`px-3.5 py-1.5 rounded-full transition-all ${
                    activeView === "photos"
                      ? "bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-sm"
                      : "hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Live Photography
                </button>
              </div>
            </div>

            {activeView === "3d" ? (
              <div className="relative rounded-3xl border border-stone-200/80 bg-gradient-to-b from-[#FCFBF7] to-[#F8F7F3] dark:border-slate-800 dark:from-slate-900/60 dark:to-slate-950/80 shadow-sm overflow-hidden p-2">
                <HeroScene3D />
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <span className="text-[11px] font-medium text-stone-500 dark:text-slate-400 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm px-3.5 py-1 rounded-full border border-stone-200/60 dark:border-slate-800 shadow-xs">
                    ✦ Drag or swipe to interact with the 3D Gourmet Cloche
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-stone-200/80 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={slides[currentSlide]?.imageUrl || "/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.webp"}
                      alt={slides[currentSlide]?.altText || "Verma Caterers authentic event"}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                    {slides[currentSlide]?.caption && (
                      <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-900/75 p-3 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
                        {slides[currentSlide].caption}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Slider Controls */}
                {slides.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                      aria-label="Previous slide"
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/50 text-white backdrop-blur-sm transition hover:bg-slate-950/80"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                      aria-label="Next slide"
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/50 text-white backdrop-blur-sm transition hover:bg-slate-950/80"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 p-1">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === currentSlide
                              ? "w-5 bg-amber-400"
                              : "w-1.5 bg-white/70 hover:bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Minimalist Trust Statistics Strip */}
        {statistics.length > 0 && (
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-3xl border border-stone-200/80 bg-white/80 backdrop-blur-sm p-6 sm:p-7 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
            {statistics.map((stat, sIdx) => (
              <div key={stat.id || sIdx} className="text-center p-2 sm:p-3">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-amber-600 dark:text-amber-500">
                  {stat.number}
                </div>
                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
