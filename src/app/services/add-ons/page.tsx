import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PublicForm } from "@/components/PublicForm";
import { Sparkles, CheckCircle2, MessageCircle, Phone, Snowflake, Mic, Layers, ShieldCheck } from "lucide-react";
import { BUSINESS_CONFIG, isOwnerValueSet } from "@/lib/config";

export const metadata: Metadata = {
  title: "Event Add-Ons & Rentals | Verma Caterers & Events",
  description:
    "Event infrastructure add-ons: cooler rentals, professional event anchors/emcees, mattress seating setups, and custom food stalls across Delhi NCR.",
  alternates: {
    canonical: "https://vermacaterersevents.com/services/add-ons",
  },
};

export default function EventAddOnsPage() {
  const addOns = [
    {
      title: "Commercial Cooler & Misting Fan Rentals",
      desc: "High-capacity jumbo evaporative coolers and misting fans to keep guests cool during summer outdoor weddings and lawn events.",
      price: "{{OWNER: starting price cooler rental}}",
      icon: Snowflake,
    },
    {
      title: "Professional Event Anchoring & Emcees",
      desc: "Charismatic bilingual anchors to coordinate sangeet ceremonies, couple entries, games, and announcements.",
      price: "{{OWNER: starting price anchoring}}",
      icon: Mic,
    },
    {
      title: "Gadda & Mattress Floor Seating Setups",
      desc: "Traditional Indian seating arrangements with premium white linen, bolsters, and masnads for Mehendi, Haldi, or Kirtan gatherings.",
      price: "{{OWNER: starting price mattress setup}}",
      icon: Layers,
    },
    {
      title: "Custom Food Stalls & Canopy Booking",
      desc: "Branded live counters, wooden carts, and decorative food stalls fabricated to match your event theme.",
      price: "{{OWNER: starting price stalls}}",
      icon: Sparkles,
    },
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
          <span className="text-slate-800 dark:text-slate-200 font-bold">Event Add-Ons</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            Event Support Infrastructure
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            Event Add-Ons & Equipment Rentals
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            From temperature management and traditional seating to engaging anchors, we supply essential event rentals to make your celebration seamless across Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {addOns.map((item, idx) => {
            const Icon = item.icon;
            const hasPrice = isOwnerValueSet(item.price);
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-amber-500/40 transition-all"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  {hasPrice ? (
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Starts from</span>
                      <p className="text-lg font-bold text-amber-600">₹{item.price}</p>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">Custom quotation upon request</span>
                  )}
                  <a
                    href="#contact"
                    className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    Get a Free Quote
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <section id="contact" className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Enquire for Add-Ons & Rentals
              </h2>
              <p className="text-xs text-slate-500">
                Specify your rental dates, quantities, and delivery location.
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
