"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Calendar,
  Tag,
  MessageSquare,
  Phone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { PortfolioData } from "@/types/portfolio";
import { PortfolioGalleryLightbox } from "./PortfolioGalleryLightbox";
import { PortfolioCard } from "./PortfolioCard";

interface PortfolioDetailViewProps {
  portfolio: PortfolioData;
  relatedPortfolios?: PortfolioData[];
  navigation?: {
    prev?: { title: string; slug: string; coverImage: string } | null;
    next?: { title: string; slug: string; coverImage: string } | null;
  };
  whatsappNumber?: string;
  phone?: string;
}

export function PortfolioDetailView({
  portfolio,
  relatedPortfolios = [],
  navigation,
  whatsappNumber = "919810483544",
  phone = "+91 98104 83544",
}: PortfolioDetailViewProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: portfolio.seoTitle || portfolio.title,
        text: portfolio.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("✅ Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-amber-600">Home</Link>
        <span>/</span>
        <a href="/#portfolio" className="hover:text-amber-600">Portfolio</a>
        {portfolio.category && (
          <>
            <span>/</span>
            <span className="text-amber-600 font-bold">{portfolio.category.categoryName}</span>
          </>
        )}
      </nav>

      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[400px] lg:min-h-[460px] flex items-end p-8 sm:p-12 shadow-2xl">
        <img
          src={portfolio.coverImage || "/new-logo.png"}
          alt={portfolio.altText || portfolio.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            {portfolio.category && (
              <span className="px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg">
                {portfolio.category.icon} {portfolio.category.categoryName}
              </span>
            )}
            {portfolio.featured && (
              <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Featured Event
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
            {portfolio.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {portfolio.shortDescription}
          </p>

          {/* Social Share Button */}
          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold transition-all"
            >
              <Share2 className="w-4 h-4 text-amber-400" /> Share Project
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid Content: Gallery & Description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Details & Gallery */}
        <div className="lg:col-span-8 space-y-10">
          {/* Detailed Overview */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Project Overview & Highlights
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {portfolio.longDescription}
            </div>

            {/* Tags Badges */}
            {portfolio.tags && portfolio.tags.length > 0 && (
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase mr-1">Tags:</span>
                {portfolio.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full"
                  >
                    <Tag className="w-3 h-3 text-amber-600" /> {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Photo Gallery Showcase */}
          {portfolio.galleryImages && portfolio.galleryImages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Event Photo Gallery
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {portfolio.galleryImages.length} Photos available
                </span>
              </div>
              <PortfolioGalleryLightbox
                images={portfolio.galleryImages}
                title={portfolio.title}
              />
            </div>
          )}
        </div>

        {/* Right Sidebar: Booking CTA Card */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950 text-white p-8 rounded-3xl shadow-xl space-y-6 border border-slate-800">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                Planning a Similar Event?
              </span>
              <h3 className="font-serif font-bold text-2xl text-white mt-1">
                Book Shree Balaji Caterers
              </h3>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Get a customized quote for catering, floral decor, sound & full event management tailored to your budget.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi%20Shree%20Balaji%20Caterers,%20I%20saw%20your%20project%20"${encodeURIComponent(
                  portfolio.title
                )}"%20and%20want%20a%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
              </a>

              <a
                href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-5 h-5" /> Call {phone}
              </a>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>15+ Years Trust in Delhi NCR</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Customized Menus & Themes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prev & Next Project Navigation */}
      {navigation && (navigation.prev || navigation.next) && (
        <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {navigation.prev ? (
            <Link
              href={`/portfolio/${navigation.prev.slug}`}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/50 shadow-sm flex items-center gap-4 transition-all group"
            >
              <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-amber-600 group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Previous Project</span>
                <p className="font-bold text-slate-900 text-sm group-hover:text-amber-600 line-clamp-1">
                  {navigation.prev.title}
                </p>
              </div>
            </Link>
          ) : <div />}

          {navigation.next ? (
            <Link
              href={`/portfolio/${navigation.next.slug}`}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/50 shadow-sm flex items-center justify-between text-right transition-all group"
            >
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Next Project</span>
                <p className="font-bold text-slate-900 text-sm group-hover:text-amber-600 line-clamp-1">
                  {navigation.next.title}
                </p>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      )}

      {/* Related Projects Showcase */}
      {relatedPortfolios.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Related Projects You May Like
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPortfolios.map((item) => (
              <PortfolioCard key={item.id} portfolio={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
