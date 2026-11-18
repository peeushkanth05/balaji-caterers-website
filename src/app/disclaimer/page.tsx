import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | Verma Caterers & Events",
  description:
    "Service representations, seasonal ingredient availability, and photography disclaimer for Verma Caterers & Events.",
  alternates: {
    canonical: "https://vermacaterersevents.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-24 sm:py-28 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Notice</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Disclaimer
          </h1>
          <p className="text-xs text-slate-500 mt-2">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Event Photography & Setups</h2>
            <p>
              All photographs and video clips displayed across this website represent authentic events executed by Verma Caterers & Events. Specific layout configurations, floral arrangements, and buffet presentations will vary depending on your venue size, selected color themes, and chosen packages.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Seasonal Ingredient Availability</h2>
            <p>
              Certain produce, fruits, vegetables, and exotic dessert garnishes are subject to agricultural seasonality. Verma Caterers reserves the right to substitute equivalent premium quality items with client consent if market availability warrants.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Pricing Estimates</h2>
            <p>
              Estimated pricing figures generated on this website serve as planning guides. Official contracts with final per-plate pricing will be formalized in writing based on actual menu selections, service staff requirements, and applicable taxes.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700">
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
