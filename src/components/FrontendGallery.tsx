"use client";

import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

export function FrontendGallery({ items }: { items: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLightbox, setActiveLightbox] = useState<any | null>(null);

  const categories = ["All", "Wedding", "Floral", "Catering", "DJ & Sound", "Birthday"];

  const filteredItems = items.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const formatUrl = (url: string) => {
    if (!url) return "/new-logo.png";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
      return url;
    }
    return `/${url}`;
  };

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat
                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-sm">
          No photos found under this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="rounded-3xl overflow-hidden relative group h-64 bg-slate-800 cursor-pointer shadow-lg hover:shadow-amber-500/10 transition-all border border-slate-800 hover:border-amber-500/40"
            >
              <img
                src={formatUrl(item.imageUrl)}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/new-logo.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-6 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {item.category}
                </span>
                <h4 className="font-bold text-sm text-white flex items-center justify-between">
                  <span>{item.title}</span>
                  <ZoomIn className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:text-amber-400 transition-colors"
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

            <div className="p-6 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
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
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs"
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
