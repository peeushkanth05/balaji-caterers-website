"use client";

import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";

export default function VenuePartnerMarquee() {
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/venues")
      .then((res) => res.json())
      .then((data) => {
        if (data.venues) setVenues(data.venues);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || venues.length === 0) return null;

  // Double the array to guarantee seamless looping
  const marqueeItems = [...venues, ...venues];

  return (
    <div className="bg-slate-50 border-y border-slate-200/60 py-10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">Banquet & Farmhouses</span>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mt-1">Our Venue Partners</h2>
        </div>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden select-none flex">
        {/* Continuous animation container */}
        <div className="flex gap-12 items-center animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap min-w-full">
          {marqueeItems.map((item, idx) => (
            <a
              key={`${item.id}-${idx}`}
              href={item.websiteUrl || "#"}
              target={item.websiteUrl ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-slate-200/80 px-6 py-4 rounded-2xl shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all flex-shrink-0"
            >
              {item.logoUrl ? (
                <img src={item.logoUrl} alt={item.name} className="h-10 w-auto max-w-[120px] object-contain" />
              ) : (
                <Building2 className="w-6 h-6 text-amber-500" />
              )}
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">{item.name}</p>
                {item.address && <p className="text-[9px] text-slate-400 mt-0.5 max-w-[120px] truncate">{item.address}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
