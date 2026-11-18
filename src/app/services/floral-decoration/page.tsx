import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PublicForm } from "@/components/PublicForm";
import { Sparkles, CheckCircle2, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { BUSINESS_CONFIG, isOwnerValueSet } from "@/lib/config";

export const metadata: Metadata = {
  title: "Floral Decoration & Stage Mandap Services | Verma Caterers & Events",
  description:
    "Luxury wedding stage design, floral mandaps, floral entrance arches, and candle-lit reception walkways across Delhi NCR.",
  alternates: {
    canonical: "https://vermacaterersevents.com/services/floral-decoration",
  },
};

export default function FloralDecorationPage() {
  const startingPrice = "{{OWNER: starting price floral decor}}";
  const hasPrice = isOwnerValueSet(startingPrice);

  const inclusions = [
    "Bridal entryway and floral walkway arches",
    "Traditional and contemporary wedding mandap styling",
    "VIP reception stage backdrop with imported fresh orchids, marigolds, and roses",
    "Table centerpiece arrangements and candle illuminations",
    "Complete on-site setup, lighting coordination, and dismantle",
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-24 sm:py-28 space-y-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-amber-600">Services</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold">Floral Decoration</span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
              Luxury Floral & Theme Decor
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Bespoke Wedding Stage & Floral Mandap Decoration
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Transform your celebration into a visual spectacle. From pristine white orchid and marigold stages to royal candle-lit wedding mandaps, our florist and styling team crafts breathtaking backdrops across Delhi NCR.
            </p>

            {hasPrice && (
              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 inline-block">
                <span className="text-xs text-slate-500 uppercase font-bold">Packages start from:</span>
                <p className="text-2xl font-black text-amber-600">₹{startingPrice}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://wa.me/919810483544?text=Hi%2C%20I%20am%20interested%20in%20floral%20decoration%20and%20mandap%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Get a Free Quote
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              What&apos;s Included
            </h2>
            <ul className="space-y-3">
              {inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/portfolio/white-orchid-marigold-stage-theme"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                View Featured Project: White Orchid & Marigold Theme <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Enquiry form */}
        <section id="contact" className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Book Floral Decoration
              </h2>
              <p className="text-xs text-slate-500">
                Share your event date and venue details for custom mandap and floral stage options.
              </p>
            </div>
            <PublicForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
