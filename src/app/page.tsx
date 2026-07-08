import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PublicForm } from "@/components/PublicForm";
import { ServicesSection } from "@/components/ServicesSection";
import { DynamicPortfolioSection } from "@/components/portfolio/DynamicPortfolioSection";
import { HeroSection } from "@/components/HeroSection";
import { Header } from "@/components/Header";
import { VideoGallerySection } from "@/components/VideoGallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PhotoGallerySection } from "@/components/PhotoGallerySection";
import { AdvertisementBanner } from "@/components/AdvertisementBanner";
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
  let categories: any[] = [];
  let featuredPortfolios: any[] = [];
  let initialPortfolios: any[] = [];
  let settings: any = null;
  let hero: any = null;
  let homeSections: any[] = [];
  let videos: any[] = [];
  let testimonials: any[] = [];
  let galleryItems: any[] = [];
  let contactSettings: any = null;
  let advertisements: any[] = [];
  let homepageOffers: any[] = [];

  try {
    hero = await prisma.heroSection.findUnique({
      where: { id: "default" },
      include: {
        statistics: { where: { isEnabled: true }, orderBy: { sortOrder: "asc" } },
        images: { where: { isEnabled: true }, orderBy: { displayOrder: "asc" } },
        floatingCards: { where: { isEnabled: true }, orderBy: { sortOrder: "asc" } },
      },
    });

    services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    packages = await prisma.package.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: "desc" },
    });

    categories = await prisma.portfolioCategory.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
      include: {
        _count: {
          select: { portfolios: { where: { active: true } } },
        },
      },
    });

    const rawFeatured = await prisma.portfolio.findMany({
      where: { active: true, featured: true },
      orderBy: { displayOrder: "asc" },
      include: { category: true },
    });
    featuredPortfolios = rawFeatured.map((p) => ({
      ...p,
      galleryImages: JSON.parse(p.galleryImages || "[]"),
      tags: JSON.parse(p.tags || "[]"),
    }));

    const rawPortfolios = await prisma.portfolio.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
      include: { category: true },
    });
    initialPortfolios = rawPortfolios.map((p) => ({
      ...p,
      galleryImages: JSON.parse(p.galleryImages || "[]"),
      tags: JSON.parse(p.tags || "[]"),
    }));

    settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });

    contactSettings = await prisma.enquiryFormSetting.findUnique({
      where: { id: "default" },
    });

    if (!contactSettings) {
      const DEFAULT_FIELDS = [
        { id: "name", name: "name", label: "Your Name", placeholder: "Peeyush Kanth", required: true, isEnabled: true, displayOrder: 0, type: "text" },
        { id: "phone", name: "phone", label: "Mobile Number", placeholder: "+91 98765 43210", required: true, isEnabled: true, displayOrder: 1, type: "text" },
        { id: "email", name: "email", label: "Email Address", placeholder: "you@example.com", required: false, isEnabled: true, displayOrder: 2, type: "email" },
        { id: "eventType", name: "eventType", label: "Event Type", placeholder: "Select Event", required: true, isEnabled: true, displayOrder: 3, type: "select" },
        { id: "service", name: "service", label: "Service Needed", placeholder: "Select Service", required: false, isEnabled: true, displayOrder: 4, type: "select" },
        { id: "eventDate", name: "eventDate", label: "Event Date", placeholder: "dd-mm-yyyy", required: false, isEnabled: true, displayOrder: 5, type: "date" },
        { id: "guestCount", name: "guestCount", label: "Expected Guests", placeholder: "e.g. 200", required: false, isEnabled: true, displayOrder: 6, type: "number" },
        { id: "message", name: "message", label: "Tell Us More", placeholder: "Any specific venue preferences or special requests...", required: false, isEnabled: true, displayOrder: 7, type: "textarea" }
      ];
      const DEFAULT_EVENT_TYPES = ["Wedding", "Birthday Party", "Engagement", "Corporate Event", "Anniversary", "Puja & Kirtan", "Floral Decoration", "Sound & DJ Setup", "Other"];
      const DEFAULT_SERVICES = [
        "Catering Services", "Wedding Host", "Birthday Party", "Puja & Kirtan", "Floral Decoration", "Sound & DJ Setup", "Event Management (End-to-End)", "Stall Booking", "Event Anchoring", "Cooler Rental", "Mattress Rental"
      ];
      contactSettings = await prisma.enquiryFormSetting.create({
        data: {
          id: "default",
          sectionTitle: "Get In Touch",
          sectionHeading: "Let's Plan Your Dream Event",
          formTitle: "Request a Free Quote",
          formDescription: "Fill out your event details below for a customized quotation.",
          phone: "+91 98104 83544",
          phoneIcon: "Phone",
          email: "vermasandeep124@gmail.com",
          emailIcon: "Mail",
          address: "Dwarka Sector 5, Madhu Vihar, New Delhi",
          addressIcon: "MapPin",
          submitBtnText: "Send My Enquiry",
          successMessage: "Thank you! Your enquiry has been received successfully.",
          errorMessage: "Something went wrong. Please try again later.",
          fieldsJson: JSON.stringify(DEFAULT_FIELDS),
          eventTypesJson: JSON.stringify(DEFAULT_EVENT_TYPES),
          servicesJson: JSON.stringify(DEFAULT_SERVICES),
        },
      });
    }

    const now = new Date();
    advertisements = await prisma.advertisement.findMany({
      where: {
        isEnabled: true,
        OR: [
          { startDate: null, endDate: null },
          { startDate: { lte: now }, endDate: null },
          { startDate: null, endDate: { gte: now } },
          { startDate: { lte: now }, endDate: { gte: now } },
        ],
      },
      orderBy: { displayOrder: "asc" },
    });

    homepageOffers = await prisma.alertTicker.findMany({
      where: {
        isEnabled: true,
        showOnHomepage: true,
        OR: [
          { startDate: null, endDate: null },
          { startDate: { lte: now }, endDate: null },
          { startDate: null, endDate: { gte: now } },
          { startDate: { lte: now }, endDate: { gte: now } },
        ],
      },
      orderBy: { priority: "desc" },
    });

    homeSections = await prisma.homepageSection.findMany({
      orderBy: { displayOrder: "asc" },
    });

    if (homeSections.length === 0) {
      const defaultTypes = [
        { sectionType: "hero", name: "Hero Banner" },
        { sectionType: "about", name: "Why Choose Us / About" },
        { sectionType: "services", name: "Offered Services" },
        { sectionType: "packages", name: "Catering Packages" },
        { sectionType: "videos", name: "Event Videos Slider" },
        { sectionType: "testimonials", name: "Client Reviews" },
        { sectionType: "gallery", name: "Photo Gallery Grid" },
        { sectionType: "portfolio", name: "Grand Projects Showcase" },
        { sectionType: "cta", name: "Call To Action Banner" },
        { sectionType: "partners", name: "Partner Banquets & Venues" },
        { sectionType: "blogs", name: "Catering Guides & Blogs" },
        { sectionType: "contact", name: "Request a Free Quote" },
        { sectionType: "footer", name: "Footer Info & Copyright" },
      ];
      const creations = defaultTypes.map((t, idx) =>
        prisma.homepageSection.create({
          data: {
            sectionType: t.sectionType,
            name: t.name,
            displayOrder: idx,
            isEnabled: true,
          },
        })
      );
      await Promise.all(creations);
      homeSections = await prisma.homepageSection.findMany({
        orderBy: { displayOrder: "asc" },
      });
    }

    videos = await prisma.videoGalleryItem.findMany({
      where: { isEnabled: true },
      orderBy: { displayOrder: "asc" },
    });

    testimonials = await prisma.testimonial.findMany({
      where: { isEnabled: true },
      orderBy: { displayOrder: "asc" },
    });

    galleryItems = await prisma.galleryItem.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    });
  } catch (e) {
    console.error("Database fetch error on homepage:", e);
  }

  const phone = settings?.phone || "+91 98104 83544";
  const whatsapp = settings?.whatsapp || "919810483544";
  const email = settings?.email || "vermasandeep124@gmail.com";
  const address = settings?.address || "Dwarka Sector 5, Madhu Vihar, New Delhi";

  const heroBadge = settings?.heroBadge || "Delhi NCR's Premier Event Partner";
  const heroTitle = settings?.heroTitle || "Every Celebration, Perfectly Crafted.";
  const heroSubtitle = settings?.heroSubtitle || "From grand weddings to intimate family gatherings — Shree Balaji Caterers brings you world-class catering, stunning floral décor, seamless sound, and complete event management.";

  const stat1Number = settings?.stat1Number || "500+";
  const stat1Label = settings?.stat1Label || "Events Managed";
  const stat2Number = settings?.stat2Number || "15+";
  const stat2Label = settings?.stat2Label || "Years Experience";
  const stat3Number = settings?.stat3Number || "1000+";
  const stat3Label = settings?.stat3Label || "Happy Families";
  const stat4Number = settings?.stat4Number || "100%";
  const stat4Label = settings?.stat4Label || "Satisfaction";

  const aboutTag = settings?.aboutTag || "Why Us";
  const aboutTitle = settings?.aboutTitle || "Why Choose Shree Balaji Caterers";
  const aboutSubtitle = settings?.aboutSubtitle || "With 15+ years of experience and 500+ successful events in Delhi NCR, we bring passion, precision, and a personal touch to every celebration.";

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
      <Header />

      {/* Dynamic Homepage Offers Banner */}
      {homepageOffers.length > 0 && (
        <div className="bg-amber-50/40 border-b border-amber-100/50 py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-3">
            {homepageOffers.map((offer) => (
              <div 
                key={offer.id} 
                className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-amber-100/70 shadow-sm transition-all hover:shadow-md hover:border-amber-200"
              >
                <div className="flex items-center gap-3.5 w-full sm:w-auto">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center text-white text-base font-bold shadow-md shadow-amber-500/15">
                    🎁
                  </span>
                  <div>
                    <span className="inline-block text-[9px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100/40">
                      Promo Offer
                    </span>
                    <p className="text-slate-800 font-semibold text-xs sm:text-sm mt-1.5 leading-relaxed">{offer.text}</p>
                  </div>
                </div>
                {offer.redirectUrl && (
                  <a
                    href={offer.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider py-3 px-6 rounded-2xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    View Offer Details
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Hero Section */}
      {/* Dynamic Homepage Sections */}
      {homeSections
        .filter((sec) => sec.isEnabled)
        .map((sec) => {
          switch (sec.sectionType) {
            case "hero":
              return (
                <div key={sec.id}>
                  <HeroSection hero={hero} phone={phone} whatsapp={whatsapp} />
                </div>
              );

            case "about":
              return (
                <section key={sec.id} id="about" className="py-20 px-6 max-w-7xl mx-auto">
                  <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">{aboutTag}</span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
                      {aboutTitle}
                    </h2>
                    <p className="text-slate-600 text-sm mt-2">
                      {aboutSubtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
                      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto text-amber-600">
                        <Award className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900">15+ Years Trust</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Over a decade of serving Delhi NCR families with reliable, high-quality event services.
                      </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto text-orange-600">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900">One-Stop Solution</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Catering, décor, sound, lighting, mattress & cooler rental — everything under one roof.
                      </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
                        <HeartHandshake className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900">Customized Menus</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Tailored to your specific theme, budget, guest count, and dietary preferences.
                      </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto text-purple-600">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900">Owner Direct</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Owned & directed by Sandeep Verma — personal attention for every event.
                      </p>
                    </div>
                  </div>
                </section>
              );

            case "services":
              return <ServicesSection key={sec.id} services={services} />;

            case "packages":
              return packages.length > 0 ? (
                <section key={sec.id} id="packages" className="py-20 px-6 max-w-7xl mx-auto">
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
                          <div className="mb-4">
                            {pkg.discountType && pkg.discountType !== "none" && pkg.discountValue > 0 ? (
                              <div className="space-y-1">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-bold text-amber-600">₹{pkg.discountedPrice}</span>
                                  <span className="text-sm text-slate-400 line-through">₹{pkg.pricePerPerson}</span>
                                  <span className="text-xs text-slate-500 font-normal">/ plate</span>
                                </div>
                                <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded bg-red-50 text-red-600 border border-red-200">
                                  {pkg.discountType === "percentage" ? `${pkg.discountValue}% OFF` : `₹${pkg.discountValue} OFF`}
                                </span>
                              </div>
                            ) : (
                              <div className="text-3xl font-bold text-amber-600">
                                ₹{pkg.pricePerPerson} <span className="text-xs font-normal text-slate-500">/ plate</span>
                              </div>
                            )}
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
              ) : null;

            case "videos":
              return videos.length > 0 ? (
                <VideoGallerySection key={sec.id} videos={videos} />
              ) : null;

            case "testimonials":
              return testimonials.length > 0 ? (
                <TestimonialsSection key={sec.id} testimonials={testimonials} />
              ) : null;

            case "gallery":
              return galleryItems.length > 0 ? (
                <PhotoGallerySection key={sec.id} galleryItems={galleryItems} />
              ) : null;

            case "portfolio":
              return (
                <section key={sec.id} id="portfolio-section" className="py-20 px-6 max-w-7xl mx-auto">
                  <DynamicPortfolioSection
                    initialCategories={categories}
                    initialFeatured={featuredPortfolios}
                    initialPortfolios={initialPortfolios}
                  />
                </section>
              );

            case "partners":
              return (
                <section key={sec.id} id="partners" className="py-12 bg-white border-y border-slate-200/50 overflow-hidden">
                  <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-8">
                      Our Trusted Banquets & Venue Partners
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                      <span className="font-serif font-black text-xl tracking-tight text-slate-700">🎪 ROYAL PALACE GARDENS</span>
                      <span className="font-serif font-black text-xl tracking-tight text-slate-700">🏰 ELITE BANQUET HALL</span>
                      <span className="font-serif font-black text-xl tracking-tight text-slate-700">👑 IMPERIAL RESIDENCY</span>
                      <span className="font-serif font-black text-xl tracking-tight text-slate-700">🌳 CLASSIC LAWNS</span>
                      <span className="font-serif font-black text-xl tracking-tight text-slate-700">🎪 CAPITAL BANQUETS</span>
                    </div>
                  </div>
                </section>
              );

            case "blogs":
              return (
                <section key={sec.id} id="blogs" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">Event Journal</span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                      Catering Guides & Planning Tips
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 bg-slate-100 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1555244162-803834f70033?w=500" alt="Blog 1" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 space-y-3">
                        <span className="text-[10px] font-bold text-amber-600 uppercase">Catering Trends</span>
                        <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug">How to Design the Perfect Wedding Menu</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">Discover current guest dining trends, custom live counters, and must-have menu spreads for your big day.</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 bg-slate-100 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500" alt="Blog 2" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 space-y-3">
                        <span className="text-[10px] font-bold text-amber-600 uppercase">Planning Tips</span>
                        <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug">Estimating Guest Count & Plate Waste</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">A practical guide to accurately calculating guest counts and avoiding plate wastage during large banquets.</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 bg-slate-100 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1533144893879-c65f9d453392?w=500" alt="Blog 3" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 space-y-3">
                        <span className="text-[10px] font-bold text-amber-600 uppercase">Setup & Design</span>
                        <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug">Selecting Theme Decor for Puja & Jagran</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">Ensure a beautiful spiritual stage setup with clean traditional seating, lights, and flower garlands.</p>
                      </div>
                    </div>
                  </div>
                </section>
              );

            case "cta":
              if (advertisements.length === 0) return null;
              return (
                <section key={sec.id} id="cta" className="px-6">
                  <AdvertisementBanner ads={advertisements} />
                </section>
              );

            case "contact":
              const displayPhone = contactSettings?.phone || phone;
              const displayEmail = contactSettings?.email || email;
              const displayAddress = contactSettings?.address || address;

              return (
                <section key={sec.id} id="contact" className="py-20 px-6 max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Info */}
                    <div className="lg:col-span-5 space-y-8">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                          {contactSettings?.sectionTitle || "Get In Touch"}
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
                          {contactSettings?.sectionHeading || "Let's Plan Your Dream Event"}
                        </h2>
                      </div>
 
                      <div className="space-y-6">
                        {displayPhone && (
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
                              <Phone className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-900">Phone / WhatsApp</div>
                              <a href={`tel:${displayPhone.replace(/[^0-9+]/g, "")}`} className="text-sm font-semibold text-amber-600 hover:underline">
                                {displayPhone}
                              </a>
                            </div>
                          </div>
                        )}
 
                        {displayEmail && (
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-100 text-orange-700 rounded-2xl">
                              <Mail className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-900">Email Address</div>
                              <a href={`mailto:${displayEmail}`} className="text-sm font-semibold text-amber-600 hover:underline">
                                {displayEmail}
                              </a>
                            </div>
                          </div>
                        )}
 
                        {displayAddress && (
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                              <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-900">Location</div>
                              <p className="text-xs text-slate-600 mt-0.5">{displayAddress}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
 
                    {/* Public Form Component */}
                    <div className="lg:col-span-7">
                      <PublicForm 
                        whatsappNumber={whatsapp} 
                        availableServices={services} 
                        settings={contactSettings}
                      />
                    </div>
                  </div>
                </section>
              );

            case "footer":
              return (
                <footer key={sec.id} className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-sm">
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
              );

            default:
              return null;
          }
        })}
    </div>
  );
}
