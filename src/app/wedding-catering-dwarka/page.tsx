import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PublicForm } from "@/components/PublicForm";
import { prisma } from "@/lib/prisma";
import { Sparkles, Phone, MessageCircle, CheckCircle2, MapPin, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Wedding Catering in Dwarka | Best Marriage Caterers & Decor",
  description:
    "Verma Caterers provides royal wedding catering in Dwarka Sector 1 to 24, Madhu Vihar, Palam & Delhi NCR. Live counters, authentic North/South Indian buffets & mandap decor.",
  alternates: {
    canonical: "https://vermacaterersevents.com/wedding-catering-dwarka",
  },
};

export default async function WeddingCateringDwarkaPage() {
  let settings: any = null;
  let services: any[] = [];
  try {
    settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
    services = await prisma.service.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } });
  } catch (e) {}

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Wedding Catering in Dwarka",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Verma Caterers & Events",
      "telephone": "+91-9810483544",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dwarka Sector 5, Madhu Vihar",
        "addressLocality": "Dwarka, New Delhi",
        "postalCode": "110059",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "Place",
      "name": "Dwarka, Delhi NCR"
    },
    "description": "Premium wedding catering services, live food counters, royal buffet menus, and grand mandap decorations across Dwarka Sectors 1-24."
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-amber-900 via-slate-900 to-amber-950 text-white py-16 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto space-y-6 text-center lg:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" /> Dwarka, New Delhi
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">
              Royal Wedding Catering Services in Dwarka
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Elevate your wedding celebration with Dwarka’s most trusted caterers. From authentic North & South Indian royal buffets to live chaat and fusion mocktail counters, we craft unforgettable culinary experiences for your special day.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="https://wa.me/919810483544?text=Hello%20Verma%20Caterers!%20I%20want%20to%20enquire%20about%20Wedding%20Catering%20in%20Dwarka."
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

        {/* Content Section */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4">
                Why Choose Verma Caterers for Marriage Functions in Dwarka?
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Planning a wedding in Dwarka requires attention to authentic regional flavors, impeccable hygiene, and prompt service. Verma Caterers brings over 15 years of culinary expertise, offering tailormade vegetarian and multi-cuisine wedding packages across Dwarka Sectors 1 to 24, Palam, and Janakpuri.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "100% Pure Veg & Pure Desi Ghee Options",
                "Live Chaat, Dosa, & Global Fusion Stalls",
                "Complete Crockery, Service Staff & Buffet Setup",
                "Stage & Floral Decor Integration Available",
                "Hygiene Certified Chefs & Uniformed Servers",
                "Customized Menus for 50 to 2000+ Guests"
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800">{feat}</span>
                </div>
              ))}
            </div>

            {/* Menu Highlights */}
            <div className="bg-amber-500/10 p-6 rounded-3xl border border-amber-500/20 space-y-3">
              <div className="text-lg font-serif font-bold text-amber-800">
                Popular Dwarka Wedding Menu Highlights
              </div>
              <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Starters:</strong> Paneer Tikka, Hara Bhara Kabab, Spring Rolls, Dahi Ke Kebab & Mocktails</li>
                <li><strong>Main Course:</strong> Dal Makhani, Paneer Butter Masala, Malai Kofta, Mix Veg, Kashmiri Pulao & Assorted Naans</li>
                <li><strong>Desserts:</strong> Hot Gulab Jamun, Moong Dal Halwa, Rabri Jalebi & Live Ice Cream Counters</li>
              </ul>
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
