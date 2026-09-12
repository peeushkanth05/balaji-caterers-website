import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PublicForm } from "@/components/PublicForm";
import { prisma } from "@/lib/prisma";
import { MapPin, Phone, MessageCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Birthday Party Catering in Dwarka | Kids & Adult Birthday Menus",
  description:
    "Specialized birthday catering services in Dwarka, Delhi. Delicious finger foods, live burger/pizza stalls, pasta counters, mocktails & custom birthday menus.",
  alternates: {
    canonical: "https://vermacaterersevents.com/birthday-catering-dwarka",
  },
};

export default async function BirthdayCateringDwarkaPage() {
  let settings: any = null;
  let services: any[] = [];
  try {
    settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
    services = await prisma.service.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } });
  } catch (e) {}

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Birthday Party Catering in Dwarka",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Verma Caterers & Events",
      "telephone": "+91-9810483544"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Dwarka, Delhi NCR"
    },
    "description": "Fun, high-energy birthday party catering with live counters, finger foods, and dessert bars across Dwarka."
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <section className="bg-gradient-to-br from-amber-900 via-slate-900 to-amber-950 text-white py-16 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto space-y-6 text-center lg:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" /> Dwarka & Janakpuri
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">
              Birthday Party Catering Services in Dwarka
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Make birthday celebrations memorable with fun live food stalls, kids-special snack platters, live pasta counters, and royal dinner buffets across Dwarka.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="https://wa.me/919810483544?text=Hello%20Verma%20Caterers!%20I%20want%20to%20enquire%20about%20Birthday%20Party%20Catering."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Enquiry
              </a>
              <a
                href="tel:+919810483544"
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-transform active:scale-95"
              >
                <Phone className="w-4 h-4" /> Call +91 98104 83544
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4">
                Exciting Food Counters & Menus for All Ages
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                From 1st birthday milestones to 50th jubilee celebrations, we customize party menus with kids' favorite finger foods, mocktails, and decadent dessert spreads.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Live Pizza, Pasta & Noodle Stalls",
                "Kid-Friendly Finger Food Platters",
                "Live Popcorn & Chocolate Fountain Setup",
                "Theme Balloon & Stage Decoration Packages",
                "Compact House Party & Banquet Buffets",
                "Attentive Waiters & Quick Service Setup"
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <PublicForm whatsappNumber="919810483544" availableServices={services} settings={settings} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
