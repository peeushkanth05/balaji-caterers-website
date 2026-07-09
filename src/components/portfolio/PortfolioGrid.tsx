"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioData } from "@/types/portfolio";
import { FolderX, Loader2 } from "lucide-react";

interface PortfolioGridProps {
  portfolios: PortfolioData[];
  loading?: boolean;
}

export function PortfolioGrid({ portfolios, loading = false }: PortfolioGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 h-96 animate-pulse flex flex-col justify-between"
          >
            <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-52 w-full" />
            <div className="space-y-2 py-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-full" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-5/6" />
            </div>
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!portfolios || portfolios.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
        <FolderX className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-400 dark:text-slate-500" />
        <h4 className="font-serif font-bold text-slate-800 dark:text-white text-lg">No Portfolios Found</h4>
        <p className="text-xs text-slate-500 dark:text-slate-450 mt-1">
          Try clearing your search query or choosing a different category filter above.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <AnimatePresence>
        {portfolios.map((portfolio) => (
          <PortfolioCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
