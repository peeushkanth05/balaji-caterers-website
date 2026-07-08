"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, X } from "lucide-react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("balaji_cookie_consent");
    if (!consent) {
      // Small timeout to feel natural
      const timer = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = async (all = false) => {
    const consentChoices = {
      privacyConsent: true,
      whatsappConsent: all ? true : whatsappConsent,
      marketingConsent: all ? true : marketingConsent,
    };

    localStorage.setItem("balaji_cookie_consent", JSON.stringify(consentChoices));
    setShow(false);

    try {
      await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consentChoices),
      });
    } catch (e) {
      console.error("Failed to post consent log:", e);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xl shadow-slate-900/10 z-50 animate-slide-up flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-slate-900 text-sm md:text-base">DPDP Consent Preferences</h4>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-slate-400 hover:text-slate-600 transition-colors"
          title="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-slate-500 text-xs leading-relaxed">
        We respect your data privacy. Essential cookies are loaded by default to keep the website active. Choose your update preferences below:
      </p>

      {/* Choices Checklist */}
      <div className="space-y-2">
        <label className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
          <input
            type="checkbox"
            checked={whatsappConsent}
            onChange={(e) => setWhatsappConsent(e.target.checked)}
            className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
          />
          <div className="text-left">
            <p className="text-[11px] font-bold text-slate-800">WhatsApp Event Updates</p>
            <p className="text-[9px] text-slate-400">Receive package quotes and booking alerts on WhatsApp.</p>
          </div>
        </label>

        <label className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
          />
          <div className="text-left">
            <p className="text-[11px] font-bold text-slate-800">Marketing & Promotions</p>
            <p className="text-[9px] text-slate-400">Receive monthly emails on seasonal menu discounts and new trends.</p>
          </div>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => handleAccept(false)}
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] uppercase py-2.5 rounded-xl transition-all"
        >
          Save Choices
        </button>
        <button
          onClick={() => handleAccept(true)}
          className="flex-1 bg-slate-950 hover:bg-slate-900 text-white font-bold text-[10px] uppercase py-2.5 rounded-xl transition-all shadow-sm"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
