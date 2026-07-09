"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

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

    // 2. Smooth scroll to contact section
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="bg-amber-500/5 dark:bg-amber-950/5 py-20 px-6 border-y border-amber-500/10 dark:border-amber-500/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white mt-1">
            Our Premium Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Everything you need under one roof. We handle every detail so you can focus on celebrating.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon || "✨"}
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="mb-4">
                  <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400">
                    {service.tag}
                  </span>
                </div>

                <button
                  onClick={() => handleEnquireService(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors group-hover:bg-amber-500 shadow-sm"
                >
                  Enquire Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
