import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PublicForm } from "@/components/PublicForm";
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Star,
  ShieldCheck,
  Award,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

export const revalidate = 0; // Fresh content on each request

export default async function HomePage() {
  // Fetch dynamic content from Prisma DB
  let services: any[] = [];
  let packages: any[] = [];
  let galleryItems: any[] = [];
  let settings: any = null;

  try {
    services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    packages = await prisma.package.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: "desc" },
    });

    galleryItems = await prisma.galleryItem.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    });

    settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });
  } catch (e) {
    console.error("Database fetch error on homepage:", e);
  }

  const phone = settings?.phone || "+91 98104 83544";
  const whatsapp = settings?.whatsapp || "919810483544";
  const email = settings?.email || "vermasandeep124@gmail.com";
  const address = settings?.address || "Dwarka Sector 5, Madhu Vihar, New Delhi";
  const mapsUrl = settings?.mapsUrl || "https://www.google.com/maps";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 transition-all hover:scale-110 active:scale-95"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-7 h-7" />
        </a>
        <a
          href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
          className="w-14 h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-amber-500/30 transition-all hover:scale-110 active:scale-95"
          title="Call Now"
        >
          <Phone className="w-7 h-7" />
        </a>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-500/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-amber-500/20">
              <Image
                src="/new-logo.png"
                alt="Shree Balaji Logo"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <span className="font-serif font-bold text-xl text-slate-900 leading-tight block">
                Shree Balaji
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600">
                Caterers & Events
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-700">
            <a href="#about" className="hover:text-amber-600 transition-colors">
              About Us
            </a>
            <a href="#services" className="hover:text-amber-600 transition-colors">
              Services
            </a>
            <a href="#packages" className="hover:text-amber-600 transition-colors">
              Packages
            </a>
            <a href="#portfolio" className="hover:text-amber-600 transition-colors">
              Gallery
            </a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin/login"
              className="text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-200 px-3.5 py-2 rounded-xl transition-all"
            >
              Staff Portal
            </Link>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              Get a Quote ✨
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Delhi NCR's Premier Event Partner
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-[1.15]">
            Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Celebration</span>, Perfectly Crafted.
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From grand weddings to intimate family gatherings — Shree Balaji Caterers brings you world-class catering, stunning floral décor, seamless sound, and complete event management.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base shadow-lg shadow-amber-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Book Your Event ✨
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-base shadow-sm transition-all"
            >
              View Our Work 🎨
            </a>
          </div>
        </div>

        {/* Visual Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 rounded-3xl border border-amber-500/20 text-center">
            <div className="text-4xl mb-2">🍽️</div>
            <h3 className="font-bold text-slate-900">Catering</h3>
            <p className="text-xs text-slate-500 mt-1">North & Fusion</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 p-6 rounded-3xl border border-orange-500/20 text-center mt-6">
            <div className="text-4xl mb-2">🌸</div>
            <h3 className="font-bold text-slate-900">Floral Décor</h3>
            <p className="text-xs text-slate-500 mt-1">Custom Mandaps</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-3xl border border-blue-500/20 text-center">
            <div className="text-4xl mb-2">📢</div>
            <h3 className="font-bold text-slate-900">Sound & DJ</h3>
            <p className="text-xs text-slate-500 mt-1">Pro Audio & Lights</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 rounded-3xl border border-emerald-500/20 text-center mt-6">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="font-bold text-slate-900">Full Events</h3>
            <p className="text-xs text-slate-500 mt-1">End-to-End Execution</p>
          </div>
        </div>
      </section>

      {/* Dynamic Services Grid */}
      <section id="services" className="bg-amber-500/5 py-20 px-6 border-y border-amber-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Our Premium Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-amber-500/40 transition-all"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">{service.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{service.description}</p>
                <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                  {service.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Packages Showcase */}
      {packages.length > 0 && (
        <section id="packages" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Catering Menu</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Featured Catering Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                    {pkg.category}
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-slate-900 mt-3 mb-1">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-amber-600 mb-4">
                    ₹{pkg.pricePerPerson} <span className="text-xs font-normal text-slate-500">/ plate</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{pkg.description}</p>
                  {pkg.features && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700">
                      <strong>Includes:</strong> {pkg.features}
                    </div>
                  )}
                </div>
                <a
                  href="#contact"
                  className="mt-6 w-full text-center py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs"
                >
                  Request Package Quote
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Dynamic Gallery Showcase */}
      {galleryItems.length > 0 && (
        <section id="portfolio" className="bg-slate-900 text-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Portfolio</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1">
                Recent Event Decorations & Setups
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {galleryItems.map((item) => (
                <div key={item.id} className="rounded-3xl overflow-hidden relative group h-64 bg-slate-800">
                  <img
                    src={item.imageUrl.startsWith("http") ? item.imageUrl : `/${item.imageUrl}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-6 flex flex-col justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-sm text-white">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact & Form Section */}
      <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Get In Touch</span>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
                Let's Plan Your Dream Event
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Phone / WhatsApp</div>
                  <a href={`tel:${phone}`} className="text-sm font-semibold text-amber-600 hover:underline">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 text-orange-700 rounded-2xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Email Address</div>
                  <a href={`mailto:${email}`} className="text-sm font-semibold text-amber-600 hover:underline">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Location</div>
                  <p className="text-xs text-slate-600 mt-0.5">{address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Public Form Component */}
          <div className="lg:col-span-7">
            <PublicForm whatsappNumber={whatsapp} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="font-serif font-bold text-white text-lg">Shree Balaji Caterers</div>
            <p className="text-xs text-slate-500 mt-1">{address}</p>
          </div>
          <div className="text-xs text-slate-500">
            &copy; 2026 Shree Balaji Caterers. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
