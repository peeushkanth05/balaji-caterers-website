import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShieldCheck, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Verma Caterers & Events Delhi NCR",
  description:
    "Privacy Policy for Verma Caterers and Events owned by Sandeep Verma. Learn how we handle and protect your personal data for catering and event inquiries in Delhi NCR.",
  alternates: {
    canonical: "https://vermacaterersevents.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Verma Caterers & Events Delhi NCR",
    description:
      "Privacy Policy for Verma Caterers and Events owned by Sandeep Verma. Learn how we handle your personal data for catering and event inquiries.",
    url: "https://vermacaterersevents.com/privacy-policy",
    siteName: "Verma Caterers & Events",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-slate-950 text-[#111827] dark:text-slate-100 flex flex-col transition-colors">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Privacy Policy</span>
          </nav>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" /> Legal & Transparency
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Effective Date: January 1, 2026
              </p>
            </div>

            <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              <p>
                At <strong>Verma Caterers &amp; Events</strong> (operated and managed by Sandeep Verma), we are committed to respecting and protecting the privacy of our clients, event hosts, and website visitors. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit <a href="https://vermacaterersevents.com" className="text-amber-700 dark:text-amber-400 underline font-medium">vermacaterersevents.com</a> or submit an inquiry for wedding catering, party catering, and event planning services across Delhi NCR.
              </p>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">
                1. Information We Collect
              </h2>
              <p>
                We collect personal information that you voluntarily provide when requesting a catering quote, customizing a package menu, or communicating with us via phone, web forms, or WhatsApp. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Full Name</li>
                <li>Phone Number / WhatsApp Number</li>
                <li>Email Address</li>
                <li>Event Type, Tentative Date, Venue Location, and Expected Guest Count</li>
                <li>Dietary preferences (e.g. Pure Vegetarian, Satvik, Jain, Multi-Cuisine)</li>
              </ul>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">
                2. How We Use Your Information
              </h2>
              <p>
                Your personal details are used exclusively to deliver exceptional event experiences:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Generating custom catering quotes and menu proposals</li>
                <li>Coordinating culinary tasting sessions and event logistics</li>
                <li>Sending timely event booking confirmations via WhatsApp or phone</li>
                <li>Responding promptly to customer service requests</li>
              </ul>
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                We strictly do not sell, rent, trade, or distribute your personal contact details to external advertising networks or data brokers.
              </p>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">
                3. Cookies, Analytics &amp; Privacy Safeguards
              </h2>
              <p>
                We use privacy-focused analytics tools (such as Google Analytics 4) to monitor overall website performance and user experience. No personally identifiable information (PII) such as full names, contact numbers, or message contents is ever transmitted to analytics services. You can adjust your cookie settings at any time via our Cookie Preferences banner.
              </p>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4">
                4. Contact Information
              </h2>
              <p>
                For any privacy questions or data update requests, please contact Sandeep Verma directly:
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