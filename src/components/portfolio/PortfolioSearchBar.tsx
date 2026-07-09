"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

interface PortfolioSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
}

export function PortfolioSearchBar({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
}: PortfolioSearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm w-full transition-colors">
      {/* Search Input Box */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, decoration, dish..."
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl py-2.5 pl-10 pr-9 text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sort Selector Dropdown */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <SlidersHorizontal className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex-shrink-0">Sort By:</span>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl py-2 px-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-auto"
        >
          <option value="displayOrder">Custom Order</option>
          <option value="featured">Featured First</option>
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">Alphabetical (A-Z)</option>
        </select>
      </div>
    </div>
  );
}
