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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm w-full transition-colors">
      {/* Search Input Box */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          id="portfolio-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, decoration, dish..."
          aria-label="Search portfolio by title, decoration, or dish"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-9 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sort Selector Dropdown */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <label htmlFor="portfolio-sort-select" className="text-xs font-bold text-slate-600 flex-shrink-0 cursor-pointer">Sort By:</label>
        <select
          id="portfolio-sort-select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort projects by"
          className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-auto"
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
