"use client";

import { motion } from "framer-motion";
import { PortfolioCategoryData } from "@/types/portfolio";

interface CategoryFilterBarProps {
  categories: PortfolioCategoryData[];
  activeCategory: string; // Slug or "all"
  onSelectCategory: (slug: string) => void;
}

export function CategoryFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryFilterBarProps) {
  const allCategories: PortfolioCategoryData[] = [
    {
      id: "all",
      categoryName: "All Events",
      slug: "all",
      icon: "✨",
      displayOrder: 0,
      active: true,
      _count: undefined,
    },
    ...categories,
  ];

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max">
        {allCategories.map((cat) => {
          const isSelected = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`relative px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                isSelected
                  ? "text-white shadow-lg shadow-amber-500/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.icon || "📁"}</span>
              <span className="relative z-10">{cat.categoryName}</span>
              {cat._count !== undefined && (
                <span
                  className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {cat._count.portfolios}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
