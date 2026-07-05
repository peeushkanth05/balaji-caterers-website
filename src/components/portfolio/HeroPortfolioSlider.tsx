"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Eye, Tag } from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

interface HeroPortfolioSliderProps {
  portfolios: PortfolioData[];
  autoplaySpeed?: number; // ms, default 6000
}

export function HeroPortfolioSlider({
  portfolios,
  autoplaySpeed = 6000,
}: HeroPortfolioSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const total = portfolios.length;

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(handleNext, autoplaySpeed);
    return () => clearInterval(timer);
  }, [handleNext, isPaused, total, autoplaySpeed]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!portfolios || portfolios.length === 0) return null;

  const current = portfolios[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-900 text-white min-h-[480px] lg:min-h-[560px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Carousel with Framer Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={current.coverImage || "/new-logo.png"}
            alt={current.altText || current.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 space-y-6">
          {/* Category & Featured Badge */}
          <motion.div
            key={`badge-${current.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" /> Featured Showcase
            </span>
            {current.category && (
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
                {current.category.icon} {current.category.categoryName}
              </span>
            )}
          </motion.div>

          {/* Title */}
          <motion.h2
            key={`title-${current.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight"
          >
            {current.title}
          </motion.h2>

          {/* Short Description */}
          <motion.p
            key={`desc-${current.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed line-clamp-3"
          >
            {current.shortDescription}
          </motion.p>

          {/* Tags */}
          {current.tags && current.tags.length > 0 && (
            <motion.div
              key={`tags-${current.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2 pt-1"
            >
              {current.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg"
                >
                  <Tag className="w-3 h-3 text-amber-400" /> {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            key={`btns-${current.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-3"
          >
            <Link
              href={`/portfolio/${current.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-xl shadow-amber-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <Eye className="w-4 h-4" /> View Full Event Gallery
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold text-sm transition-all"
            >
              Get Event Quote <ArrowRight className="w-4 h-4 text-amber-400" />
            </a>
          </motion.div>
        </div>

        {/* Thumbnail Preview & Controls */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between space-y-6">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {portfolios.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all ${
                  idx === currentIndex
                    ? "w-8 h-2.5 bg-amber-500 rounded-full"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/80 rounded-full"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev/Next Arrow Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 text-white flex items-center justify-center transition-all active:scale-95 shadow-lg"
              title="Previous project"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 text-white flex items-center justify-center transition-all active:scale-95 shadow-lg"
              title="Next project"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
