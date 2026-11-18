export interface TestimonialItem {
  id: string;
  name: string; // e.g. "Rohit S."
  eventType: string; // e.g. "Wedding Reception"
  area: string; // e.g. "Dwarka Sector 12"
  monthYear: string; // e.g. "Nov 2026"
  quote: string;
  rating?: number; // e.g. 5
  source: "Google" | "WhatsApp";
}

// Hard rule: Never invent testimonials.
// Start with an empty array. The section automatically hides when empty.
/* Example item for owner reference:
{
  id: "sample-1",
  name: "Amit K.",
  eventType: "Wedding Reception",
  area: "Dwarka Sector 10",
  monthYear: "Oct 2026",
  quote: "The food was praised by all our guests. Sandeep ji managed everything seamlessly.",
  rating: 5,
  source: "Google"
}
*/
export const TESTIMONIALS_DATA: TestimonialItem[] = [];
