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

  // Double list for infinite marquee slider
  const marqueeItems = useMemo(() => {
    if (galleryItems.length === 0) return [];
    // Ensure we have enough items to loop nicely
    const base = galleryItems.slice(0, 15);
    return [...base, ...base, ...base];
  }, [galleryItems]);

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-6">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 inline-flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-100/50">
          <ImageIcon className="w-3.5 h-3.5" /> Premium Creations Catalog
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
          Visual Culinary & Banqueting Gallery
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Scroll through our catering preparations, premium presentation setups, and thematic decorations.
        </p>
      </div>

      {/* Infinite Scrolling Horizontal Marquee */}
      <div className="w-full relative py-2 overflow-hidden select-none">
        <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-marquee-${idx}`}
              onClick={() => setLightboxImg(item)}
              className="relative w-72 aspect-[4/3] sm:w-80 rounded-3xl overflow-hidden shadow-md border border-slate-200/40 group flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                <span className="self-end p-2 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-white" />
                </span>
                
                <div className="space-y-1">
                  {item.category && (
                    <span className="text-[8px] font-extrabold tracking-widest uppercase bg-amber-500 text-white px-2 py-0.5 rounded-full inline-block">
                      {item.category}
                    </span>
                  )}
                  <h4 className="font-serif font-bold text-sm truncate">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shadow Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />
      </div>

      {/* View More / Expand Section */}
      <div className="text-center pt-4 px-6">
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 px-8 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider"
          >
            Explore Full Snaps Gallery <ChevronRight className="w-4 h-4 text-amber-500" />
          </button>
        ) : (
          <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-t border-slate-100 pt-8">
              {categories.map((cat: any) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    activeCategory === cat
                      ? "bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/10"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
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
                  className="group relative aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/50 shadow-sm cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
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
                      <h4 className="font-serif font-bold text-xs sm:text-sm mt-1.5 truncate">
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
                className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 px-6 rounded-2xl transition-colors uppercase tracking-wider"
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
              className="absolute right-4 top-4 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all z-20"
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
                <h3 className="font-serif font-bold text-base sm:text-lg">
                  {lightboxImg.title}
                </h3>
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
