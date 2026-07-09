"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowRight,
  Star,
  ShieldCheck,
  Award,
} from "lucide-react";
import { HeroSectionData } from "@/types/hero";

interface HeroSectionProps {
  hero: HeroSectionData | null;
  phone?: string;
  whatsapp?: string;
}

export function HeroSection({ hero, phone = "+91 98104 83544", whatsapp = "919810483544" }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fallbacks if DB hero is null or disabled
  const isEnabled = hero?.isEnabled ?? true;
  const badgeShow = hero?.badgeShow ?? true;
  const badgeText = hero?.badgeText || "Delhi NCR's Premier Event Partner";
  const badgeIcon = hero?.badgeIcon || "⭐";
  const heading = hero?.heading || "Every Celebration, Perfectly Crafted.";
  const subheading =
    hero?.subheading ||
    "From grand royal weddings to intimate family gatherings — Shree Balaji Caterers brings you world-class catering, stunning floral décor, seamless sound, and complete event management.";
  const primaryBtnText = hero?.primaryBtnText || "Book Your Event ✨";
  const primaryBtnLink = hero?.primaryBtnLink || "#contact";
  const secondaryBtnText = hero?.secondaryBtnText || "View Our Work 🎨";
  const secondaryBtnLink = hero?.secondaryBtnLink || "#portfolio";

  const statistics = hero?.statistics && hero.statistics.length > 0
    ? hero.statistics.filter((s) => s.isEnabled)
    : [
        { id: "s1", icon: "🏆", number: "500+", title: "Events Managed", sortOrder: 1, isEnabled: true, heroSectionId: "default" },
        { id: "s2", icon: "⭐", number: "15+", title: "Years Experience", sortOrder: 2, isEnabled: true, heroSectionId: "default" },
        { id: "s3", icon: "❤️", number: "1000+", title: "Happy Families", sortOrder: 3, isEnabled: true, heroSectionId: "default" },
        { id: "s4", icon: "💯", number: "100%", title: "Satisfaction", sortOrder: 4, isEnabled: true, heroSectionId: "default" },
      ];

  const slides = hero?.images && hero.images.length > 0
    ? hero.images.filter((img) => img.isEnabled)
    : [
        { id: "i1", imageUrl: "/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg", altText: "Grand Royal Wedding Mandap", displayOrder: 1, isEnabled: true, heroSectionId: "default", mobileImageUrl: "", caption: "" },
        { id: "i2", imageUrl: "/grand_wedding_decor/7b473ea8-3932-41ab-bac7-910973b59980.jpg", altText: "Lavish Food Buffets", displayOrder: 2, isEnabled: true, heroSectionId: "default", mobileImageUrl: "", caption: "" },
        { id: "i3", imageUrl: "/grand_wedding_decor/93f97c61-cb64-4b24-b9ed-3cef9082b0f4.jpg", altText: "Floral Stage Design", displayOrder: 3, isEnabled: true, heroSectionId: "default", mobileImageUrl: "", caption: "" },
      ];

  const floatingCards = hero?.floatingCards && hero.floatingCards.length > 0
    ? hero.floatingCards.filter((card) => card.isEnabled)
    : [
        { id: "fc1", icon: "🍽️", title: "Catering", description: "North & Fusion", color: "amber", link: "", sortOrder: 1, isEnabled: true, heroSectionId: "default" },
        { id: "fc2", icon: "🌸", title: "Floral Décor", description: "Custom Mandaps", color: "orange", link: "", sortOrder: 2, isEnabled: true, heroSectionId: "default" },
        { id: "fc3", icon: "📢", title: "Sound & DJ", description: "Pro Audio & Lights", color: "blue", link: "", sortOrder: 3, isEnabled: true, heroSectionId: "default" },
        { id: "fc4", icon: "🎉", title: "Full Events", description: "End-to-End Execution", color: "emerald", link: "", sortOrder: 4, isEnabled: true, heroSectionId: "default" },
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
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 bg-gradient-to-b from-amber-500/10 via-slate-50 to-white dark:via-slate-950 dark:to-slate-950">
      {/* Background Subtle Pattern & Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/20 dark:bg-amber-400/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-orange-400/15 dark:bg-orange-400/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column — Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Badge */}
            {badgeShow && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-500/30 text-amber-900 dark:text-amber-300 font-bold text-xs shadow-sm">
                <span>{badgeIcon}</span>
                <span>{badgeText}</span>
              </div>
            )}

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 dark:text-white leading-[1.15]">
              {heading}
            </h1>

            {/* Subheading */}
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {subheading}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href={primaryBtnLink}
                  className="relative group overflow-hidden w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base shadow-xl shadow-amber-500/25 transition-all text-center flex items-center justify-center gap-2"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2,
                      ease: "linear",
                    }}
                  />
                  <span>{primaryBtnText}</span>
                  <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href={secondaryBtnLink}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-base shadow-sm transition-all hover:border-amber-300 text-center flex items-center justify-center gap-2"
                >
                  <span>{secondaryBtnText}</span>
                </Link>
              </motion.div>
            </div>

            {/* Floating Service Cards Grid */}
            {floatingCards.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80 dark:border-slate-800/60">
                {floatingCards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)", borderColor: "#f59e0b" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm text-left cursor-pointer transition-colors"
                  >
                    <div className="text-xl mb-1">{card.icon}</div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{card.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{card.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column — Interactive Image Slider Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={slides[currentSlide]?.imageUrl || "/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg"}
                    alt={slides[currentSlide]?.altText || "Shree Balaji Caterers Event"}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {slides[currentSlide]?.caption && (
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/70 backdrop-blur-md p-3 rounded-xl text-white text-xs font-semibold">
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                    title="Next Slide"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentSlide ? "w-6 bg-amber-400" : "w-2 bg-white/60 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>

        </div>

        {/* Dynamic Statistics Counters Bar */}
        {statistics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 shadow-lg"
          >
            {statistics.map((stat) => (
              <div key={stat.id} className="text-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-600">
                  {stat.number}
                </div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">{stat.title}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
