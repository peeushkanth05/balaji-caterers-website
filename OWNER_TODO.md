# Verma Caterers & Events — Owner Action Items (`OWNER_TODO.md`)

**Target Owner:** Sandeep Verma  
**Website:** https://vermacaterersevents.com  
**Audit Date:** 19 Nov 2026

---

## 1. Statutory & Trust Credentials

- [ ] **FSSAI Licence Number:** Provide your 14-digit FSSAI licence number.
  - *Referenced in:* `src/lib/config.ts` (`fssaiNumber`)
  - *Current value:* `{{OWNER: FSSAI licence number}}`
  - *Note:* The trust strip in the footer and about section is automatically hidden until you provide this real number.
- [ ] **GSTIN (GST Identification Number):** Provide your registered 15-character GST number (or confirm to omit).
  - *Referenced in:* `src/lib/config.ts` (`gstin`)
  - *Current value:* `{{OWNER: GSTIN or remove}}`
- [ ] **GST Rate on Catering Services:** Confirm the applicable GST percentage with your CA (typically 5% without ITC or 18% with ITC in hotel banquets).
  - *Referenced in:* `src/lib/config.ts` (`gstRate`), `src/components/PackagesPageClient.tsx`
  - *Current value:* `{{OWNER: GST rate, confirm with CA}}`

---

## 2. Business Experience Claims & Kitchen Logistics

- [ ] **Confirm Marketing Numbers:** Confirm or adjust the experience statistics:
  - 15+ years experience
  - 500+ successful events managed
  - 1,000+ happy families served
  - *Referenced in:* `src/lib/config.ts` (`experienceStats`)
- [ ] **Food Preparation Separation:** Confirm whether veg, satvik, and Jain meals are prepared on dedicated separate counters and cookware.
  - *Current website copy:* "Veg and non-veg menus, with pure-veg, Jain and satvik options on request."

---

## 3. Real Client Testimonials & Google Business Profile

- [ ] **5 to 8 Real Client Reviews:** Provide real client feedback to show on the website.
  - *Target file:* `src/data/testimonials.ts`
  - *Required fields:* First name + initial (e.g., "Rohit S."), event type ("Wedding Reception"), locality ("Dwarka Sector 10"), month/year ("Nov 2026"), short quote.
  - *Status:* Currently an empty array; the testimonials section is safely hidden until you add real reviews.
- [x] **Google Business Profile (GBP):** Connected!
  - *URL:* `https://g.page/r/CYDtkWSK2D7TEBI/review`
  - *Status:* Activated in `src/lib/config.ts` and now live.

---

## 4. Digital Marketing & Analytics

- [ ] **Google Search Console (GSC) Verification:** Provide your GSC HTML verification meta tag content or verify via DNS TXT record.
  - *Referenced in:* `src/app/layout.tsx` (`verification.google`)
  - *Current value:* `{{OWNER: GSC verification code}}`
- [ ] **Official Email Forwarding:** Ensure `bookings@vermacaterersevents.com` is configured in your domain mail server and forwards to your primary inbox.
- [ ] **Social Media Channels:** Provide links to your profiles:
  - Instagram profile URL
  - Facebook page URL
  - YouTube channel URL (if available)
  - *Referenced in:* `src/lib/config.ts` (`socialLinks`)

---

## 5. Service Starting Prices & Rental Packages

- [ ] **Floral Decor Packages Starting Price:** Provide entry-level starting price (e.g. ₹25,000).
  - *Referenced in:* `src/app/services/floral-decoration/page.tsx`
  - *Current value:* `{{OWNER: starting price floral decor}}`
- [ ] **DJ, Sound & Lighting Starting Price:** Provide entry-level setup cost.
  - *Referenced in:* `src/app/services/sound-dj-lighting/page.tsx`
  - *Current value:* `{{OWNER: starting price dj sound}}`
- [ ] **Add-On Rental Starting Prices:**
  - Commercial Cooler Rentals: `src/app/services/add-ons/page.tsx` (`{{OWNER: starting price cooler rental}}`)
  - Event Anchors / Emcees: `src/app/services/add-ons/page.tsx` (`{{OWNER: starting price anchoring}}`)
  - Mattress / Gadda Seating: `src/app/services/add-ons/page.tsx` (`{{OWNER: starting price mattress setup}}`)
  - Food Stalls & Canopy Rental: `src/app/services/add-ons/page.tsx` (`{{OWNER: starting price stalls}}`)
- [ ] **Discount Offer End Date:** Provide the offer deadline for the struck-through package rates (or confirm permanent rates of ₹500 and ₹900).
  - *Referenced in:* `src/lib/config.ts`

---

## 6. Contract & Cancellation Terms

- [ ] **Advance Deposit & Cancellation Windows:**
  - Advance booking deposit % required upon confirmation.
  - Cancellation notice windows: 30+ days (% refund), 15-29 days (% refund), <14 days (non-refundable).
  - *Referenced in:* `src/app/refund-policy/page.tsx`, `src/app/cancellation-policy/page.tsx`, `src/app/terms/page.tsx`
- [ ] **Guaranteed Response Time:** Promise timeframe for new website enquiries (e.g. "within 2 hours").
