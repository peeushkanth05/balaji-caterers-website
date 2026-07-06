"use client";

import { useState } from "react";
import { X, Image as ImageIcon, Sparkles, ZoomIn } from "lucide-react";

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

  return (
    <section id="gallery" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 inline-flex items-center gap-1">
          <ImageIcon className="w-3.5 h-3.5" /> Photo Catalog
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Our Snaps & Creations
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          A visual look at our delicious culinary preparations, fresh ingredients, and creative banqueting designs.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxImg(item)}
            className="group relative aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/50 shadow-sm cursor-pointer hover:shadow-lg transition-all"
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
                  <span className="text-[9px] font-extrabold uppercase tracking-widest bg-amber-500 text-white px-2 py-0.5 rounded-full">
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
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/5"
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
