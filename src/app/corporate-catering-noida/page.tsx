import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PublicForm } from "@/components/PublicForm";
import { prisma } from "@/lib/prisma";
import { Briefcase, Phone, MessageCircle, CheckCircle2, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate Catering in Noida & Expressway | Office Lunches & Galas",
  description:
    "Professional corporate catering services across Noida Sector 62, 125, 135 & Expressway. Executive buffets, conference lunches, high-tea & annual corporate meets.",
  alternates: {
    canonical: "https://vermacaterersevents.com/corporate-catering-noida",
  },
  openGraph: {
    title: "Corporate Catering in Noida & Expressway | Office Lunches & Galas",
    description:
      "Professional corporate catering services across Noida Sector 62, 125, 135 & Expressway. Executive buffets, conference lunches, high-tea & corporate galas.",
    url: "https://vermacaterersevents.com/corporate-catering-noida",
    siteName: "Verma Caterers & Events",
    images: [
      {
        url: "/verma-logo-512.png",
        width: 512,
        height: 512,
        alt: "Corporate Catering in Noida",
      },
    ],
  },
};

export default async function CorporateCateringNoidaPage() {
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
            "name": "Corporate Catering Noida",
            "item": "https://vermacaterersevents.com/corporate-catering-noida"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Corporate Catering in Noida",
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
          "name": "Noida, Sector 62, Sector 125, Expressway, IT Parks"
        },
        "description": "Executive corporate lunch buffets, seminar catering, conference high-tea, and annual corporate day dining across Noida IT and corporate sectors."
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
          <span className="text-slate-800 font-bold">Corporate Catering Noida</span>
        </div>
      </nav>

      <main className="flex-grow pb-16">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white py-16 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto space-y-6 text-center lg:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Briefcase className="w-3.5 h-3.5" /> Noida IT & Corporate Hubs
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              Corporate Event & Buffet Catering in Noida
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Serving MNCs, tech hubs, and corporate offices across Sector 62, Expressway, and Advant Navis. From executive packed meal boxes to multi-course leadership buffets and annual galas, we deliver punctual and hygienic food services.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="https://wa.me/919810483544?text=Hello%20Verma%20Caterers!%20I%20want%20to%20enquire%20about%20Corporate%20Catering%20in%20Noida."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4" /> Corporate WhatsApp Desk
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
                Tailored Corporate Dining Solutions for Noida Businesses
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Corporate events require prompt timing, dietary customization, and immaculate presentation. Verma Caterers partners with corporate event planners across Noida to provide executive lunch setups, seminar tea breaks, and festive office celebrations with flexible menu configurations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Coverage Across Noida Sector 62, 125, 135 & Expressway",
                "Executive Buffets, Box Lunches & High-Tea Breaks",
                "Continental, Pan-Asian & Indian Multi-Cuisine Menus",
                "Punctual Delivery & Quick Professional Tear-Down",
                "FSSAI Certified Commercial Kitchen Hygiene",
                "Corporate Invoicing & Customized Service SLA"
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800">{feat}</span>
                </div>
              ))}
            </div>

            {/* Popular Corporate Formats */}
            <div className="bg-amber-500/10 p-6 rounded-3xl border border-amber-500/20 space-y-3">
              <div className="text-lg font-bold text-amber-800">
                Popular Noida Corporate Catering Menus
              </div>
              <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Executive High-Tea:</strong> Freshly brewed Filter Coffee & Tea, Cocktail Samosas, Assorted Finger Sandwiches, Blueberry Muffins & Cookies</li>
                <li><strong>Conference Lunch Buffet:</strong> Paneer Lababdar, Dal Makhani, Seasonal Subz, Jeera Rice, Tandoori Breads, Fresh Garden Salad & Gulab Jamun</li>
                <li><strong>Live Office Stalls:</strong> Live Pasta Counters, Street Chaat Counters & Mocktail Bars for Annual Meets</li>
              </ul>
            </div>

            {/* Cross-Link Explore Packages & Locations */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Explore Catering Packages & Locations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review per-plate estimates in our{" "}
                <Link href="/packages" className="text-amber-800 font-semibold underline hover:text-amber-600">
                  Catering Packages
                </Link>
                , explore our MNC catering in{" "}
                <Link href="/corporate-catering-gurugram" className="text-amber-800 font-semibold underline hover:text-amber-600">
                  Corporate Catering in Gurugram
                </Link>
                , or view wedding options in{" "}
                <Link href="/wedding-catering-noida" className="text-amber-800 font-semibold underline hover:text-amber-600">
                  Wedding Catering in Noida
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

