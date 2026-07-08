"use client";

import { useEffect, useState } from "react";
import { HelpCircle, Search, ChevronDown, ChevronUp } from "lucide-react";

export default function FaqSection() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/faqs")
      .then((res) => res.json())
      .then((data) => {
        if (data.faqs) setFaqs(data.faqs);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || faqs.length === 0) return null;

  // Extract active unique categories
  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

  // Filtering
  const filtered = faqs.filter((f) => {
    const matchesCategory = activeCategory === "All" || f.category === activeCategory;
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Have Questions?</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Everything you need to know about our catering packages, menu options, decor services, and booking terms.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search through questions..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-10 pr-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenId(null);
                }}
                className={`px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-slate-950 text-white shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        {filtered.length === 0 ? (
          <div className="text-center py-10 bg-white border border-slate-200 rounded-3xl text-slate-400 text-sm">
            No FAQs found matching your criteria. Try another keyword.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
