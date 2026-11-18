import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation Policy | Verma Caterers & Events",
  description:
    "Event cancellation windows, schedule modifications, and fee schedules for Verma Caterers & Events in Delhi NCR.",
  alternates: {
    canonical: "https://vermacaterersevents.com/cancellation-policy",
  },
};

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-24 sm:py-28 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Policies</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Cancellation Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            We recognize that unforeseen circumstances may necessitate event cancellations or postponement. Because our event operations involve locking team schedules, reserving specialist equipment, and pre-sourcing fresh ingredients, the following cancellation terms apply:
          </p>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Cancellation Timelines</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Early Notice (30+ days prior):</strong> Booking may be cancelled with {'{{OWNER: early cancellation fee %, e.g. 25%}}'} retention for administrative holding.
              </li>
              <li>
                <strong>Standard Notice (15 to 29 days prior):</strong> Subject to a {'{{OWNER: standard cancellation fee %, e.g. 50%}}'} cancellation fee.
              </li>
              <li>
                <strong>Late Notice (Under 14 days prior):</strong> The full advance is non-refundable.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Weather & Force Majeure</h2>
            <p>
              In case of government-mandated lockdowns or natural disasters, booking deposits can be transferred entirely to an alternate date within 12 months without financial penalty.
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
