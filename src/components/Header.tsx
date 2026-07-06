"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu as MenuIcon,
  X,
  Phone,
  Mail,
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  MessageCircle,
  Share2,
} from "lucide-react";
import { AlertTickerMarquee } from "./AlertTickerMarquee";

interface Submenu {
  id: string;
  label: string;
  link: string;
}

interface Menu {
  id: string;
  label: string;
  link: string;
  submenus: Submenu[];
}

interface HeaderAction {
  id: string;
  label: string;
  link: string;
  style: string;
  active: boolean;
}

interface HeaderSettings {
  stickyHeader: boolean;
  topBarActive: boolean;
  topBarText: string;
  showSocials: boolean;
  showContact: boolean;
}

interface SiteSettings {
  companyName: string;
  logoUrl: string;
  phone: string;
  email: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
}

export function Header() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<HeaderSettings | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [actions, setActions] = useState<HeaderAction[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  // Mobile menu states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdownMenuId, setActiveDropdownMenuId] = useState<string | null>(null);

  // Scroll listener for sticky header background change
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const res = await fetch("/api/header");
        const data = await res.json();
        if (data.settings) setSettings(data.settings);
        if (data.menus) setMenus(data.menus);
        if (data.actions) setActions(data.actions);
        if (data.siteSettings) setSiteSettings(data.siteSettings);
        if (data.socialLinks) setSocialLinks(data.socialLinks);
      } catch (e) {
        console.error("Failed to load header navigation", e);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-white h-20 border-b border-slate-100 flex items-center justify-between px-6 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 rounded-full" />
          <div className="space-y-1">
            <div className="w-24 h-4 bg-slate-200 rounded" />
            <div className="w-16 h-3 bg-slate-200 rounded" />
          </div>
        </div>
        <div className="hidden md:flex gap-6">
          <div className="w-16 h-4 bg-slate-200 rounded" />
          <div className="w-16 h-4 bg-slate-200 rounded" />
          <div className="w-16 h-4 bg-slate-200 rounded" />
        </div>
        <div className="w-20 h-8 bg-slate-200 rounded-lg" />
      </div>
    );
  }

  const company = siteSettings?.companyName || "Shree Balaji Caterers";
  const logo = siteSettings?.logoUrl || "/new-logo.png";
  const phoneVal = siteSettings?.phone || "+91 98104 83544";
  const emailVal = siteSettings?.email || "vermasandeep124@gmail.com";

  // Actions Filter
  const activeActions = actions.filter((a) => a.active);

  const stickyClass = settings?.stickyHeader ? "sticky top-0 z-40" : "relative z-40";

  return (
    <div className={`${stickyClass} w-full transition-all`}>
      {/* Alert Announcement Ticker */}
      <AlertTickerMarquee />

      {/* Top Bar Announcement */}
      {settings?.topBarActive && (
        <div className="bg-slate-950 text-white py-2 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-bold tracking-wider uppercase border-b border-white/5">
          <div className="text-center sm:text-left flex-1">
            ✨ {settings.topBarText}
          </div>

          <div className="flex items-center gap-6">
            {/* Contact details */}
            {settings.showContact && (
              <div className="hidden md:flex items-center gap-4 text-slate-400">
                <a href={`tel:${phoneVal}`} className="hover:text-white flex items-center gap-1 transition-colors">
                  <Phone className="w-3 h-3 text-amber-500" /> {phoneVal}
                </a>
                <a href={`mailto:${emailVal}`} className="hover:text-white flex items-center gap-1 transition-colors">
                  <Mail className="w-3 h-3 text-amber-500" /> {emailVal}
                </a>
              </div>
            )}

            {/* Social profiles */}
            {settings.showSocials && (
              <div className="flex items-center gap-3 text-slate-400">
                {socialLinks.length > 0 ? (
                  socialLinks.map((link) => {
                    const getPlatformIcon = (plat: string) => {
                      switch (plat.toLowerCase()) {
                        case "facebook": return <Facebook className="w-3.5 h-3.5" />;
                        case "instagram": return <Instagram className="w-3.5 h-3.5" />;
                        case "youtube": return <Youtube className="w-3.5 h-3.5" />;
                        case "linkedin": return <Linkedin className="w-3.5 h-3.5" />;
                        case "x":
                        case "twitter": return <Twitter className="w-3.5 h-3.5" />;
                        case "whatsapp": return <MessageCircle className="w-3.5 h-3.5" />;
                        default: return <Share2 className="w-3.5 h-3.5" />;
                      }
                    };
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        title={link.platform}
                      >
                        {getPlatformIcon(link.platform)}
                      </a>
                    );
                  })
                ) : (
                  <>
                    {siteSettings?.facebookUrl && (
                      <a href={siteSettings.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                        <Facebook className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {siteSettings?.instagramUrl && (
                      <a href={siteSettings.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {siteSettings?.youtubeUrl && (
                      <a href={siteSettings.youtubeUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                        <Youtube className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {siteSettings?.twitterUrl && (
                      <a href={siteSettings.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled || !settings?.stickyHeader ? "bg-white/95 backdrop-blur-md shadow-md h-20 border-b border-amber-500/10" : "bg-white/90 backdrop-blur-sm h-20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-amber-500/20 bg-white">
              <Image
                src={logo}
                alt={company}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-slate-900 leading-tight block">
                {company.split(" ")[0]} {company.split(" ")[1] || ""}
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-amber-600 block">
                {company.split(" ").slice(2).join(" ") || "Caterers & Events"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Structure */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-700">
            {menus.map((menu) => {
              const hasSubmenus = menu.submenus && menu.submenus.length > 0;
              if (hasSubmenus) {
                return (
                  <div key={menu.id} className="relative group py-2">
                    <button className="hover:text-amber-600 transition-colors flex items-center gap-1 font-semibold text-slate-700">
                      {menu.label} <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
                    </button>
                    {/* Hover Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl p-2 hidden group-hover:flex flex-col gap-1 z-50">
                      {menu.submenus.map((sub) => (
                        <a
                          key={sub.id}
                          href={sub.link}
                          className="px-3.5 py-2 hover:bg-amber-50 rounded-xl text-slate-700 hover:text-amber-600 text-xs transition-colors font-medium"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <a key={menu.id} href={menu.link} className="hover:text-amber-600 transition-colors">
                  {menu.label}
                </a>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            {activeActions.map((act) => {
              const styleClass =
                act.style === "primary"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-500/20"
                  : act.style === "outline"
                  ? "border-2 border-amber-500 hover:bg-amber-50 text-amber-600"
                  : "bg-slate-900 hover:bg-slate-800 text-white";

              return (
                <a
                  key={act.id}
                  href={act.link}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${styleClass}`}
                >
                  {act.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Hamburguer menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600 md:hidden transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer menu overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full inset-x-0 bg-white border-b border-slate-200 shadow-xl p-6 md:hidden flex flex-col gap-6 z-30 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-4 font-semibold text-slate-800">
            {menus.map((menu) => {
              const hasSubmenus = menu.submenus && menu.submenus.length > 0;
              const isDropOpen = activeDropdownMenuId === menu.id;

              if (hasSubmenus) {
                return (
                  <div key={menu.id} className="flex flex-col gap-2">
                    <button
                      onClick={() => setActiveDropdownMenuId(isDropOpen ? null : menu.id)}
                      className="flex items-center justify-between text-left hover:text-amber-600 transition-colors w-full"
                    >
                      <span>{menu.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isDropOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isDropOpen && (
                      <div className="pl-4 border-l border-slate-200 flex flex-col gap-3 py-1 text-slate-600 text-xs">
                        {menu.submenus.map((sub) => (
                          <a
                            key={sub.id}
                            href={sub.link}
                            onClick={() => setMobileMenuOpen(false)}
                            className="hover:text-amber-600 transition-colors"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={menu.id}
                  href={menu.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors py-1"
                >
                  {menu.label}
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
            {activeActions.map((act) => (
              <a
                key={act.id}
                href={act.link}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full py-3 rounded-xl text-center text-xs font-bold shadow-sm ${
                  act.style === "primary"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    : act.style === "outline"
                    ? "border border-amber-500 text-amber-600"
                    : "bg-slate-900 text-white"
                }`}
              >
                {act.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
