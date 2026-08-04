"use client";

import { useEffect, useState } from "react";
import { Cookie, X, Check, Shield } from "lucide-react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  useEffect(() => {
    // Check saved cookie consent and 365-day expiry
    const savedConsent = localStorage.getItem("verma_cookie_consent");
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        const consentDate = parsed.timestamp || 0;
        const oneYearMs = 365 * 24 * 60 * 60 * 1000;
        
        if (Date.now() - consentDate > oneYearMs) {
          // Consent expired after 365 days -> show banner again
          setShow(true);
        }
      } catch (e) {
        setShow(true);
      }
    } else {
      // Show banner after brief delay
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }

    // Listen for custom trigger event from Footer/Menu to reopen preferences
    const handleReopen = () => {
      setIsCustomizing(true);
      setShow(true);
    };

    window.addEventListener("open-cookie-preferences", handleReopen);
    return () => window.removeEventListener("open-cookie-preferences", handleReopen);
  }, []);

  const saveConsent = async (whatsapp: boolean, marketing: boolean, analytics: boolean) => {
    const consentRecord = {
      privacyConsent: true,
      whatsappConsent: whatsapp,
      marketingConsent: marketing,
      analyticsConsent: analytics,
      timestamp: Date.now(),
      expiryDays: 365,
    };

    localStorage.setItem("verma_cookie_consent", JSON.stringify(consentRecord));
    setShow(false);
    setIsCustomizing(false);

    try {
      await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consentRecord),
      });
    } catch (e) {
      // Silent error handling
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl shadow-slate-950/20 z-50 animate-slide-up flex flex-col gap-4 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex-shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-slate-900 dark:text-white text-base">Cookie Preferences</h4>
            <p className="text-[11px] text-slate-400 dark:text-slate-400">Manage your privacy settings</p>
          </div>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Close preferences"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
        We use essential cookies to ensure our website functions smoothly, and optional cookies to personalize your booking experience and event updates.
      </p>

      {/* Preferences Customizer Toggle */}
      {isCustomizing ? (
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" /> Essential Cookies
              </p>
              <p className="text-[10px] text-slate-400">Required for website features and security.</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">Always Active</span>
          </div>

          <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">WhatsApp Event Updates</p>
              <p className="text-[10px] text-slate-400">Receive package quotes and booking alerts on WhatsApp.</p>
            </div>
            <input
              type="checkbox"
              checked={whatsappConsent}
              onChange={(e) => setWhatsappConsent(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded focus:ring-amber-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Analytics & Performance</p>
              <p className="text-[10px] text-slate-400">Helps us improve service speed and menu choices.</p>
            </div>
            <input
              type="checkbox"
              checked={analyticsConsent}
              onChange={(e) => setAnalyticsConsent(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded focus:ring-amber-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Marketing & Promotions</p>
              <p className="text-[10px] text-slate-400">Receive seasonal menu offers and discounts.</p>
            </div>
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded focus:ring-amber-500 cursor-pointer"
            />
          </label>
        </div>
      ) : null}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        {isCustomizing ? (
          <button
            onClick={() => saveConsent(whatsappConsent, marketingConsent, analyticsConsent)}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs py-2.5 px-4 rounded-2xl transition-all shadow-md shadow-amber-500/20 text-center flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Save Preferences
          </button>
        ) : (
          <>
            <button
              onClick={() => saveConsent(false, false, false)}
              className="px-3 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all"
            >
              Reject All
            </button>
            <button
              onClick={() => setIsCustomizing(true)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all"
            >
              Customize
            </button>
            <button
              onClick={() => saveConsent(true, true, true)}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs py-2.5 px-4 rounded-2xl transition-all shadow-md shadow-amber-500/20 text-center"
            >
              Accept All
            </button>
          </>
        )}
      </div>
    </div>
  );
}
