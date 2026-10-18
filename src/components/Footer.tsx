"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  MessageCircle,
  Share2,
  MapPin,
  Phone,
  Mail,
  X,
  FileText,
  ShieldCheck,
  Scale,
  DollarSign,
  HelpCircle,
  Info,
} from "lucide-react";

const DEFAULT_FOOTER = {
  aboutText:
    "Verma Caterers offers premium wedding, corporate, and private party catering with pure vegetarian multi-cuisine menus, live food stations, floral decor, sound systems, and end-to-end event production across Delhi, Dwarka, Gurugram, and Noida.",
  locationText: "Dwarka Sector 5, Madhu Vihar, New Delhi - 110059",
  mapsUrl: "https://maps.google.com/?q=Verma+Caterers+Dwarka+Sector+5",
  phone: "+91 98104 83544",
  email: "vermasandeep124@gmail.com",
  copyrightText: "© 2026 Verma Caterers & Events. All rights reserved.",
  privacyPolicy: "We respect your privacy and are committed to protecting your personal data.",
  termsOfService: "Terms and conditions apply to all catering bookings and event contracts.",
  refundPolicy: "Refunds are processed according to our cancellation and booking timeline.",
  cancellationPolicy: "Advance booking amounts are refundable up to 14 days before the event.",
  cookiePolicy: "We use essential cookies to maintain security and improve user experience.",
  disclaimer: "All event setups, menus, and equipment rentals are subject to booking availability.",
};

export function Footer() {
  const [footer, setFooter] = useState<any>(DEFAULT_FOOTER);
  const [socials, setSocials] = useState<any[]>([]);

  // Policy Modal state
  const [activePolicy, setActivePolicy] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then((data) => {
        if (data.footer) setFooter(data.footer);
      })
      .catch((err) => console.error("Footer fetch failed:", err));
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook": return <Facebook className="w-4 h-4" />;
      case "instagram": return <Instagram className="w-4 h-4" />;
      case "youtube": return <Youtube className="w-4 h-4" />;
      case "linkedin": return <Linkedin className="w-4 h-4" />;
      case "x":
      case "twitter": return <Twitter className="w-4 h-4" />;
      case "whatsapp": return <MessageCircle className="w-4 h-4" />;
      default: return <Share2 className="w-4 h-4" />;
    }
  };

  const getPolicyIcon = (type: string) => {
    switch (type) {
      case "Privacy Policy": return <ShieldCheck className="w-5 h-5 text-amber-500" />;
      case "Terms & Conditions": return <Scale className="w-5 h-5 text-amber-500" />;
      case "Refund Policy": return <DollarSign className="w-5 h-5 text-amber-500" />;
      case "Cancellation Policy": return <X className="w-5 h-5 text-amber-500" />;
      case "Cookie Policy": return <Info className="w-5 h-5 text-amber-500" />;
      default: return <FileText className="w-5 h-5 text-amber-500" />;
    }
  };

  const legalPolicies = [
    { name: "Privacy Policy", content: footer.privacyPolicy },
    { name: "Terms & Conditions", content: footer.termsOfService },
    { name: "Refund Policy", content: footer.refundPolicy },
    { name: "Cancellation Policy", content: footer.cancellationPolicy },
    { name: "Cookie Policy", content: footer.cookiePolicy },
    { name: "Disclaimer", content: footer.disclaimer },
  ];

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePolicy) {
        setActivePolicy(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePolicy]);

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-white/5 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 pb-12 border-b border-white/5">
        
        {/* Brand & Socials Column */}
        <div className="md:col-span-4 space-y-5">
          <div className="flex items-center">
            <div className="relative w-[210px] h-16 flex items-center justify-start">
              <Image
                src="/verma-logo-dark.webp"
                alt="Verma Caterers Logo"
                width={210}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed max-w-sm text-[11px]">
            {footer.aboutText}
          </p>

          {/* Social Icons Loop */}
          {socials.length > 0 && (
            <div className="flex flex-wrap gap-2.5 pt-2">
              {socials.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${link.platform} page`}
                  className="p-3 bg-white/5 hover:bg-amber-500 hover:text-white rounded-xl text-slate-300 transition-all shadow-md active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title={link.platform}
                >
                  {getPlatformIcon(link.platform)}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Quick Links Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="text-white font-bold text-[10px] uppercase tracking-wider">Quick Navigation</div>
          <ul className="space-y-2.5 font-semibold text-slate-400 text-[11px]">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home Page
              </Link>
            </li>
            <li>
              <Link href="/packages" className="hover:text-white transition-colors">
                Catering Packages
              </Link>
            </li>
            <li>
              <a href="/#portfolio" className="hover:text-white transition-colors">
                Event Portfolio
              </a>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-white transition-colors">
                Catering Guides & Blog
              </Link>
            </li>
            <li>
              <a href="/#about" className="hover:text-white transition-colors">
                About & Why Us
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-white transition-colors">
                Get In Touch
              </a>
            </li>
          </ul>
        </div>

        {/* Catering Locations Column */}
        <div className="md:col-span-3 space-y-4">
          <div className="text-white font-bold text-[10px] uppercase tracking-wider">Catering by Location</div>
          <ul className="space-y-2 font-medium text-slate-400 text-[11px]">
            <li>
              <Link href="/wedding-catering-dwarka" className="hover:text-amber-400 transition-colors">
                Wedding Catering Dwarka
              </Link>
            </li>
            <li>
              <Link href="/wedding-catering-gurugram" className="hover:text-amber-400 transition-colors">
                Wedding Catering Gurugram
              </Link>
            </li>
            <li>
              <Link href="/catering-services-delhi-ncr" className="hover:text-amber-400 transition-colors">
                Delhi NCR & Noida Catering
              </Link>
            </li>
            <li>
              <Link href="/corporate-catering-gurugram" className="hover:text-amber-400 transition-colors">
                Corporate Catering Gurugram
              </Link>
            </li>
            <li>
              <Link href="/birthday-catering-dwarka" className="hover:text-amber-400 transition-colors">
                Birthday Catering Dwarka
              </Link>
            </li>
            <li>
              <Link href="/puja-kirtan-catering-delhi-ncr" className="hover:text-amber-400 transition-colors">
                Satvik & Puja Catering
              </Link>
            </li>
            <li>
              <Link href="/small-gathering-catering-dwarka" className="hover:text-amber-400 transition-colors">
                Small Gathering Catering
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacts & Coordinates Column */}
        <div className="md:col-span-3 space-y-4">
          <div className="text-white font-bold text-[10px] uppercase tracking-wider">Our Location & Coordinates</div>
          <ul className="space-y-3 text-slate-400 text-[11px]">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <a
                  href={footer.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium leading-relaxed block"
                >
                  {footer.locationText}
                </a>
                <span className="text-[9px] text-slate-400 block mt-0.5">Click to view on Google Maps</span>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href={`tel:${footer.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-white transition-colors font-medium">
                {footer.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href={`mailto:${footer.email}`} className="hover:text-white transition-colors font-medium">
                {footer.email}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright & Policies Row */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-400 text-[10px] text-center md:text-left font-medium">
          {footer.copyrightText}
        </p>

        {/* Policy Links Grid */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {legalPolicies.map((policy) => (
            <button
              key={policy.name}
              onClick={() => setActivePolicy({ title: policy.name, content: policy.content })}
              className="hover:text-amber-400 transition-colors"
            >
              {policy.name}
            </button>
          ))}
          <button
            onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}
            className="hover:text-amber-300 text-amber-400 font-semibold transition-colors"
          >
            Cookie Preferences
          </button>
        </div>
      </div>

      {/* Legal Policies Modal Overlay */}
      {activePolicy && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex items-center gap-2">
                {getPolicyIcon(activePolicy.title)}
                <div className="font-bold text-base text-slate-900 dark:text-white">{activePolicy.title}</div>
              </div>
              <button
                onClick={() => setActivePolicy(null)}
                aria-label="Close policy modal"
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Close modal"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto prose prose-slate dark:prose-invert max-w-none text-xs leading-relaxed space-y-4">
              {activePolicy.content.split("\n").map((line, lIdx) => {
                if (line.startsWith("# ")) {
                  return <h1 key={lIdx} className="text-lg font-bold text-slate-900 dark:text-white border-b dark:border-slate-800 pb-1 mt-4">{line.replace("# ", "")}</h1>;
                }
                if (line.startsWith("## ")) {
                  return <h2 key={lIdx} className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-3">{line.replace("## ", "")}</h2>;
                }
                if (!line.trim()) return null;
                return <p key={lIdx} className="text-slate-600 dark:text-slate-300 font-medium">{line}</p>;
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex justify-end">
              <button
                onClick={() => setActivePolicy(null)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] uppercase py-2.5 px-6 rounded-xl transition-all shadow-sm active:scale-95"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
