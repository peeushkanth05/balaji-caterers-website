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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
    >
      <div>
        {/* Cover Image Container */}
        <div className="h-60 sm:h-64 relative bg-slate-100 overflow-hidden">
          <img
            src={portfolio.coverImage || "/new-logo.png"}
            alt={portfolio.altText || portfolio.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            {portfolio.category && (
              <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                <span>{portfolio.category.icon}</span>
                <span>{portfolio.category.categoryName}</span>
              </span>
            )}
            {portfolio.featured && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-slate-950" /> Featured
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
          <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
            {portfolio.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {portfolio.shortDescription}
          </p>

          {/* Tags */}
          {portfolio.tags && portfolio.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {portfolio.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                >
                  <Tag className="w-2.5 h-2.5 text-amber-500" /> {tag}
                </span>
              ))}
              {portfolio.tags.length > 3 && (
                <span className="text-[10px] text-slate-400 font-semibold self-center">
                  +{portfolio.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
        <Link
          href={`/portfolio/${portfolio.slug}`}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all group-hover:shadow-md"
        >
          <span>View Details & Photos</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
