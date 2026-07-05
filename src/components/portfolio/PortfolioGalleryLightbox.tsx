"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface PortfolioGalleryLightboxProps {
  images: string[];
  title: string;
}

export function PortfolioGalleryLightbox({ images, title }: PortfolioGalleryLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const total = images.length;

  const handleNext = () => setSelectedIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setSelectedIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedIndex(idx);
              setLightboxOpen(true);
            }}
            className="group relative h-40 sm:h-48 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <img
              src={imgUrl}
              alt={`${title} photo ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                <Maximize2 className="w-5 h-5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white text-xs font-bold uppercase tracking-wider bg-white/10 px-4 py-2 rounded-full border border-white/10">
              {selectedIndex + 1} / {total} Photos
            </div>

            {/* Prev/Next Buttons */}
            {total > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Preview */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] p-2 flex items-center justify-center"
            >
              <img
                src={images[selectedIndex]}
                alt={`${title} - photo ${selectedIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
