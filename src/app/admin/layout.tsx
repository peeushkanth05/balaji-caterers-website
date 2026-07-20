"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  Sparkles,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  LogOut,
  UserCheck,
  Menu,
  X,
  FolderKanban,
  Layers,
  ListOrdered,
  Video,
  MessageSquare,
  Megaphone,
  Share2,
  Mail,
  BarChart3,
  Database,
  Building2,
  BookOpen,
  HelpCircle,
  FileText,
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't wrap the login page with the admin sidebar layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (status === "unauthenticated" || !session) {
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    return null;
  }

  const userRole = (session?.user as any)?.role || "ADMIN";
  const userName = session?.user?.name || "Admin";

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, module: "dashboard" },
    { name: "Analytics & Reports", href: "/admin/reports", icon: BarChart3, module: "dashboard" },
    { name: "Section Manager", href: "/admin/sections", icon: ListOrdered, module: "homepageSections" },
    { name: "Hero Banner CMS", href: "/admin/hero", icon: Sparkles, module: "settings" },
    { name: "Portfolio CMS", href: "/admin/portfolio", icon: FolderKanban, module: "portfolio" },
    { name: "Portfolio Categories", href: "/admin/portfolio/categories", icon: Layers, module: "portfolio" },
    { name: "Leads & Enquiries", href: "/admin/leads", icon: Users, module: "enquiries" },
    { name: "Catering Packages", href: "/admin/packages", icon: UtensilsCrossed, module: "packages" },
    { name: "Services", href: "/admin/services", icon: Sparkles, module: "services" },
    { name: "Venue Partners", href: "/admin/venues", icon: Building2, module: "settings" },
    { name: "Client Logos", href: "/admin/clients", icon: Users, module: "settings" },
    { name: "FAQ Accordions", href: "/admin/faqs", icon: HelpCircle, module: "settings" },
    { name: "Blog Guides", href: "/admin/blogs", icon: BookOpen, module: "blogs" },
    { name: "Videos Gallery", href: "/admin/videos", icon: Video, module: "videos" },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare, module: "testimonials" },
    { name: "Alert Ticker", href: "/admin/alerts", icon: Megaphone, module: "settings" },
    { name: "Social Links", href: "/admin/social", icon: Share2, module: "settings" },
    { name: "Gallery Photos", href: "/admin/gallery", icon: ImageIcon, module: "gallery" },
    { name: "Ad Banners", href: "/admin/advertisements", icon: Megaphone, module: "settings" },
    { name: "Enquiry Form CMS", href: "/admin/contact", icon: Mail, module: "contact" },
    { name: "Footer CMS", href: "/admin/footer", icon: FileText, module: "settings" },
    { name: "Database Backup", href: "/admin/backup", icon: Database, module: "settings" },
    { name: "DPDP Consent Logs", href: "/admin/consent", icon: ShieldCheck, module: "settings" },
    { name: "Business Settings", href: "/admin/settings", icon: Settings, module: "settings" },
  ];

  const superAdminNavigation = [
    { name: "Staff & Role Management", href: "/admin/users", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Image
            src="/new-logo.png"
            alt="Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-serif font-bold text-lg">Verma Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between min-h-[calc(100vh-65px)] md:min-h-screen border-r border-slate-800`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="hidden md:flex items-center gap-3 p-6 border-b border-slate-800">
            <Image
              src="/new-logo.png"
              alt="Logo"
              width={44}
              height={44}
              className="rounded-full object-cover shadow-lg border border-amber-500/30"
            />
            <div>
              <h2 className="font-serif font-bold text-white text-base leading-tight">
                Verma Caterers
              </h2>
              <span className="text-xs text-amber-400 font-medium">Control Center</span>
            </div>
          </div>

          {/* User Badge */}
          <div className="p-4 mx-4 my-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                {userName.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{userName}</p>
                <div className="inline-flex items-center gap-1 mt-0.5">
                  {userRole === "SUPER_ADMIN" ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> SUPER ADMIN
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> ADMIN
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation Links */}
          <nav className="px-3 space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Main Menu
            </p>
            {(() => {
              const userPermissions = (session?.user as any)?.permissions || {};
              const visibleNavigation = navigation.filter((item) => {
                if (userRole === "SUPER_ADMIN") return true;
                const allowedActions = userPermissions[item.module] || [];
                return allowedActions.includes("view");
              });

              return visibleNavigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? "bg-amber-500 text-white font-semibold shadow-lg shadow-amber-500/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              });
            })()}

            {/* Super Admin Section */}
            {userRole === "SUPER_ADMIN" && (
              <>
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-amber-500/80 mt-6 mb-2">
                  Super Admin Only
                </p>
                {superAdminNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                        isActive
                          ? "bg-amber-500 text-white font-semibold shadow-lg shadow-amber-500/20"
                          : "text-amber-200/70 hover:text-amber-100 hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-amber-400" />
                      {item.name}
                    </Link>
                  );
                })}
              </>
            )}
          </nav>
        </div>

        {/* Logout Footer */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all font-medium text-sm"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
