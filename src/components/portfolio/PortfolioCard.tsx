"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Images, Tag } from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

interface PortfolioCardProps {
  portfolio: PortfolioData;
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const galleryCount = portfolio.galleryImages ? portfolio.galleryImages.length : 0;
  let coverUrl = (portfolio.coverImage || "/new-logo.webp").replace(/\.(jpg|jpeg|png)$/i, ".webp");
  if (coverUrl.includes("/api/media/")) {
    coverUrl += "?w=600";
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between"
    >
      <div>
        {/* Cover Image Container */}
        <div className="h-60 sm:h-64 relative bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src={coverUrl}
            alt={portfolio.altText || portfolio.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            {portfolio.category && (
              <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                <span>{portfolio.category.icon}</span>
                <span>{portfolio.category.categoryName}</span>
              </span>
            )}
            {portfolio.featured && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-white" /> Featured
              </span>
            )}
          </div>

          {/* Gallery Count Pill */}
          {galleryCount > 0 && (
            <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-semibold flex items-center gap-1.5 z-10">
              <Images className="w-3.5 h-3.5 text-amber-400" /> {galleryCount} Photos
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-3">
          <div className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
            {portfolio.title}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
            {portfolio.shortDescription}
          </p>

          {/* Tags */}
          {portfolio.tags && portfolio.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {portfolio.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                >
                  <Tag className="w-2.5 h-2.5 text-amber-500" /> {tag}
                </span>
              ))}
              {portfolio.tags.length > 3 && (
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold self-center">
                  +{portfolio.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <Link
          href={`/portfolio/${portfolio.slug}`}
          className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          <span>View Details & Photos</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
