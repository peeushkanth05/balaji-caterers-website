// Canonical business facts and configuration
// All values here are the single source of truth across the website.

export const BUSINESS_CONFIG = {
  businessName: "Verma Caterers & Events",
  owner: "Sandeep Verma",
  address: "Dwarka Sector 5, Madhu Vihar, New Delhi 110059",
  phoneDisplay: "+91 98104 83544",
  phoneTel: "tel:+919810483544",
  whatsappUrl: "https://wa.me/919810483544",
  publicEmail: "bookings@vermacaterersevents.com",
  canonicalServiceAreas: "Dwarka, West Delhi, South Delhi, Gurugram, Noida & Greater Noida (Delhi NCR)",
  serviceAreasList: [
    "Dwarka",
    "West Delhi",
    "South Delhi",
    "Gurugram",
    "Noida & Greater Noida",
  ],
  foodPositioning:
    "Veg and non-veg menus, with pure-veg, Jain and satvik options on request.",
  tagline: "Wedding & event caterers in Dwarka, serving Delhi NCR",
  experienceStats: [
    { label: "Years of Experience", value: "15+" },
    { label: "Successful Events", value: "500+" },
    { label: "Happy Families", value: "1,000+" },
  ],
  // Owner provided verification placeholders (empty or placeholder values are not rendered)
  fssaiNumber: "{{OWNER: FSSAI licence number}}",
  gstin: "{{OWNER: GSTIN or remove}}",
  googleBusinessProfileUrl: "https://g.page/r/CYDtkWSK2D7TEBI/review",
  socialLinks: {
    instagram: "{{OWNER: Instagram URL}}",
    facebook: "{{OWNER: Facebook URL}}",
    youtube: "{{OWNER: YouTube URL or none}}",
  },
  gstRate: "{{OWNER: GST rate, confirm with CA}}",
  responsePromise: "{{OWNER: response time, e.g. 2 hours}}",
};

export function isOwnerValueSet(val?: string | null): boolean {
  if (!val) return false;
  const trimmed = val.trim();
  return trimmed !== "" && !trimmed.startsWith("{{OWNER");
}

export function safeOwnerText(val?: string | null, fallback: string = ""): string {
  if (!val) return fallback;
  const trimmed = val.trim();
  if (trimmed.startsWith("{{OWNER")) return fallback;
  return trimmed;
}
