"use client";

import { useState, useEffect } from "react";
import { HeroPortfolioSlider } from "./HeroPortfolioSlider";
import { CategoryFilterBar } from "./CategoryFilterBar";
import { PortfolioSearchBar } from "./PortfolioSearchBar";
import { PortfolioGrid } from "./PortfolioGrid";
import { PortfolioCategoryData, PortfolioData } from "@/types/portfolio";
import { Sparkles, Layers } from "lucide-react";

interface DynamicPortfolioSectionProps {
  initialCategories?: PortfolioCategoryData[];
  initialFeatured?: PortfolioData[];
  initialPortfolios?: PortfolioData[];
}

export function DynamicPortfolioSection({
  initialCategories = [],
  initialFeatured = [],
  initialPortfolios = [],
}: DynamicPortfolioSectionProps) {
  const [categories, setCategories] = useState<PortfolioCategoryData[]>(initialCategories);
  const [featured, setFeatured] = useState<PortfolioData[]>(initialFeatured);
  const [portfolios, setPortfolios] = useState<PortfolioData[]>(initialPortfolios);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("displayOrder");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch categories client-side if missing
  useEffect(() => {
    if (initialCategories.length === 0) {
      fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => {
          if (data.categories) setCategories(data.categories);
        })
        .catch(console.error);
    }
  }, [initialCategories]);

  // Fetch featured portfolios for Hero Slider if missing
  useEffect(() => {
    if (initialFeatured.length === 0) {
      fetch("/api/portfolios/featured")
        .then((res) => res.json())
        .then((data) => {
          if (data.portfolios) setFeatured(data.portfolios);
        })
        .catch(console.error);
    }
  }, [initialFeatured]);

  // Fetch portfolios dynamically whenever category, search query, or sort option changes
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== "all") params.set("category", activeCategory);
    if (searchQuery) params.set("search", searchQuery);
    if (sortOption) params.set("sort", sortOption);

    fetch(`/api/portfolios?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.portfolios) setPortfolios(data.portfolios);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory, searchQuery, sortOption]);

  return (
    <div className="space-y-16">
      {/* 1. Hero Featured Portfolio Slider */}
      {featured.length > 0 && (
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500" /> Featured Celebrations
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
              Grand Events Showcase
            </h2>
          </div>
          <HeroPortfolioSlider portfolios={featured} />
        </section>
      )}

      {/* 2. Full Portfolio Showcase Section with Dynamic Categories, Search, and Grid */}
      <section id="portfolio" className="space-y-8 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 inline-flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Full Event Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
            Explore Our Recent Projects
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Filter by service category or search for specific decorations, dishes, and setups.
          </p>
        </div>

        {/* Dynamic Category Filter Bar */}
        <CategoryFilterBar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={(slug) => setActiveCategory(slug)}
        />

        {/* Search Bar & Sorting */}
        <PortfolioSearchBar
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          sortOption={sortOption}
          onSortChange={(s) => setSortOption(s)}
        />

        {/* Dynamic Cards Grid */}
        <PortfolioGrid portfolios={portfolios} loading={loading} />
      </section>
    </div>
  );
}
