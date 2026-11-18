import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PublicForm } from "@/components/PublicForm";
import { Utensils, Sparkles, Music, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { BUSINESS_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Catering & Event Management Services | Verma Caterers & Events",
  description:
    "Explore our complete range of catering, wedding planning, floral decor, DJ sound systems, and event rentals across Delhi NCR.",
  alternates: {
    canonical: "https://vermacaterersevents.com/services",
  },
};

export default function ServicesPage() {
  const serviceList = [
    {
      title: "Wedding Catering",
      desc: "Lavish multi-course wedding banquets with live interactive chaat, pasta, and tandoor counters.",
      link: "/wedding-catering-dwarka",
      icon: Utensils,
    },
    {
      title: "Floral Decoration & Stage Mandap",
      desc: "Bespoke floral arches, candle-lit mandaps, bridal pathways, and luxury designer stage themes.",
      link: "/services/floral-decoration",
      icon: Sparkles,
    },
    {
      title: "Sound, DJ & Event Lighting",
      desc: "Concert-grade sound reinforcement, intelligent truss lighting, haze effects, and premium DJ consoles.",
      link: "/services/sound-dj-lighting",
      icon: Music,
    },
    {
      title: "Corporate Catering",
      desc: "Punctual executive buffets, conference tea spreads, and corporate cocktail gala dining in Delhi & Gurugram.",
      link: "/corporate-catering-gurugram",
      icon: Utensils,
    },
    {
      title: "Birthday & Private Gatherings",
      desc: "Lively themed children and adult birthday parties with live snack counters, sliders, and dessert spreads.",
      link: "/birthday-catering-dwarka",
      icon: Sparkles,
    },
    {
      title: "Event Add-Ons & Rentals",
      desc: "Cooler rentals, event anchoring, mattress seating, and professional stall booking services.",
      link: "/services/add-ons",
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-24 sm:py-28 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            End-To-End Event Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Our Catering & Event Services
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {BUSINESS_CONFIG.foodPositioning} Serving {BUSINESS_CONFIG.canonicalServiceAreas}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-amber-500/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={s.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:gap-2 transition-all"
                  >
                    View Details & Packages <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact/Quote Section */}
        <section id="contact" className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Request a Custom Quote
              </h2>
              <p className="text-xs text-slate-500">
                Share your event details and our event manager will get back to you with custom options.
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
