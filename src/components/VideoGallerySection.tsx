"use client";

import { useState } from "react";
import { Play, X, Film, Sparkles } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl: string;
}

interface VideoGallerySectionProps {
  videos: VideoItem[];
}

export function VideoGallerySection({ videos }: VideoGallerySectionProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const getEmbedUrl = (url: string) => {
    // Convert YouTube URLs to embed format if applicable
    if (url.includes("youtube.com/watch")) {
      const vidId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${vidId}?autoplay=1`;
    }
    if (url.includes("youtu.be/")) {
      const vidId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${vidId}?autoplay=1`;
    }
    return url;
  };

  const isYouTube = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  return (
    <section id="videos" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 fill-amber-500" /> Event Highlights
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Catering & Decor in Motion
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Experience our high-profile catering setups, live food counters, and elegant setups in detail.
        </p>
      </div>

      {/* Horizontal Scrollable Slider */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
          {videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="flex-shrink-0 w-[280px] sm:w-[360px] bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 snap-start cursor-pointer group"
            >
              {/* Cover image with play button overlay */}
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-amber-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                    <Play className="w-5 h-5 fill-amber-500 ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-1.5">
                <h3 className="font-serif font-bold text-slate-900 text-sm sm:text-base group-hover:text-amber-600 transition-colors line-clamp-1">
                  {vid.title}
                </h3>
                {vid.description && (
                  <p className="text-slate-500 text-[11px] sm:text-xs line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Player Modal Lightbox */}
      {activeVideo && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative bg-black rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl border border-white/10 aspect-video flex flex-col justify-center">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute right-4 top-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all active:scale-95 z-20"
              title="Close Video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Content */}
            <div className="w-full h-full">
              {isYouTube(activeVideo.videoUrl) ? (
                <iframe
                  src={getEmbedUrl(activeVideo.videoUrl)}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
