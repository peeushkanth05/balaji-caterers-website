"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeroSectionData } from "@/types/hero";

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

  // Fallbacks if DB hero is null or disabled
  const isEnabled = hero?.isEnabled ?? true;
  const badgeShow = hero?.badgeShow ?? true;
  const badgeText = hero?.badgeText || "Weddings · Catering · Event Management";

  const rawHeading = hero?.heading || "Exceptional Events. Unforgettable Experiences.";
  // Extract two-part headline if available
  let headlinePart1 = rawHeading;
  let headlinePart2 = hero?.headingHighlight || "";

  if (!headlinePart2 && rawHeading.includes(".")) {
    const parts = rawHeading.split(".");
    headlinePart1 = parts[0].trim() + ".";
    headlinePart2 = parts.slice(1).join(".").trim();
  }

  const subheading =
    hero?.subheading ||
    "Premium catering, beautiful décor and seamless event management for weddings, corporate gatherings and special celebrations across Delhi NCR.";
  const primaryBtnText = hero?.primaryBtnText || "Get a Free Quote";
  const primaryBtnLink = hero?.primaryBtnLink || "#contact";
  const secondaryBtnText = hero?.secondaryBtnText || "Explore Our Work";
  const secondaryBtnLink = hero?.secondaryBtnLink || "#portfolio";

  // Service highlights - 3 core differentiators
  const serviceHighlights =
    hero?.floatingCards && hero.floatingCards.length >= 3
      ? hero.floatingCards.filter((c) => c.isEnabled).slice(0, 3)
      : [
          { title: "Premium Catering", description: "Custom menus" },
          { title: "Wedding Décor", description: "Event styling" },
          { title: "Complete Events", description: "End-to-end execution" },
        ];

  // Statistics counters
  const statistics =
    hero?.statistics && hero.statistics.length > 0
      ? hero.statistics.filter((s) => s.isEnabled)
      : [
          { id: "s1", icon: "", number: "500+", title: "Events Managed", sortOrder: 1 },
          { id: "s2", icon: "", number: "15+", title: "Years Experience", sortOrder: 2 },
          { id: "s3", icon: "", number: "1000+", title: "Happy Families", sortOrder: 3 },
          { id: "s4", icon: "", number: "100%", title: "Satisfaction", sortOrder: 4 },
        ];

  // Authentic event photography slides
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

  // Carousel timer
  const autoPlay = hero?.sliderAutoPlay ?? true;
  const speed = hero?.sliderSpeed || 5000;

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, speed);
    return () => clearInterval(interval);
  }, [autoPlay, speed, slides.length]);

  if (!isEnabled) return null;

  return (
    <section className="relative overflow-hidden bg-[#F8F7F3] text-slate-900 dark:bg-slate-950 dark:text-white transition-colors">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Copy & CTAs */}
          <div className="max-w-2xl">
            {badgeShow && (
              <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
                {badgeText}
              </span>
            )}

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
              {headlinePart1}
              {headlinePart2 && (
                <span className="mt-1 block text-amber-600 dark:text-amber-500">
                  {headlinePart2}
                </span>
              )}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg font-normal">
              {subheading}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryBtnLink}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 shadow-md shadow-amber-500/20"
              >
                {primaryBtnText} <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={secondaryBtnLink}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white active:scale-95 shadow-sm"
              >
                {secondaryBtnText}
              </Link>
            </div>

            {/* Service Highlights (3 columns) */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
              {serviceHighlights.map((hl, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-xs sm:text-sm md:text-base">
                    {hl.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {hl.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Authentic Event Photography Carousel */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 shadow-xl">
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-slate-950/50 text-white backdrop-blur-sm transition hover:bg-slate-950/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-slate-950/50 text-white backdrop-blur-sm transition hover:bg-slate-950/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 p-1">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentSlide
                            ? "w-6 bg-amber-400"
                            : "w-2 bg-white/70 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Strip */}
        {statistics.length > 0 && (
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
            {statistics.map((stat, sIdx) => (
              <div key={stat.id || sIdx} className="text-center p-2 sm:p-3">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-600 dark:text-amber-500">
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
