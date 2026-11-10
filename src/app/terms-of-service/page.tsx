import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scale, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Verma Caterers & Events Delhi NCR",
  description:
    "Terms of Service for Verma Caterers & Events. Review our booking policy, guest count finalization, payment schedules, and cancellation terms in Delhi NCR.",
  alternates: {
    canonical: "https://vermacaterersevents.com/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Verma Caterers & Events Delhi NCR",
    description:
      "Terms of Service governing catering, floral décor, DJ sound setups, and event management bookings across Delhi NCR.",
    url: "https://vermacaterersevents.com/terms-of-service",
    siteName: "Verma Caterers & Events",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-slate-950 text-[#111827] dark:text-slate-100 flex flex-col transition-colors">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Terms of Service</span>
          </nav>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Scale className="w-3.5 h-3.5" /> Client Agreement
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Terms of Service
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Effective Date: January 1, 2026
              </p>
            </div>

            <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              <p>
                Welcome to <strong>Verma Caterers &amp; Events</strong> (owned and operated by Sandeep Verma). By contracting our wedding catering, birthday celebration, corporate party, floral decoration, sound and DJ setup, cooler rental, or complete event management services across Delhi NCR, you agree to comply with the terms and conditions outlined below.
              </p>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">
                1. Event Booking &amp; Advance Confirmation
              </h2>
              <p>
                All catering and event bookings require an advance token deposit to lock in calendar dates, secure culinary staff, and lock in raw ingredient rates. The reservation is considered confirmed only upon mutual agreement on the initial proposal and receipt of the booking advance.
              </p>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">
                2. Guest Count &amp; Menu Finalization
              </h2>
              <p>
                To maintain the highest hygiene, culinary quality, and fresh food preparation standards:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Final guaranteed guest counts must be confirmed at least 48 hours prior to the function date.</li>
                <li>Billing is calculated based on the guaranteed guest count or the actual guest count served, whichever is greater.</li>
                <li>Custom live counters, fusion stalls, and special menu adjustments should be finalized during the planning consultation.</li>
              </ul>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">
                3. Payment Schedule
              </h2>
              <p>
                Payment milestones are structured transparently:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Booking deposit upon contract signing.</li>
                <li>Intermediate payment prior to event commencement to fund vendor procurements (produce, dairy, floral inventory).</li>
                <li>Final settlement upon successful execution of the event on the same day.</li>
              </ul>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">
                4. Cancellation &amp; Rescheduling Policy
              </h2>
              <p>
                If an event must be rescheduled or cancelled due to unforeseen circumstances or emergencies, the host must notify Sandeep Verma as early as possible. While we make every effort to accommodate alternate dates without penalties, costs incurred for perishable supplies, non-refundable venue deposits, or customized decor setups already fabricated may be deducted from the advance.
              </p>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">
                5. Contact &amp; Grievance Redressal
              </h2>
              <p>
                For questions regarding contracts, bespoke agreements, or invoice settlements, please reach out directly:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2.5 text-xs sm:text-sm">
                <p className="font-bold text-slate-900 dark:text-white text-base">Verma Caterers &amp; Events</p>
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Dwarka Sector 5, Madhu Vihar, New Delhi, Delhi 110059</span>
                </p>
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <a href="tel:+919810483544" className="hover:text-amber-700 font-semibold">+91 98104 83544</a>
                </p>
                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <a href="mailto:vermasandeep124@gmail.com" className="hover:text-amber-700 font-semibold">vermasandeep124@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}