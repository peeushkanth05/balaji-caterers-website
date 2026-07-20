"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  UtensilsCrossed,
  HeartHandshake,
  CalendarDays,
  Music4,
  Smile,
} from "lucide-react";
import { AlertTickerMarquee } from "./AlertTickerMarquee";

interface HeaderSettings {
  stickyHeader: boolean;
  topBarActive: boolean;
  topBarText: string;
  showSocials: boolean;
  showContact: boolean;
}

interface Menu {
  id: string;
  label: string;
  link: string;
  displayOrder: number;
  isServicesDropdown: boolean;
  submenus: Submenu[];
}

interface Submenu {
  id: string;
  menuId: string;
  label: string;
  link: string;
  displayOrder: number;
}

interface HeaderAction {
  id: string;
  label: string;
  link: string;
  style: string;
  active: boolean;
  displayOrder: number;
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
  enableThemeToggle?: boolean;
  defaultTheme?: string;
}

export function Header() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<HeaderSettings | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [actions, setActions] = useState<HeaderAction[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Dynamic active services fetched to populate Mega Menu
  const [dbServices, setDbServices] = useState<any[]>([]);

  // Mobile menu states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdownMenuId, setActiveDropdownMenuId] = useState<string | null>(null);

  // Scroll offset state
  const [scrolled, setScrolled] = useState(false);

  // Mega Menu state
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

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

        // Fetch services database directly for descriptive Mega Menu
        const servRes = await fetch("/api/services");
        const servData = await servRes.json();
        if (servData.services) setDbServices(servData.services);

        // Theme management
        let initialTheme = localStorage.getItem("verma_theme") as "light" | "dark" | null;
        if (!initialTheme && data.siteSettings) {
          initialTheme = (data.siteSettings.defaultTheme || "light") as "light" | "dark";
        }
        const activeTheme = initialTheme || "light";
        setTheme(activeTheme);
        if (activeTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
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

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("verma_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "🍽️":
      case "Catering":
        return <UtensilsCrossed className="w-5 h-5 text-amber-500" />;
      case "🌸":
      case "Decor":
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case "📢":
      case "Sound":
        return <Music4 className="w-5 h-5 text-amber-500" />;
      case "🎉":
      case "Management":
        return <HeartHandshake className="w-5 h-5 text-amber-500" />;
      default:
        return <Smile className="w-5 h-5 text-amber-500" />;
    }
  };

  // Divide services into groups for the Mega Menu
  const cateringServices = dbServices.filter((s) =>
    s.title.toLowerCase().includes("cater") || s.title.toLowerCase().includes("menu")
  );
  const decorAndSound = dbServices.filter((s) =>
    s.title.toLowerCase().includes("floral") || s.title.toLowerCase().includes("decor") || s.title.toLowerCase().includes("sound") || s.title.toLowerCase().includes("dj")
  );
  const rentalsAndManagement = dbServices.filter((s) =>
    !cateringServices.includes(s) && !decorAndSound.includes(s)
  );

  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-slate-950 h-20 border-b border-slate-100 dark:border-slate-800/40 flex items-center justify-between px-6 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="space-y-1">
            <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="w-16 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
        <div className="hidden md:flex gap-6">
          <div className="w-16 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="w-16 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="w-16 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
        <div className="w-20 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>
    );
  }

  const company = siteSettings?.companyName || "Verma Caterers";
  const logo = siteSettings?.logoUrl || "/new-logo.png";
  const phoneVal = siteSettings?.phone || "+91 98104 83544";
  const emailVal = siteSettings?.email || "vermasandeep124@gmail.com";

  // Actions filter (Active status)
  const activeActions = actions.filter((a) => a.active);

  const stickyClass = settings?.stickyHeader ? "sticky top-0 z-40" : "relative z-40";

  return (
    <div className={`${stickyClass} w-full transition-all`}>
      {/* Alert Announcement Ticker */}
      <AlertTickerMarquee />

      {/* Top Bar Announcement */}
      {settings?.topBarActive && (
        <div className="bg-slate-950 text-white py-2 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-bold tracking-wider uppercase border-b border-white/5 transition-all">
          <div className="text-center sm:text-left flex-1 text-slate-300">
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
                {socialLinks.map((link) => {
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
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled || !settings?.stickyHeader
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg h-16 border-b border-amber-500/10"
            : "bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm h-20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Logo Branding */}
          <Link href="/" aria-label="Verma Caterers Logo" className="flex items-center group py-1">
            <div className="relative w-[150px] sm:w-[170px] md:w-[190px] lg:w-[220px] max-h-[42px] sm:max-h-[46px] md:max-h-[50px] lg:max-h-[56px] h-12 flex items-center justify-start transition-transform group-hover:scale-[1.02]">
              {/* Light Mode Logo */}
              <Image
                src="/verma-logo-light.png"
                alt="Verma Caterers Logo"
                width={220}
                height={56}
                priority
                className="w-full h-full object-contain dark:hidden"
              />
              {/* Dark Mode Logo */}
              <Image
                src="/verma-logo-dark.png"
                alt="Verma Caterers Logo"
                width={220}
                height={56}
                priority
                className="w-full h-full object-contain hidden dark:block"
              />
            </div>
          </Link>

          {/* Desktop Nav Structure */}
          <div className="hidden md:flex items-center gap-8 font-serif text-sm font-semibold text-slate-800 dark:text-slate-200">
            {menus.map((menu) => {
              const isServices = menu.isServicesDropdown;
              
              if (isServices) {
                return (
                  <div
                    key={menu.id}
                    className="relative py-2 cursor-pointer"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    <button className="hover:text-amber-500 transition-colors flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                      {menu.label}
                      <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${megaMenuOpen ? "rotate-180 text-amber-500" : ""}`} />
                    </button>

                    {/* Mega Menu Dropdown Container */}
                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.25 }}
                          className="fixed left-0 right-0 top-[60px] md:top-[80px] w-screen bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-y border-slate-200/60 dark:border-slate-800/40 shadow-2xl p-8 z-50 transition-colors"
                        >
                          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
                            
                            {/* Column 1: Core Catering */}
                            <div className="md:col-span-3 space-y-4">
                              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 border-b border-slate-100 dark:border-slate-850 pb-2">
                                🍽️ Gourmet Catering
                              </h4>
                              <ul className="space-y-3">
                                {cateringServices.map((ser) => (
                                  <li key={ser.id} className="group/item">
                                    <Link href="/#services" className="block text-left">
                                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover/item:text-amber-500 transition-colors flex items-center gap-1.5">
                                        {getServiceIcon(ser.icon)} {ser.title}
                                      </span>
                                      <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 leading-relaxed">
                                        {ser.description}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Column 2: Floral decor & Sound production */}
                            <div className="md:col-span-3 space-y-4">
                              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 border-b border-slate-100 dark:border-slate-850 pb-2">
                                ✨ Design & Decor
                              </h4>
                              <ul className="space-y-3">
                                {decorAndSound.map((ser) => (
                                  <li key={ser.id} className="group/item">
                                    <Link href="/#services" className="block text-left">
                                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover/item:text-amber-500 transition-colors flex items-center gap-1.5">
                                        {getServiceIcon(ser.icon)} {ser.title}
                                      </span>
                                      <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 leading-relaxed">
                                        {ser.description}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Column 3: Rentals & management */}
                            <div className="md:col-span-3 space-y-4">
                              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 border-b border-slate-100 dark:border-slate-850 pb-2">
                                🤝 Event Management
                              </h4>
                              <ul className="space-y-3">
                                {rentalsAndManagement.map((ser) => (
                                  <li key={ser.id} className="group/item">
                                    <Link href="/#services" className="block text-left">
                                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover/item:text-amber-500 transition-colors flex items-center gap-1.5">
                                        {getServiceIcon(ser.icon)} {ser.title}
                                      </span>
                                      <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 leading-relaxed">
                                        {ser.description}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Column 4: Premium Featured Promo Banner card */}
                            <div className="md:col-span-3 bg-slate-50 dark:bg-slate-850/80 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/40 flex flex-col justify-between space-y-3">
                              <div className="relative h-28 rounded-xl overflow-hidden shadow-sm">
                                <Image
                                  src="/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg"
                                  alt="Premium Catering Setup"
                                  fill
                                  sizes="200px"
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <span className="absolute bottom-2 left-2 bg-amber-500 text-white font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded">
                                  Verma Special
                                </span>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Tailormade Royal Buffets</h5>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                                  From regional Indian specialties to premium global fusion stations.
                                </p>
                              </div>
                              <Link
                                href="/packages"
                                className="inline-flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-500 hover:text-amber-600 transition-colors"
                              >
                                View Packages <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={menu.id}
                  href={menu.link}
                  className="relative group text-slate-800 dark:text-slate-200 hover:text-amber-500 transition-colors font-bold"
                >
                  <span>{menu.label}</span>
                  <span className={`absolute bottom-[-4px] left-0 h-[2px] bg-amber-500 transition-all duration-300 ${
                    pathname === menu.link ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </a>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            {activeActions.slice(0, 2).map((act, idx) => {
              const isPrimary = act.style === "primary" || idx === 0;
              const styleClass = isPrimary
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-500/20 active:scale-95"
                : "border border-amber-500/30 text-amber-600 hover:bg-amber-500/10 dark:text-amber-400 active:scale-95";

              return (
                <a
                  key={act.id}
                  href={act.link}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all relative overflow-hidden group/btn ${styleClass}`}
                >
                  {isPrimary && (
                    <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  )}
                  <span>{act.label}</span>
                </a>
              );
            })}

            {/* Premium slider theme toggle */}
            {siteSettings?.enableThemeToggle && (
              <button
                onClick={toggleTheme}
                className="w-14 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 p-0.5 relative transition-colors duration-300 flex items-center justify-between cursor-pointer"
                title={`Switch to ${theme === "light" ? "Dark" : "Light"} Theme`}
              >
                {/* Active switch sliding pill */}
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-6 h-6 rounded-full bg-amber-500 dark:bg-amber-400 absolute z-10"
                  style={{ left: theme === "light" ? "2px" : "30px" }}
                />
                
                <span className="pl-1.5 z-0 flex items-center justify-center">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                </span>
                <span className="pr-1.5 z-0 flex items-center justify-center">
                  <Moon className="w-3.5 h-3.5 text-slate-400 dark:text-amber-400" />
                </span>
              </button>
            )}
          </div>

          {/* Mobile Hamburguer menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 md:hidden transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full inset-x-0 bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-2xl p-6 md:hidden flex flex-col gap-6 z-30 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-4 font-serif text-slate-800 dark:text-slate-200">
              {menus.map((menu) => {
                const isServices = menu.isServicesDropdown;
                const isDropOpen = activeDropdownMenuId === menu.id;

                if (isServices) {
                  return (
                    <div key={menu.id} className="flex flex-col gap-2">
                      <button
                        onClick={() => setActiveDropdownMenuId(isDropOpen ? null : menu.id)}
                        className="flex items-center justify-between text-left hover:text-amber-500 transition-colors w-full font-bold"
                      >
                        <span>{menu.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropOpen ? "rotate-180 text-amber-500" : ""}`} />
                      </button>

                      {/* Dynamic mobile services accordion dropdown list */}
                      <AnimatePresence>
                        {isDropOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 border-l border-slate-100 dark:border-slate-800 flex flex-col gap-3 pt-2 pb-1"
                          >
                            {dbServices.map((ser) => (
                              <a
                                key={ser.id}
                                href="/#services"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1.5"
                              >
                                {getServiceIcon(ser.icon)} {ser.title}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <a
                    key={menu.id}
                    href={menu.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-amber-600 transition-colors py-1 font-bold"
                  >
                    {menu.label}
                  </a>
                );
              })}
            </div>

            {/* CTAs & Theme Switch at the bottom */}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              {activeActions.map((act) => (
                <a
                  key={act.id}
                  href={act.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-3 rounded-xl text-center text-xs font-bold shadow-sm ${
                    act.style === "primary"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "border border-amber-500/40 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {act.label}
                </a>
              ))}

              {siteSettings?.enableThemeToggle && (
                <button
                  onClick={() => {
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl text-center text-xs font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-2"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="w-4 h-4 text-slate-600" /> Switch to Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 text-amber-500" /> Switch to Light Mode
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
