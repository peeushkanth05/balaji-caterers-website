import React from "react";
import { ShieldCheck, Award } from "lucide-react";
import { BUSINESS_CONFIG, isOwnerValueSet } from "@/lib/config";

export function TrustStrip() {
  const hasFssai = isOwnerValueSet(BUSINESS_CONFIG.fssaiNumber);
  const hasGstin = isOwnerValueSet(BUSINESS_CONFIG.gstin);

  // Hard rule: Hide strip until real values are provided by the owner
  if (!hasFssai && !hasGstin) {
    return null;
  }

  return (
    <div className="py-3 px-4 bg-amber-500/5 dark:bg-amber-950/20 border-y border-amber-500/20 my-6 rounded-2xl flex flex-wrap items-center justify-center gap-6 text-xs text-slate-700 dark:text-slate-300 font-medium">
      {hasFssai && (
        <div className="inline-flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>FSSAI Lic. No. <strong>{BUSINESS_CONFIG.fssaiNumber}</strong></span>
        </div>
      )}
      {hasGstin && (
        <div className="inline-flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>GSTIN <strong>{BUSINESS_CONFIG.gstin}</strong></span>
        </div>
      )}
    </div>
  );
}

export function GoogleReviewsBadge() {
  const hasGbp = isOwnerValueSet(BUSINESS_CONFIG.googleBusinessProfileUrl);
  if (!hasGbp) return null;

  return (
    <a
      href={BUSINESS_CONFIG.googleBusinessProfileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-amber-500 transition-colors shadow-xs"
      aria-label="Read our verified reviews on Google"
    >
      <span className="text-amber-500 font-bold">★ 5.0</span>
      <span>Read our reviews on Google</span>
    </a>
  );
}
