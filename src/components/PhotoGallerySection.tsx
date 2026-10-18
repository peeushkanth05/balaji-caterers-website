"use client";

import { useState, useMemo } from "react";
import { X, Image as ImageIcon, ZoomIn, Eye, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category?: string | null;
}

interface PhotoGallerySectionProps {
  galleryItems: GalleryItem[];
}

export function PhotoGallerySection({ galleryItems }: PhotoGallerySectionProps) {
  const [lightboxImg, setLightboxImg] = useState<GalleryItem | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories for grid filter
  const categories = useMemo(() => {
    const list = new Set(galleryItems.map((item) => item.category).filter(Boolean));
    return ["All", ...Array.from(list)];
  }, [galleryItems]);

  // Filter items based on selected category
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [galleryItems, activeCategory]);

  const getWebpUrl = (url: string) => {
    if (!url) return "/new-logo.webp";
    if (url.endsWith(".webp")) return url;
    return url.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  };

  // Double list for infinite marquee slider
  const marqueeItems = useMemo(() => {
    if (galleryItems.length === 0) return [];
    const base = galleryItems.slice(0, 8);
    return [...base, ...base];
  }, [galleryItems]);

  return (
    <section id="gallery" className="py-20 lg:py-24 bg-white/60 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800 overflow-hidden space-y-12 transition-colors">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200/60 dark:border-amber-800/60">
          <ImageIcon className="w-3.5 h-3.5" /> Event & Food Gallery
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
          Visual Culinary & Banqueting Gallery
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          Explore our authentic catering setups, live food counters, table arrangements, and thematic floral decors across Delhi NCR.
        </p>
      </div>

      {/* Infinite Scrolling Horizontal Marquee */}
      <div className="w-full relative py-2 overflow-hidden select-none">
        <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-marquee-${idx}`}
              onClick={() => setLightboxImg(item)}
              className="relative w-72 aspect-[4/3] sm:w-80 rounded-3xl overflow-hidden shadow-md border border-slate-200/60 group flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <img
                src={getWebpUrl(item.imageUrl)}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                <button aria-label={`Zoom in on ${item.title}`} className="self-end p-2 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-white" />
                </button>
                
                <div className="space-y-1">
                  {item.category && (
                    <span className="text-[8px] font-extrabold tracking-widest uppercase bg-amber-500 text-white px-2 py-0.5 rounded-full inline-block">
                      {item.category}
                    </span>
                  )}
                  <div className="font-bold text-sm truncate">{item.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shadow Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white dark:from-slate-950 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white dark:from-slate-950 to-transparent pointer-events-none z-10" />
      </div>

      {/* View More / Expand Section */}
      <div className="text-center pt-4 px-6">
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs py-3 px-7 rounded-xl shadow-sm transition-all active:scale-95 uppercase tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            Explore Full Gallery <ChevronRight className="w-4 h-4 text-white" />
          </button>
        ) : (
          <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 dark:border-slate-800 pt-8">
              {categories.map((cat: any) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    activeCategory === cat
                      ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
              {filteredItems.map((item) => (
                <div
                  key={`${item.id}-grid`}
                  onClick={() => setLightboxImg(item)}
                  className="group relative aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay detail */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                    <span className="self-end p-2 rounded-full bg-white/20 backdrop-blur-sm hover:scale-110 active:scale-95 transition-transform">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                    <div>
                      {item.category && (
                        <span className="text-[8px] font-extrabold uppercase tracking-widest bg-amber-500 text-white px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      )}
                      <h4 className="font-bold text-xs sm:text-sm mt-1.5 truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => setExpanded(false)}
                className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs py-3 px-6 rounded-2xl transition-colors uppercase tracking-wider"
              >
                Collapse Gallery View
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Image Lightbox modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col justify-center items-center">
            {/* Close */}
            <button
              onClick={() => setLightboxImg(null)}
              aria-label="Close image lightbox"
              className="absolute right-4 top-4 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all z-20 min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Close image"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Img frame */}
            <div className="relative max-w-full max-h-full overflow-hidden flex flex-col items-center">
              <img
                src={lightboxImg.imageUrl}
                alt={lightboxImg.title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/5"
              />
              <div className="text-center text-white mt-4 space-y-1">
                <div className="font-bold text-base sm:text-lg">
                  {lightboxImg.title}
                </div>
                {lightboxImg.category && (
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                    Category: {lightboxImg.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
