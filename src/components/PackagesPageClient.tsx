"use client";

import { useState } from "react";
import { UtensilsCrossed, Star, CheckCircle2, ChevronRight, Calculator, MessageCircle, Users, Sparkles } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/gtag";

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

export function PackagesPageClient({
  packages,
  whatsapp = "919810483544",
  phone = "+91 98104 83544",
}: {
  packages: Package[];
  whatsapp?: string;
  phone?: string;
}) {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [guests, setGuests] = useState<number>(150);
  const [selectedPkgId, setSelectedPkgId] = useState<string>(packages[0]?.id || "");

  // Get unique categories from the packages list
  const categories = ["ALL", ...Array.from(new Set(packages.map((pkg) => pkg.category)))];

  const filteredPackages = activeTab === "ALL"
    ? packages
    : packages.filter((pkg) => pkg.category === activeTab);

  const activeCalcPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];
  const activeRate = activeCalcPkg
    ? (activeCalcPkg.discountedPrice || activeCalcPkg.pricePerPerson)
    : 750;
  const estimatedTotal = guests * activeRate;

  const cleanWa = (whatsapp || "919810483544").replace(/[^0-9]/g, "");
  const calcWaUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    `Hello Verma Caterers! I estimated our catering budget on your website:
• Package: ${activeCalcPkg?.name || "Catering Package"}
• Expected Guests: ${guests}
• Est. Rate per Plate: ₹${activeRate}
• Total Estimated Investment: ₹${estimatedTotal.toLocaleString("en-IN")}
Please send the complete customized menu options.`
  )}`;

  return (
    <div className="space-y-12">
      {/* Interactive Budget Estimator Tool */}
      <div className="bg-gradient-to-br from-amber-900/90 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" /> Instant Event Budget Estimator
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              Estimate Your Complete Catering Budget
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Select your expected guest count and choose a menu tier to view estimated investment including live food counters, buffet setup, and hospitality service staff.
            </p>

            {/* Guest Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" /> Expected Guests:
                </span>
                <span className="text-amber-400 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full text-sm font-extrabold">
                  {guests} Guests
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                aria-label="Expected guest count slider"
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>50 Guests (Intimate)</span>
                <span>500 (Grand Banquet)</span>
                <span>1500+ (Royal Gala)</span>
              </div>
            </div>

            {/* Package selector */}
            {packages.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-slate-300 block">
                  Select Package Tier:
                </label>
                <div className="flex flex-wrap gap-2">
                  {packages.slice(0, 5).map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        (activeCalcPkg?.id === pkg.id)
                          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                          : "bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500"
                      }`}
                    >
                      {pkg.name} (₹{pkg.discountedPrice || pkg.pricePerPerson}/plate)
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Calculator Output & Action Card */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4 text-center lg:text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              Estimated Catering Investment
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-amber-400 tracking-tight">
              ₹{estimatedTotal.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-slate-300 flex items-center justify-center lg:justify-start gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                ₹{activeRate}/plate
              </span>
              <span>&bull; for {guests} guests</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Includes live stalls, main buffet, sweet counter, premium bone-china crockery, and uniformed service staff.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={calcWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("package_calculator_handoff")}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Full Menu on WhatsApp</span>
              </a>
              <a
                href="/#contact"
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center transition-all border border-white/10"
              >
                Book Tasting
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === cat
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredPackages.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-16 text-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 max-w-md mx-auto">
          <UtensilsCrossed className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-sm font-medium">No packages found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const hasDiscount = pkg.discountType && pkg.discountType !== "none" && pkg.discountValue > 0;
            return (
              <div
                key={pkg.id}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Featured Badge */}
                {pkg.isFeatured && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-bl-2xl uppercase flex items-center gap-1 shadow-sm">
                    <Star className="w-2.5 h-2.5 fill-white" /> Featured
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                    {pkg.category}
                  </span>
                  
                  <h3 className="font-bold text-2xl text-slate-900 dark:text-white mt-4 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {pkg.name}
                  </h3>

                  {/* Pricing Section */}
                  <div className="mb-6">
                    {hasDiscount ? (
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-500">₹{pkg.discountedPrice}</span>
                          <span className="text-sm text-slate-400 line-through">₹{pkg.pricePerPerson}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">/ plate</span>
                        </div>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                          {pkg.discountType === "percentage" ? `${pkg.discountValue}% OFF` : `₹${pkg.discountValue} OFF`}
                        </span>
                      </div>
                    ) : (
                      <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-500">
                        ₹{pkg.pricePerPerson} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ plate</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  {pkg.features && (
                    <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-6">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        Menu Highlights:
                      </h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {pkg.features.split(",").map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
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
                  className="mt-8 w-full text-center py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
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
