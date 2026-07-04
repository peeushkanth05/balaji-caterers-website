"use client";

import { useState } from "react";
import { X } from "lucide-react";

// Color gradients per category for the overlay
const CATEGORY_COLORS: Record<string, string> = {
  Wedding: "from-orange-400/40 to-red-500/40",
  Floral: "from-pink-400/40 to-rose-500/40",
  Catering: "from-purple-400/40 to-indigo-500/40",
  "DJ & Sound": "from-cyan-400/40 to-teal-500/40",
  Birthday: "from-yellow-400/40 to-amber-500/40",
  General: "from-amber-400/40 to-orange-500/40",
};

const CATEGORY_HOVER_COLORS: Record<string, string> = {
  Wedding: "group-hover:from-orange-400/10 group-hover:to-red-500/10",
  Floral: "group-hover:from-pink-400/10 group-hover:to-rose-500/10",
  Catering: "group-hover:from-purple-400/10 group-hover:to-indigo-500/10",
  "DJ & Sound": "group-hover:from-cyan-400/10 group-hover:to-teal-500/10",
  Birthday: "group-hover:from-yellow-400/10 group-hover:to-amber-500/10",
  General: "group-hover:from-amber-400/10 group-hover:to-orange-500/10",
};

export function FrontendGallery({ items }: { items: any[] }) {
  const [activeLightbox, setActiveLightbox] = useState<any | null>(null);

  const formatUrl = (url: string) => {
    if (!url) return "/new-logo.png";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
      return url;
    }
    return `/${url}`;
  };

  // Bento grid size classes based on index position for asymmetric layout
  const getBentoClass = (index: number) => {
    // Layout pattern: Large, Medium-wide, Medium-wide, Wide, Medium, Medium, Medium
    const patterns = [
      "col-span-2 row-span-2 md:col-span-3 md:row-span-2", // Large hero card
      "col-span-2 md:col-span-3",                           // Medium wide right
      "col-span-2 md:col-span-3",                           // Medium wide right
      "col-span-2 md:col-span-3",                           // Wide left
      "col-span-2 md:col-span-2",                           // Medium
      "col-span-2 md:col-span-2",                           // Medium
      "col-span-2 md:col-span-2",                           // Medium
    ];
    return patterns[index % patterns.length];
  };

  const getMinHeight = (index: number) => {
    const heights = [
      "min-h-[380px] md:min-h-[460px]", // Large hero card
      "min-h-[200px] md:min-h-[220px]",  // Medium wide
      "min-h-[200px] md:min-h-[220px]",  // Medium wide
      "min-h-[200px] md:min-h-[220px]",  // Wide
      "min-h-[200px] md:min-h-[220px]",  // Medium
      "min-h-[200px] md:min-h-[220px]",  // Medium
      "min-h-[200px] md:min-h-[220px]",  // Medium
    ];
    return heights[index % heights.length];
  };

  return (
    <div className="space-y-12">
      {/* Bento Grid */}
      {items.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          No portfolio photos available yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 auto-rows-auto">
          {items.map((item, index) => {
            const overlayGradient = CATEGORY_COLORS[item.category] || CATEGORY_COLORS["General"];

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className={`${getBentoClass(index)} ${getMinHeight(index)} rounded-3xl overflow-hidden relative group cursor-pointer transition-all duration-[350ms] hover:scale-[1.025] hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:z-10`}
              >
                {/* Background Image */}
                <img
                  src={formatUrl(item.imageUrl)}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/new-logo.png";
                  }}
                />

                {/* Color Overlay - fades on hover to reveal image */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${overlayGradient} transition-opacity duration-[350ms] group-hover:opacity-10`}
                />

                {/* Label Pill */}
                <div className="absolute bottom-5 left-5 z-10">
                  <span className="inline-block bg-white/95 backdrop-blur-sm text-slate-900 font-bold text-sm px-5 py-2.5 rounded-full shadow-lg transition-transform duration-[350ms] group-hover:-translate-y-1">
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 text-white hover:text-amber-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[80vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={formatUrl(activeLightbox.imageUrl)}
                alt={activeLightbox.title}
                className="max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {activeLightbox.category}
                </span>
                <h3 className="font-serif font-bold text-xl text-white">
                  {activeLightbox.title}
                </h3>
              </div>
              <a
                href="#contact"
                onClick={() => setActiveLightbox(null)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs whitespace-nowrap shadow-md shadow-amber-500/20"
              >
                Book Similar Setup ✨
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
