// Utility to capture, persist across navigation, and retrieve marketing attribution safely without PII

export interface LeadAttribution {
  sourcePage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

const STORAGE_KEY = "verma_lead_attribution";

/**
 * Initializes and captures UTM parameters from current URL on landing,
 * and caches them in sessionStorage so internal page navigation preserves the original campaign.
 */
export function captureLandingAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");
    const utmCampaign = urlParams.get("utm_campaign");
    const utmTerm = urlParams.get("utm_term");
    const utmContent = urlParams.get("utm_content");

    // Only update if UTMs exist in current URL, or if not yet stored
    const existingRaw = window.sessionStorage.getItem(STORAGE_KEY);
    const existing: LeadAttribution = existingRaw ? JSON.parse(existingRaw) : {};

    const updated: LeadAttribution = {
      ...existing,
      referrer: existing.referrer || (document.referrer ? document.referrer.slice(0, 255) : "direct"),
      utmSource: utmSource ? utmSource.slice(0, 100) : existing.utmSource,
      utmMedium: utmMedium ? utmMedium.slice(0, 100) : existing.utmMedium,
      utmCampaign: utmCampaign ? utmCampaign.slice(0, 100) : existing.utmCampaign,
      utmTerm: utmTerm ? utmTerm.slice(0, 100) : existing.utmTerm,
      utmContent: utmContent ? utmContent.slice(0, 100) : existing.utmContent,
    };

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    // Graceful fallback for restricted storage environments
  }
}

/**
 * Retrieves the full attribution payload for a lead submission, combining
 * the initial landing referrer & UTMs with the current active submission page.
 */
export function getLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const stored: LeadAttribution = raw ? JSON.parse(raw) : {};

    return {
      sourcePage: window.location.pathname ? window.location.pathname.slice(0, 255) : "/",
      referrer: stored.referrer || (document.referrer ? document.referrer.slice(0, 255) : "direct"),
      utmSource: stored.utmSource || undefined,
      utmMedium: stored.utmMedium || undefined,
      utmCampaign: stored.utmCampaign || undefined,
      utmTerm: stored.utmTerm || undefined,
      utmContent: stored.utmContent || undefined,
    };
  } catch (e) {
    return {
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "/",
    };
  }
}

