"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export function Footer() {
  const [footer, setFooter] = useState<any>(null);
  const [socials, setSocials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Policy Modal state
  const [activePolicy, setActivePolicy] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then((data) => {
        if (data.footer) setFooter(data.footer);
        if (data.socialLinks) setSocials(data.socialLinks);
      })
      .catch((err) => console.error("Footer fetch failed:", err))
      .finally(() => setLoading(false));
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

  if (loading || !footer) {
    return (
      <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-white/5 text-xs text-center">
        <div className="max-w-7xl mx-auto animate-pulse flex flex-col items-center gap-4">
          <div className="w-32 h-6 bg-slate-800 rounded-md" />
          <div className="w-64 h-4 bg-slate-800 rounded-md" />
          <div className="w-48 h-4 bg-slate-800 rounded-md" />
        </div>
      </footer>
    );
  }

  const legalPolicies = [
    { name: "Privacy Policy", content: footer.privacyPolicy },
    { name: "Terms & Conditions", content: footer.termsOfService },
    { name: "Refund Policy", content: footer.refundPolicy },
    { name: "Cancellation Policy", content: footer.cancellationPolicy },
    { name: "Cookie Policy", content: footer.cookiePolicy },
    { name: "Disclaimer", content: footer.disclaimer },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-white/5 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/5">
        
        {/* Brand & Socials Column */}
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1 border border-white/10 shadow-md">
              <img src="/new-logo.png" alt="Verma Caterers" className="object-cover w-full h-full" />
            </div>
            <div>
              <span className="font-serif font-bold text-sm text-white tracking-wide block uppercase">
                Verma Caterers
              </span>
              <span className="text-[8px] uppercase tracking-widest text-amber-500 font-extrabold block">
                Premium Caterers & Event Managers
              </span>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed max-w-sm text-[11px]">
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
                  className="p-2.5 bg-white/5 hover:bg-amber-500 hover:text-white rounded-xl text-slate-400 transition-all shadow-md active:scale-95"
                  title={link.platform}
                >
                  {getPlatformIcon(link.platform)}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Quick Links Column */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-white font-bold text-[10px] uppercase tracking-wider">Quick Navigation</h4>
          <ul className="space-y-2.5 font-semibold text-slate-400 text-[11px]">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home Page
              </Link>
            </li>
            <li>
              <a href="/#about" className="hover:text-white transition-colors">
                About & Why Us
              </a>
            </li>
            <li>
              <a href="/#services" className="hover:text-white transition-colors">
                Offered Services
              </a>
            </li>
            <li>
              <Link href="/packages" className="hover:text-white transition-colors">
                Catering Packages
              </Link>
            </li>
            <li>
              <a href="/#contact" className="hover:text-white transition-colors">
                Get In Touch
              </a>
            </li>
          </ul>
        </div>

        {/* Contacts & Coordinates Column */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-white font-bold text-[10px] uppercase tracking-wider">Our Location & Coordinates</h4>
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
                <span className="text-[9px] text-slate-500 block mt-0.5">Click to view on Google Maps</span>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <a href={`tel:${footer.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-white transition-colors font-medium">
                {footer.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <a href={`mailto:${footer.email}`} className="hover:text-white transition-colors font-medium">
                {footer.email}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright & Policies Row */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-500 text-[10px] text-center md:text-left font-medium">
          {footer.copyrightText}
        </p>

        {/* Policy Links Grid */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {legalPolicies.map((policy) => (
            <button
              key={policy.name}
              onClick={() => setActivePolicy({ title: policy.name, content: policy.content })}
              className="hover:text-amber-500 transition-colors"
            >
              {policy.name}
            </button>
          ))}
        </div>
      </div>

      {/* Legal Policies Modal Overlay */}
      {activePolicy && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-3xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
              <div className="flex items-center gap-2">
                {getPolicyIcon(activePolicy.title)}
                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">{activePolicy.title}</h3>
              </div>
              <button
                onClick={() => setActivePolicy(null)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-650 transition-colors"
                title="Close modal"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto prose prose-slate max-w-none text-xs leading-relaxed space-y-4">
              {activePolicy.content.split("\n").map((line, lIdx) => {
                if (line.startsWith("# ")) {
                  return <h1 key={lIdx} className="text-lg font-serif font-bold text-slate-900 dark:text-white border-b pb-1 mt-4">{line.replace("# ", "")}</h1>;
                }
                if (line.startsWith("## ")) {
                  return <h2 key={lIdx} className="text-sm font-serif font-bold text-slate-800 dark:text-slate-250 mt-3">{line.replace("## ", "")}</h2>;
                }
                if (!line.trim()) return null;
                return <p key={lIdx} className="text-slate-655 dark:text-slate-400 font-medium">{line}</p>;
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex justify-end">
              <button
                onClick={() => setActivePolicy(null)}
                className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-850 dark:hover:bg-slate-700 text-white font-bold text-[10px] uppercase py-2 px-5 rounded-xl transition-all"
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
