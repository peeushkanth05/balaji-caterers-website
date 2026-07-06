"use client";

import { useState, useEffect, useCallback } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface Ad {
  id: string;
  title: string;
  description?: string;
  brandName?: string;
  imageUrl: string;
  redirectUrl?: string;
  ctaText: string;
}

export function AdvertisementBanner({ ads }: { ads: Ad[] }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const total = ads.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-slide every 5s unless hovered
  useEffect(() => {
    if (total <= 1 || isHovered) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [total, isHovered, next]);

  if (!ads || ads.length === 0) return null;

  const ad = ads[current];

  return (
    <div
      className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl my-12 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* "Advertisement" label */}
      <span className="absolute top-3 left-3 z-20 bg-black/50 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
        Advertisement
      </span>

      {/* Banner Image */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px]">
        {ads.map((a, idx) => (
          <div
            key={a.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={a.imageUrl}
              alt={a.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
        ))}

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8 md:p-10">
          <div className="max-w-2xl space-y-3">
            {ad.brandName && (
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-amber-400 bg-amber-400/10 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-400/20">
                {ad.brandName}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight drop-shadow-lg">
              {ad.title}
            </h2>
            {ad.description && (
              <p className="text-sm text-white/80 max-w-lg leading-relaxed line-clamp-2">
                {ad.description}
              </p>
            )}
            {ad.redirectUrl && (
              <a
                href={ad.redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-2xl shadow-lg transition-transform hover:scale-[1.03] active:scale-95 text-xs uppercase tracking-wider mt-2"
              >
                {ad.ctaText || "Learn More"}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows (only if multiple ads) */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5">
            {ads.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === current
                    ? "bg-white w-5"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
