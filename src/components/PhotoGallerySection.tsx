"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
  const [speed, setSpeed] = useState<"slow" | "normal" | "fast">("normal");
  const [isPaused, setIsPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);

  // Speed in seconds for full loop
  const speedSeconds = useMemo(() => {
    switch (speed) {
      case "slow":
        return 95; // Calm, luxurious glide
      case "normal":
        return 65; // Balanced, smooth reading speed
      case "fast":
        return 40; // Brisk overview
      default:
        return 65;
    }
  }, [speed]);

  const getWebpUrl = (url: string) => {
    if (!url) return "/new-logo.webp";
    if (url.endsWith(".webp")) return url;
    return url.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  };

  // Base list of items for the infinite marquee (take up to 14 high quality items)
  const baseItems = useMemo(() => {
    if (galleryItems.length === 0) return [];
    return galleryItems.slice(0, 14);
  }, [galleryItems]);

  const renderCard = (item: GalleryItem, keyPrefix: string, idx: number) => (
    <div
      key={`${keyPrefix}-${item.id}-${idx}`}
      onClick={() => setLightboxImg(item)}
      className="relative w-72 aspect-[4/3] sm:w-80 rounded-3xl overflow-hidden shadow-md border border-slate-200/60 dark:border-slate-800 group flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer bg-slate-100 dark:bg-slate-900"
    >
      <img
        src={getWebpUrl(item.imageUrl)}
        alt={item.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

      <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
        <button
          aria-label={`Zoom in on ${item.title}`}
          className="self-end p-2 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
        >
          <ZoomIn className="w-4 h-4 text-white" />
        </button>

        <div className="space-y-1">
          {item.category && (
            <span className="text-[9px] font-bold tracking-widest uppercase bg-amber-500 text-white px-2.5 py-0.5 rounded-full inline-block shadow-sm">
              {item.category}
            </span>
          )}
          <div className="font-bold text-sm truncate">{item.title}</div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="gallery" className="py-20 lg:py-24 bg-white/60 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800 overflow-hidden space-y-10 transition-colors">
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

        {/* Speed & Pause Controls Bar */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs">
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Resume gallery scroll" : "Pause gallery scroll"}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold border transition-all ${
              isPaused
                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-500"
            }`}
          >
            <span>{isPaused ? "▶ Resume" : "⏸ Pause"}</span>
          </button>

          <div className="inline-flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => { setSpeed("slow"); setIsPaused(false); }}
              aria-label="Set slow speed"
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                speed === "slow"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
              }`}
            >
              Slow
            </button>
            <button
              onClick={() => { setSpeed("normal"); setIsPaused(false); }}
              aria-label="Set normal smooth speed"
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                speed === "normal"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
              }`}
            >
              Smooth
            </button>
            <button
              onClick={() => { setSpeed("fast"); setIsPaused(false); }}
              aria-label="Set fast speed"
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                speed === "fast"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
              }`}
            >
              Fast
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Horizontal Marquee with Perfectly Seamless Dual Track */}
      <div
        className="w-full relative py-2 overflow-hidden select-none"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
      >
        <div className="flex w-max">
          {/* Primary Track */}
          <div
            className="flex gap-6 pr-6 shrink-0 gallery-marquee-track"
            style={{
              animation: `seamlessGalleryScroll ${speedSeconds}s linear infinite`,
              animationPlayState: isPaused || hoverPaused ? "paused" : "running",
            }}
          >
            {baseItems.map((item, idx) => renderCard(item, "track1", idx))}
          </div>

          {/* Duplicate Track (for 100% seamless wrap) */}
          <div
            className="flex gap-6 pr-6 shrink-0 gallery-marquee-track"
            aria-hidden="true"
            style={{
              animation: `seamlessGalleryScroll ${speedSeconds}s linear infinite`,
              animationPlayState: isPaused || hoverPaused ? "paused" : "running",
            }}
          >
            {baseItems.map((item, idx) => renderCard(item, "track2", idx))}
          </div>
        </div>

        {/* Shadow Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#F8F7F3] dark:from-slate-950 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#F8F7F3] dark:from-slate-950 to-transparent pointer-events-none z-10" />
      </div>

      {/* Keyframe animation injected inline to avoid any dependency conflicts */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes seamlessGalleryScroll {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-100%, 0, 0);
              }
            }
            .gallery-marquee-track {
              will-change: transform;
            }
          `,
        }}
      />

      {/* View Full Gallery in Dedicated Page */}
      <div className="text-center pt-2 px-6">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-3.5 px-8 rounded-xl shadow-md shadow-amber-500/20 transition-all active:scale-95 uppercase tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          <span>Explore Full Gallery ({galleryItems.length} Photos)</span>
          <ChevronRight className="w-4 h-4 text-white" />
        </Link>
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
