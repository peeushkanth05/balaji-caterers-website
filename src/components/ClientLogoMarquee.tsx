"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function ClientLogoMarquee() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        if (data.clients) setClients(data.clients);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || clients.length === 0) return null;

  const marqueeItems = [...clients, ...clients, ...clients];

  return (
    <div className="bg-white dark:bg-slate-900 py-12 overflow-hidden relative border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">Trusted By</span>
        <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">Our Corporate & Special Clients</h2>
      </div>

      {/* Infinite scrolling line of logo images */}
      <div className="relative w-full overflow-hidden select-none flex">
        <div className="flex gap-16 items-center animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap min-w-full">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-100 opacity-75"
            >
              {item.logoUrl ? (
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  className="h-12 w-auto max-w-[150px] object-contain filter grayscale dark:invert dark:brightness-200 hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <span className="font-bold text-slate-400 dark:text-slate-550 text-sm tracking-wide">{item.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
