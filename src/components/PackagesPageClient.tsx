"use client";

import { useState } from "react";
import { UtensilsCrossed, Star, CheckCircle2, ChevronRight } from "lucide-react";

interface Package {
  id: string;
  name: string;
  category: string;
  pricePerPerson: number;
  discountType: string;
  discountValue: number;
  discountedPrice: number;
  description: string;
  features: string;
  isFeatured: boolean;
}

export function PackagesPageClient({ packages }: { packages: Package[] }) {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  // Get unique categories from the packages list
  const categories = ["ALL", ...Array.from(new Set(packages.map((pkg) => pkg.category)))];

  const filteredPackages = activeTab === "ALL"
    ? packages
    : packages.filter((pkg) => pkg.category === activeTab);

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-2 border-b border-slate-200 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === cat
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredPackages.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center text-slate-400 border border-slate-200 max-w-md mx-auto">
          <UtensilsCrossed className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-sm font-medium">No packages found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const hasDiscount = pkg.discountType && pkg.discountType !== "none" && pkg.discountValue > 0;
            return (
              <div
                key={pkg.id}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Featured Badge */}
                {pkg.isFeatured && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-bl-2xl uppercase flex items-center gap-1 shadow-sm">
                    <Star className="w-2.5 h-2.5 fill-white" /> Featured
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {pkg.category}
                  </span>
                  
                  <h3 className="font-serif font-bold text-2xl text-slate-900 mt-4 mb-2 group-hover:text-amber-600 transition-colors">
                    {pkg.name}
                  </h3>

                  {/* Pricing Section */}
                  <div className="mb-6">
                    {hasDiscount ? (
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-extrabold text-amber-600">₹{pkg.discountedPrice}</span>
                          <span className="text-sm text-slate-400 line-through">₹{pkg.pricePerPerson}</span>
                          <span className="text-xs text-slate-500">/ plate</span>
                        </div>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                          {pkg.discountType === "percentage" ? `${pkg.discountValue}% OFF` : `₹${pkg.discountValue} OFF`}
                        </span>
                      </div>
                    ) : (
                      <div className="text-3xl font-extrabold text-amber-600">
                        ₹{pkg.pricePerPerson} <span className="text-xs font-normal text-slate-500">/ plate</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  {pkg.features && (
                    <div className="space-y-2 border-t border-slate-100 pt-6">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Menu Highlights:
                      </h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {pkg.features.split(",").map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feature.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <a
                  href="/#contact"
                  className="mt-8 w-full text-center py-3.5 rounded-xl bg-slate-900 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md group-hover:shadow-amber-500/10"
                >
                  Request Quote <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
