import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { BUSINESS_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms and Conditions | Verma Caterers & Events",
  description:
    "Terms and conditions for event catering bookings, menu customization, guest counts, and service delivery by Verma Caterers & Events in Delhi NCR.",
  alternates: {
    canonical: "https://vermacaterersevents.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-24 sm:py-28 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Legal Agreement</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-500 mt-2">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Quotations & Confirmations</h2>
            <p>
              All quotations issued by {BUSINESS_CONFIG.businessName} are valid for {'{{OWNER: quote validity days, e.g. 15}}'} days from the date of issue. Bookings are considered officially confirmed only upon receipt of the agreed advance payment and signed confirmation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Guest Count & Menu Finalization</h2>
            <p>
              Final guaranteed guest counts must be submitted at least {'{{OWNER: guest count lock days, e.g. 5}}'} days prior to the event date. In the event of additional attendees exceeding the confirmed count, extra plates will be charged on a pro-rata basis at the agreed per-plate rate.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Venue Requirements</h2>
            <p>
              The host or venue manager must provide adequate kitchen space, uninterrupted potable water supply, and electrical connections necessary for live food stations and buffet warming setups.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Menu Alterations</h2>
            <p>
              Menu adjustments and culinary customizations may be accommodated up to {'{{OWNER: menu lock days, e.g. 7}}'} days prior to the event, subject to seasonal market availability.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">5. Governing Law</h2>
            <p>
              Any disputes arising under or in connection with event catering contracts shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
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
