"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

// Semantic landing page mapping for key catering & event services
const SERVICE_PAGE_MAP: Record<string, string> = {
  "catering services": "/catering-services-delhi-ncr",
  "wedding host": "/wedding-catering-dwarka",
  "birthday party": "/birthday-catering-dwarka",
  "puja & kirtan": "/puja-kirtan-catering-delhi-ncr",
  "floral decoration": "/gallery",
  "sound & dj setup": "/gallery",
  "small gathering": "/small-gathering-catering-dwarka",
  "corporate catering": "/corporate-catering-gurugram",
};

function getServiceLandingUrl(title: string): string | null {
  const lower = title.toLowerCase();
  for (const [key, url] of Object.entries(SERVICE_PAGE_MAP)) {
    if (lower.includes(key)) return url;
  }
  return null;
}

export function ServicesSection({
  services,
  onSelectService,
}: {
  services: any[];
  onSelectService?: (serviceTitle: string) => void;
}) {
  const handleEnquireService = (title: string) => {
    // 1. Trigger custom event or callback to preselect in form
    const event = new CustomEvent("select-service-enquiry", { detail: title });
    window.dispatchEvent(event);

    if (onSelectService) {
      onSelectService(title);
    }

    // 2. Smooth scroll to contact section
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-[#FCFBF7] dark:bg-slate-950 border-y border-stone-200/60 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Our Specialties & Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
            Artisanal Catering & Turnkey Event Solutions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            From bespoke multi-cuisine menus and live chef counters to ambient floral décor and sound stages — tailored culinary mastery for Delhi NCR.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => {
            const landingUrl = getServiceLandingUrl(service.title);

            return (
              <div
                key={service.id}
                className="bg-white/80 dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-xs hover:border-amber-500/50 hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform" aria-hidden="true">
                    {service.icon || "✨"}
                  </div>
                  
                  {service.tag && (
                    <span className="inline-block text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/50 mb-2.5">
                      {service.tag}
                    </span>
                  )}

                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {landingUrl ? (
                      <Link href={landingUrl} className="hover:underline focus:underline focus:outline-none">
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleEnquireService(service.title)}
                    aria-label={`Enquire about ${service.title}`}
                    className="w-full py-2.5 px-4 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  {landingUrl && (
                    <Link
                      href={landingUrl}
                      aria-label={`View detailed ${service.title} guide & packages`}
                      className="w-full py-1.5 px-3 rounded-full text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-slate-800/60 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Explore Service Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}