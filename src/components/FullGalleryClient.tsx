"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Phone,
  MessageCircle,
} from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category?: string | null;
}

interface FullGalleryClientProps {
  galleryItems: GalleryItem[];
  phone?: string;
  whatsapp?: string;
}

export function FullGalleryClient({
  galleryItems,
  phone = "+91 98104 83544",
  whatsapp = "919810483544",
}: FullGalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(galleryItems.map((item) => item.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [galleryItems]);

  // Filter items by category and search query
  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category &&
          item.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [galleryItems, activeCategory, searchQuery]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev === 0 ? filteredItems.length - 1 : prev - 1) : 0
    );
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev === filteredItems.length - 1 ? 0 : prev + 1) : 0
    );
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  const getWebpUrl = (url: string) => {
    if (!url) return "/new-logo.webp";
    if (url.endsWith(".webp")) return url;
    return url.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  };

  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const cleanWa = whatsapp.replace(/[^0-9]/g, "");

  return (
    <div className="space-y-12">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search setups, catering..."
            aria-label="Search gallery photographs"
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-2xl py-2.5 pl-10 pr-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5 w-full md:w-auto">
          {categories.map((cat: any) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-amber-600 dark:hover:text-amber-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2 font-medium">
        <span>
          Showing{" "}
          <strong className="text-slate-900 dark:text-white font-bold">
            {filteredItems.length}
          </strong>{" "}
          of {galleryItems.length} authentic photographs
        </span>
        {activeCategory !== "All" && (
          <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200/50 dark:border-amber-800/50 text-[11px]">
            Filtered by: {activeCategory}
          </span>
        )}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-16 text-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 max-w-md mx-auto space-y-3">
          <ImageIcon className="w-12 h-12 mx-auto text-slate-400" />
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            No photographs match your criteria.
          </p>
          <p className="text-xs">
            Try choosing another category or clearing your search query.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <img
                src={getWebpUrl(item.imageUrl)}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 text-white">
                <button
                  aria-label={`View enlarged photo of ${item.title}`}
                  className="self-end p-2 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/30 hover:scale-110 active:scale-95"
                >
                  <ZoomIn className="w-4 h-4 text-white" />
                </button>

                <div className="space-y-1">
                  {item.category && (
                    <span className="text-[9px] font-bold tracking-wider uppercase bg-amber-500 text-white px-2 py-0.5 rounded-full inline-block shadow-sm">
                      {item.category}
                    </span>
                  )}
                  <h3 className="font-bold text-xs sm:text-sm truncate drop-shadow-sm">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating CTA Banner at Bottom */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-8 sm:p-12 text-white text-center shadow-xl border border-amber-500/20">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            ✨ Premium Catering & Event Execution
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Like What You See? Let’s Plan Your Event
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            From intimate gatherings to royal wedding banquets, our culinary team will customize menus, stalls, and stage decor for your exact celebration.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3 text-xs font-bold text-white shadow-lg shadow-amber-500/25 transition hover:bg-amber-600 active:scale-95"
            >
              Request a Free Quote →
            </Link>
            <a
              href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(
                "Hello Verma Caterers! I was browsing your photo gallery and would like to get a quote for an upcoming celebration."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-xs font-semibold text-white transition active:scale-95 shadow-md shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close image lightbox"
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Button */}
          {filteredItems.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous photograph"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-50 min-w-[44px] min-h-[44px] flex items-center justify-center backdrop-blur-sm"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Button */}
          {filteredItems.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next photograph"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-50 min-w-[44px] min-h-[44px] flex items-center justify-center backdrop-blur-sm"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Image & Details Container */}
          <div
            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.imageUrl}
              alt={activeItem.title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />

            {/* Captions and Actions */}
            <div className="w-full text-center text-white mt-4 space-y-1.5 px-4">
              <div className="flex items-center justify-center gap-2">
                {activeItem.category && (
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {activeItem.category}
                  </span>
                )}
                <span className="text-[11px] text-slate-400">
                  Photo {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>
              <h4 className="font-bold text-base sm:text-lg">
                {activeItem.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
