"use client";

import { usePathname } from "next/navigation";
import { Phone, MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/gtag";

interface MobileStickyBarProps {
  phone?: string;
  whatsapp?: string;
}

export function MobileStickyBar({
  phone = "+91 98104 83544",
  whatsapp = "919810483544",
}: MobileStickyBarProps) {
  const pathname = usePathname();

  // Hide on admin portal
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const cleanWa = (whatsapp || "919810483544").replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    "Hello Verma Caterers! I would like to get a quote for catering & event management."
  )}`;

  return (
    <aside
      aria-label="Quick contact bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 px-3 py-2 flex items-center justify-between gap-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <a
        href={`tel:${cleanPhone}`}
        aria-label="Call Verma Caterers"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm active:scale-95 transition-all text-center"
      >
        <Phone className="w-3.5 h-3.5 text-amber-400" />
        <span>Call Now</span>
      </a>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("mobile_sticky_bar")}
        aria-label="Chat with Verma Caterers on WhatsApp"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all text-center"
      >
        <MessageCircle className="w-3.5 h-3.5 text-white" />
        <span>WhatsApp</span>
      </a>
    </aside>
  );
}
