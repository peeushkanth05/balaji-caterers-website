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
import { Footer } from "@/components/Footer";
import VenuePartnerMarquee from "@/components/VenuePartnerMarquee";
import ClientLogoMarquee from "@/components/ClientLogoMarquee";
import FaqSection from "@/components/FaqSection";
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
  BookOpen,
  Calendar,
} from "lucide-react";

import { ensureDefaultHeroStatistics } from "@/lib/hero-stats";

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
  let dbBlogs: any[] = [];

  try {
    dbBlogs = await prisma.blogPost.findMany({
      where: { isActive: true },
      orderBy: { publishDate: "desc" },
      take: 3,
    });

    hero = await prisma.heroSection.findUnique({
      where: { id: "default" },
      include: {
        statistics: { where: { isEnabled: true }, orderBy: { sortOrder: "asc" } },
        images: { where: { isEnabled: true }, orderBy: { displayOrder: "asc" } },
        floatingCards: { where: { isEnabled: true }, orderBy: { sortOrder: "asc" } },
      },
    });

    if (hero && (!hero.statistics || hero.statistics.length === 0)) {
      try {
        const defaultStats = await ensureDefaultHeroStatistics();
        hero.statistics = defaultStats.filter((s: any) => s.isEnabled);
      } catch (e) {
        // Fallback handled in HeroSection
      }
    }

    services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    packages = await prisma.package.findMany({
      where: { isFeatured: true, isActive: true },
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
        { sectionType: "services", name: "Offered Services" },
        { sectionType: "portfolio", name: "Featured Portfolio & Showcase" },
        { sectionType: "about", name: "Why Choose Us / About" },
        { sectionType: "packages", name: "Catering Packages" },
        { sectionType: "gallery", name: "Event & Food Gallery" },
        { sectionType: "testimonials", name: "Customer Testimonials" },
        { sectionType: "videos", name: "Video Gallery" },
        { sectionType: "partners", name: "Partner Banquets & Venues" },
        { sectionType: "clients", name: "Corporate Client Logos" },
        { sectionType: "blogs", name: "Catering Guides & Blogs" },
        { sectionType: "faqs", name: "Frequently Asked Questions" },
        { sectionType: "cta", name: "Final Call To Action Banner" },
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
      take: 50,
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
  const heroSubtitle = settings?.heroSubtitle || "From grand weddings to intimate family gatherings — Verma Caterers brings you world-class catering, stunning floral décor, seamless sound, and complete event management.";

  const stat1Number = settings?.stat1Number || "500+";
  const stat1Label = settings?.stat1Label || "Events Managed";
  const stat2Number = settings?.stat2Number || "15+";
  const stat2Label = settings?.stat2Label || "Years Experience";
  const stat3Number = settings?.stat3Number || "1000+";
  const stat3Label = settings?.stat3Label || "Happy Families";
  const stat4Number = settings?.stat4Number || "100%";
  const stat4Label = settings?.stat4Label || "Satisfaction";

  const aboutTag = settings?.aboutTag || "Why Us";
  const aboutTitle = settings?.aboutTitle || "Why Choose Verma Caterers";
  const aboutSubtitle = settings?.aboutSubtitle || "With 15+ years of experience and 500+ successful events in Delhi NCR, we bring passion, precision, and a personal touch to every celebration.";

  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-slate-950 text-[#111827] dark:text-slate-100 font-sans transition-colors">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col gap-3">
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Verma Caterers on WhatsApp"
          className="w-13 h-13 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-6 h-6" />
        </a>
        <a
          href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
          aria-label="Call Verma Caterers"
          className="w-13 h-13 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500"
          title="Call Now"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {/* Navbar */}
      <Header />

      {/* Main Landmark Container */}
      <main id="main-content">
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
                    <span className="inline-block text-[9px] font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100/40">
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
                <section key={sec.id} id="about" className="py-20 px-5 sm:px-8 max-w-7xl mx-auto transition-colors">
                  <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">{aboutTag}</span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                      {aboutTitle}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                      {aboutSubtitle}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed font-normal">
                      <strong>Verma Caterers & Events</strong> is a trusted catering and event management company serving Delhi, Dwarka, Gurugram, and the wider Delhi NCR area. We specialize in wedding catering, corporate gatherings, private buffets, floral decorations, and sound & DJ setups with personalized owner-directed service.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-center space-y-3">
                      <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800/50 rounded-xl flex items-center justify-center mx-auto text-amber-700 dark:text-amber-400">
                        <Award className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-lg text-slate-900 dark:text-white">15+ Years Trust</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                        Over a decade of serving Delhi NCR families with reliable, authentic catering and event services.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-center space-y-3">
                      <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800/50 rounded-xl flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-lg text-slate-900 dark:text-white">One-Stop Solution</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                        Catering, décor, sound, lighting, mattress & cooler rental — everything seamlessly coordinated.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-center space-y-3">
                      <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800/50 rounded-xl flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                        <HeartHandshake className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-lg text-slate-900 dark:text-white">Customized Menus</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                        Bespoke menu curations tailored to your specific gathering size, palate, and celebration style.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-center space-y-3">
                      <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800/50 rounded-xl flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-lg text-slate-900 dark:text-white">Owner Supervision</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                        Owned & personally supervised by Sandeep Verma — ensuring uncompromised food quality and service.
                      </p>
                    </div>
                  </div>
                </section>
              );

            case "services":
              return <ServicesSection key={sec.id} services={services} />;

            case "packages":
              return packages.length > 0 ? (
                <section key={sec.id} id="packages" className="py-20 px-5 sm:px-8 max-w-7xl mx-auto transition-colors">
                  <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Curated Menus</span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                      Featured Catering Packages
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
                      Transparent pricing and customizable meal tiers designed for weddings, family parties, and corporate banquets.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="bg-white dark:bg-slate-900 p-7 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                            {pkg.category}
                          </span>
                          <h3 className="font-bold text-2xl text-slate-900 dark:text-white mt-3 mb-1">{pkg.name}</h3>
                          <div className="mb-4">
                            {pkg.pricePerPerson > 0 ? (
                              pkg.discountType && pkg.discountType !== "none" && pkg.discountValue > 0 ? (
                                <div className="space-y-1">
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-amber-600 dark:text-amber-500">₹{pkg.discountedPrice}</span>
                                    <span className="text-sm text-slate-400 line-through">₹{pkg.pricePerPerson}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ plate</span>
                                  </div>
                                  <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                                    {pkg.discountType === "percentage" ? `${pkg.discountValue}% OFF` : `₹${pkg.discountValue} OFF`}
                                  </span>
                                </div>
                              ) : (
                                <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">
                                  ₹{pkg.pricePerPerson} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ plate</span>
                                </div>
                              )
                            ) : (
                              <div className="text-lg font-bold text-amber-600 dark:text-amber-500">
                                Enquiry-Based Custom Pricing
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{pkg.description}</p>
                          {pkg.features && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                              <strong>Includes:</strong> {pkg.features}
                            </div>
                          )}
                        </div>
                        <a
                          href="#contact"
                          className="mt-6 w-full text-center py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-sm transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
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
                <section key={sec.id} id="portfolio" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
                  <DynamicPortfolioSection
                    initialCategories={categories}
                    initialFeatured={featuredPortfolios}
                    initialPortfolios={initialPortfolios}
                  />
                </section>
              );

            case "partners":
              return <VenuePartnerMarquee key={sec.id} />;

            case "clients":
              return <ClientLogoMarquee key={sec.id} />;

            case "blogs":
              if (dbBlogs.length === 0) return null;
              return (
                <section key={sec.id} id="blogs" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-7xl mx-auto border-b border-slate-200/80 dark:border-slate-800 pb-6">
                    <div className="space-y-2 text-center md:text-left">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400">Event Journal</span>
                      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                        Catering Guides & Planning Tips
                      </h2>
                    </div>
                    <Link
                      href="/blogs"
                      className="text-amber-800 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 self-center md:self-end"
                    >
                      View All Guides & Articles &rarr;
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {dbBlogs.map((b) => (
                      <Link
                        key={b.id}
                        href={`/blogs/${b.slug}`}
                        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col justify-between"
                      >
                        <div>
                          <div className="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                            {b.coverImage ? (
                              <img
                                src={b.coverImage}
                                alt={b.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <BookOpen className="w-12 h-12" />
                              </div>
                            )}
                            <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                              {b.category}
                            </span>
                          </div>
                          <div className="p-6 space-y-3">
                            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(b.publishDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              {b.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                              {b.excerpt || b.content}
                            </p>
                          </div>
                        </div>
                        <div className="p-6 pt-0 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider group-hover:underline">
                          Read Guide &rarr;
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );

            case "faqs":
              return <FaqSection key={sec.id} />;

            case "cta":
              return (
                <section key={sec.id} id="cta" className="py-16 px-5 sm:px-8 max-w-7xl mx-auto">
                  {advertisements.length > 0 && (
                    <div className="mb-10">
                      <AdvertisementBanner ads={advertisements} />
                    </div>
                  )}
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-8 sm:p-12 lg:p-16 text-white text-center shadow-xl border border-amber-500/20">
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        ✨ Unmatched Hospitality & Authentic Taste
                      </span>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                        Let’s Plan Your Next Celebration
                      </h2>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                        Tell us about your event, guest count and requirements. Our team will help you plan the right catering and event arrangements.
                      </p>
                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                          href="#contact"
                          className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition hover:bg-amber-600 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                        >
                          Request a Free Quote
                          <span aria-hidden="true">→</span>
                        </a>
                        {phone && (
                          <a
                            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                            className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-95"
                          >
                            <Phone className="w-4 h-4 text-amber-400" />
                            <span>Call: {phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              );

            case "contact":
              const displayPhone = contactSettings?.phone || phone;
              const displayEmail = contactSettings?.email || email;
              const displayAddress = contactSettings?.address || address;

              return (
                <section key={sec.id} id="contact" className="py-20 px-5 sm:px-8 max-w-7xl mx-auto scroll-mt-24">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Info */}
                    <div className="lg:col-span-5 space-y-8">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                          {contactSettings?.sectionTitle || "Get In Touch"}
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                          {contactSettings?.sectionHeading || "Let's Plan Your Dream Event"}
                        </h2>
                      </div>
 
                      <div className="space-y-6">
                        {displayPhone && (
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-2xl border border-amber-200/50 dark:border-amber-800/50">
                              <Phone className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-white">Phone / WhatsApp</div>
                              <a href={`tel:${displayPhone.replace(/[^0-9+]/g, "")}`} className="text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline">
                                {displayPhone}
                              </a>
                            </div>
                          </div>
                        )}
 
                        {displayEmail && (
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-2xl border border-amber-200/50 dark:border-amber-800/50">
                              <Mail className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-white">Email Address</div>
                              <a href={`mailto:${displayEmail}`} className="text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline">
                                {displayEmail}
                              </a>
                            </div>
                          </div>
                        )}
 
                        {displayAddress && (
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50">
                              <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-white">Location</div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{displayAddress}</p>
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
              return null;

            default:
              return null;
          }
        })}
      </main>
      <Footer />
    </div>
  );
}
