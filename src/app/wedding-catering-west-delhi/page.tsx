import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PublicForm } from "@/components/PublicForm";
import { prisma } from "@/lib/prisma";
import { Sparkles, Phone, MessageCircle, CheckCircle2, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Wedding Catering in West Delhi | Janakpuri & Rajouri Garden Caterers",
  description:
    "Top wedding and marriage caterers across West Delhi, Janakpuri, Rajouri Garden, Punjabi Bagh & Paschim Vihar. Grand royal vegetarian buffets, live stalls & decor.",
  alternates: {
    canonical: "https://vermacaterersevents.com/wedding-catering-west-delhi",
  },
  openGraph: {
    title: "Wedding Catering in West Delhi | Janakpuri & Rajouri Garden Caterers",
    description:
      "Top wedding and marriage caterers across West Delhi, Janakpuri, Rajouri Garden, Punjabi Bagh & Paschim Vihar. Grand royal vegetarian buffets, live stalls & decor.",
    url: "https://vermacaterersevents.com/wedding-catering-west-delhi",
    siteName: "Verma Caterers & Events",
    images: [
      {
        url: "/verma-logo-512.png",
        width: 512,
        height: 512,
        alt: "Wedding Catering in West Delhi",
      },
    ],
  },
};

export default async function WeddingCateringWestDelhiPage() {
  let settings: any = null;
  let services: any[] = [];
  try {
    settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
    services = await prisma.service.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } });
  } catch (e) {}

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://vermacaterersevents.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Wedding Catering West Delhi",
            "item": "https://vermacaterersevents.com/wedding-catering-west-delhi"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Wedding Catering in West Delhi",
        "provider": {
          "@type": ["Caterer", "LocalBusiness"],
          "@id": "https://vermacaterersevents.com/#localbusiness",
          "name": "Verma Caterers & Events",
          "telephone": "+91-9810483544",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Dwarka Sector 5, Madhu Vihar",
            "addressLocality": "New Delhi",
            "postalCode": "110059",
            "addressCountry": "IN"
          }
        },
        "areaServed": {
          "@type": "Place",
          "name": "West Delhi, Janakpuri, Rajouri Garden, Punjabi Bagh, Paschim Vihar"
        },
        "description": "Authentic wedding banquet catering, live Old Delhi chaat counters, pure desi ghee wedding buffets, and stage decor across West Delhi."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Header />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-slate-100/90 border-b border-slate-200/80 py-2.5 px-6 text-xs text-slate-500 pt-24">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-800 font-bold">Wedding Catering West Delhi</span>
        </div>
      </nav>

      <main className="flex-grow pb-16">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-amber-900 via-slate-900 to-amber-950 text-white py-16 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto space-y-6 text-center lg:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" /> West Delhi
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              Grand Wedding Catering Services in West Delhi
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Bringing royal culinary heritage to marriage functions in Janakpuri, Rajouri Garden, Punjabi Bagh, and Paschim Vihar. Famous for our pure desi ghee North Indian wedding buffets and bustling live street-food counters.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="https://wa.me/919810483544?text=Hello%20Verma%20Caterers!%20I%20want%20to%20enquire%20about%20Wedding%20Catering%20in%20West%20Delhi."
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
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Authentic Taste & Royal Presentation in West Delhi
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                West Delhi weddings celebrate rich North Indian flavours, lavish chaat spreads, and heart-warming hospitality. Verma Caterers has served hundreds of families across Janakpuri, Rajouri Garden, and Punjabi Bagh community halls, banquets, and farmhouses with pristine hygiene and authentic spices.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Full Coverage across Janakpuri, Rajouri Garden & Punjabi Bagh",
                "100% Pure Desi Ghee & Fresh Dairy Ingredients",
                "Live Chandni Chowk Style Chaat & Golgappa Counters",
                "Comprehensive Chafing Dish & Crockery Service Setup",
                "Strict FSSAI Certified Kitchen & Uniformed Staff",
                "Custom Menus for 100 to 2500+ Wedding Guests"
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800">{feat}</span>
                </div>
              ))}
            </div>

            {/* Menu Highlights */}
            <div className="bg-amber-500/10 p-6 rounded-3xl border border-amber-500/20 space-y-3">
              <div className="text-lg font-bold text-amber-800">
                Popular West Delhi Wedding Menu Highlights
              </div>
              <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Live Chaat & Starters:</strong> Aloo Tikki with Chhole, Dahi Bhalla Papdi, Paneer Tikka Tandoori, Chilly Paneer & Mocktail Station</li>
                <li><strong>Royal Main Course:</strong> Dal Makhani, Paneer Tikka Masala, Malai Kofta, Mix Veg, Stuffed Naan, Laccha Paratha & Pulao</li>
                <li><strong>Halwai Desserts:</strong> Hot Desi Ghee Jalebi with Rabri, Moong Dal Halwa, Gulab Jamun & Kesar Kulfi Falooda</li>
              </ul>
            </div>

            {/* Cross-Link Explore Packages & Guides */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Explore Catering Menus & Regional Hubs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review transparent pricing on our{" "}
                <Link href="/packages" className="text-amber-800 font-semibold underline hover:text-amber-600">
                  Catering Packages & Pricing
                </Link>
                , discover our adjacent services in{" "}
                <Link href="/wedding-catering-dwarka" className="text-amber-800 font-semibold underline hover:text-amber-600">
                  Wedding Catering in Dwarka
                </Link>
                , or view{" "}
                <Link href="/wedding-catering-gurugram" className="text-amber-800 font-semibold underline hover:text-amber-600">
                  Wedding Catering Gurugram
                </Link>{" "}
                and{" "}
                <Link href="/catering-services-delhi-ncr" className="text-amber-800 font-semibold underline hover:text-amber-600">
                  Delhi NCR Catering Services
                </Link>.
              </p>
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

