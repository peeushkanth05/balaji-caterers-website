"use client";

import { MessageSquare, Star, User, Quote } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  review: string;
  rating: number;
  photoUrl?: string | null;
  companyName?: string | null;
}

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 lg:py-24 px-5 sm:px-8 max-w-7xl mx-auto space-y-12 transition-colors">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 inline-flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" /> Client Reviews
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          What Happy Families Say
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          Authentic feedback from hosts and families across Delhi NCR who trusted us with their special celebrations.
        </p>
      </div>

      {/* Responsive Horizontal Slider Container */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex-shrink-0 w-[290px] sm:w-[380px] bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-all snap-start relative group"
            >
              {/* Quote mark ornament */}
              <Quote className="absolute right-6 top-6 w-10 h-10 text-slate-100 dark:text-slate-800 group-hover:text-amber-50 dark:group-hover:text-amber-950/40 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center gap-0.5 z-10 relative">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-4 h-4 ${
                        starIdx < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Message */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic z-10 relative">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              {/* Client Info details */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                  {t.photoUrl ? (
                    <img
                      src={t.photoUrl}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <User className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm leading-tight">
                    {t.name}
                  </h4>
                  {t.companyName && (
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-semibold mt-0.5">
                      {t.companyName}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
