import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home, UtensilsCrossed, Image as ImageIcon, Phone, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-24 text-center">
        <div className="space-y-6 max-w-lg mx-auto bg-slate-900/80 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Error 404
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Page Not Found</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The page or event service you are looking for does not exist or has been relocated. Let us help you find what you need:
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              <Home className="w-4 h-4 text-amber-400" /> Home
            </Link>
            <Link
              href="/packages"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-400" /> Packages
            </Link>
            <Link
              href="/gallery"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-amber-400" /> Gallery
            </Link>
            <Link
              href="/#contact"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" /> Contact Us
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <a
              href="https://wa.me/919810483544?text=Hi%2C%20I%20was%20browsing%20your%20website%20and%20need%20help%20with%20catering%20and%20events."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-900/30"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us Directly
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
