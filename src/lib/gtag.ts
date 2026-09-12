// GA4 Conversion Tracking Utility (G-XZGBPF0HBR)
// Strictly enforces privacy: No PII (names, emails, phone numbers, raw message bodies) is ever sent.

export const GA_MEASUREMENT_ID = "G-XZGBPF0HBR";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Generic GA4 event emitter
 */
export function trackGaEvent(eventName: string, eventParams: Record<string, any> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      send_to: GA_MEASUREMENT_ID,
      ...eventParams,
    });
  }
}

/**
 * Tracks WhatsApp button/link clicks
 */
export function trackWhatsAppClick(serviceName?: string, pagePath?: string, location?: string) {
  trackGaEvent("whatsapp_click", {
    service_name: serviceName || "General",
    page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
    location: location || "header_cta",
  });
}

/**
 * Tracks Direct Phone Call clicks
 */
export function trackPhoneClick(pagePath?: string, location?: string) {
  trackGaEvent("phone_click", {
    page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
    location: location || "header_cta",
  });
}

/**
 * Tracks when a user starts interacting with the enquiry form
 */
export function trackContactFormStart(pagePath?: string) {
  trackGaEvent("contact_form_start", {
    page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

/**
 * Tracks successful enquiry form submission (No PII)
 */
export function trackContactFormSubmit(eventType?: string, serviceNeeded?: string, guestCount?: string | number, pagePath?: string) {
  trackGaEvent("contact_form_submit", {
    event_type: eventType || "Unspecified",
    service_needed: serviceNeeded || "Unspecified",
    guest_count: guestCount ? String(guestCount) : "Not specified",
    page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

/**
 * Tracks package quote or pricing request
 */
export function trackQuoteRequest(packageName?: string, price?: number | string, pagePath?: string) {
  trackGaEvent("quote_request", {
    package_name: packageName || "Custom Quote",
    value: price ? Number(price) || 0 : 0,
    currency: "INR",
    page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

/**
 * Tracks event booking clicks
 */
export function trackBookingClick(packageName?: string, serviceName?: string, pagePath?: string) {
  trackGaEvent("booking_click", {
    package_name: packageName || serviceName || "Event Booking",
    page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

/**
 * Tracks email contact clicks
 */
export function trackEmailClick(pagePath?: string) {
  trackGaEvent("email_click", {
    page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

/**
 * Tracks catering menu view or PDF downloads
 */
export function trackMenuView(category?: string, pagePath?: string) {
  trackGaEvent("menu_view", {
    category: category || "All Menus",
    page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

/**
 * Tracks service page views
 */
export function trackServiceView(serviceName?: string, pagePath?: string) {
  trackGaEvent("service_view", {
    service_name: serviceName || "General Services",
    page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

/**
 * Tracks gallery interactions (album click, image expand)
 */
export function trackGalleryInteraction(albumTitle?: string, category?: string, action?: string) {
  trackGaEvent("gallery_interaction", {
    album_title: albumTitle || "General",
    category: category || "Portfolio",
    action: action || "view",
  });
}
