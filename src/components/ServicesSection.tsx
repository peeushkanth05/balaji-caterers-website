"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

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
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-[#F8F7F3] dark:bg-slate-950 border-y border-slate-200/60 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Our Specialties & Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            Comprehensive Catering & Event Solutions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            From bespoke multi-cuisine menus and live counters to theme décor and audio setups — complete turnkey event management under one roof.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-amber-400/60 dark:hover:border-amber-500/40 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/40 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform" aria-hidden="true">
                  {service.icon || "✨"}
                </div>
                
                {service.tag && (
                  <span className="inline-block text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/50 mb-2.5">
                    {service.tag}
                  </span>
                )}

                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              <button
                onClick={() => handleEnquireService(service.title)}
                aria-label={`Enquire about ${service.title}`}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
