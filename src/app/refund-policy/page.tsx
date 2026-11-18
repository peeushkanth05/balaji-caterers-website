import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { BUSINESS_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Refund Policy | Verma Caterers & Events",
  description:
    "Refund and advance payment policy for catering and event production bookings with Verma Caterers & Events in Delhi NCR.",
  alternates: {
    canonical: "https://vermacaterersevents.com/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-24 sm:py-28 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Payment Terms</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Refund Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Advance Payment Refunds</h2>
            <p>
              To confirm event dates and secure dedicated culinary and service staff, an advance deposit of {'{{OWNER: advance %}}'} is required upon booking.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Eligible Cancellation Timeframes</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Cancellations made more than {'{{OWNER: days for max refund, e.g. 30}}'} days prior to the event date receive a {'{{OWNER: refund %, e.g. 75%}}'} refund of the advance deposit.
              </li>
              <li>
                Cancellations made between {'{{OWNER: window start, e.g. 15}}'} and {'{{OWNER: window end, e.g. 30}}'} days prior to the event receive a {'{{OWNER: partial refund %, e.g. 50%}}'} refund of the advance.
              </li>
              <li>
                Cancellations made less than {'{{OWNER: cutoff days, e.g. 14}}'} days before the scheduled event are strictly non-refundable due to pre-purchased perishable supplies and reserved logistics.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Date Rescheduling</h2>
            <p>
              One date change is permitted at no penalty if requested at least {'{{OWNER: reschedule notice days, e.g. 21}}'} days before the event, subject to calendar availability.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Refund Processing Method</h2>
            <p>
              Approved refunds are credited back to the original source bank account within {'{{OWNER: refund processing days, e.g. 7-10}}'} business days.
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
