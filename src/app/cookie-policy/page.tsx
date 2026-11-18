import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | Verma Caterers & Events",
  description:
    "Explanation of cookie usage, preferences, and tracking policy on Verma Caterers & Events.",
  alternates: {
    canonical: "https://vermacaterersevents.com/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-24 sm:py-28 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Privacy & Tracking</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Cookie Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device to ensure basic site navigation, remember your theme preference, and help us analyze aggregated website performance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Essential Cookies</h2>
            <p>
              These cookies are necessary for core security, session handling, and authentication in administrative interfaces. They cannot be disabled.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Analytics & Measurement (GA4)</h2>
            <p>
              With your explicit consent, we may collect anonymous website interaction statistics via Google Analytics 4 to understand which catering packages and locations interest visitors most. No direct personal identification is stored.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Managing Your Preferences</h2>
            <p>
              You may review or reset your cookie consent at any time by clicking the &ldquo;Cookie Preferences&rdquo; link in the website footer.
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
