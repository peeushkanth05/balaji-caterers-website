# Verma Caterers & Events — Repo Discovery

**Date:** 19 Nov 2026  
**Audited Directory:** `Verma Caterers/`  
**Git Branch:** `audit-fixes` (created from `main`)

---

## 1. Project Architecture & Framework

- **Framework:** Next.js 14.2.15 (App Router, React 18, TypeScript 5.6.3).
- **Styling:** Tailwind CSS with PostCSS and Framer Motion.
- **Database & ORM:** PostgreSQL accessed via Prisma Client 5.21.1.
- **State/Auth:** NextAuth 4.24.8 with JWT strategy and bcryptjs.
- **3D Graphics:** Three.js and `@react-three/fiber` / `@react-three/drei`.
- **Media & Document:** Cloudinary, Sharp, jsPDF, jspdf-autotable, SheetJS (xlsx).

---

## 2. Directory Locations

- **Pages & Routes:** `src/app/`
  - Public marketing routes: `src/app/` (Home `page.tsx`, `packages/`, `gallery/`, `portfolio/`, `blogs/`, legal pages, and 11 location pages).
  - Admin management routes: `src/app/admin/` (leads, packages, hero, faqs, settings, etc.).
  - API endpoints: `src/app/api/` (public APIs and `src/app/api/admin/*` administrative APIs).
- **Components:** `src/components/`
  - Core UI: `Header.tsx`, `Footer.tsx`, `HeroSection.tsx`, `PublicForm.tsx`, `MobileStickyBar.tsx`, etc.
  - Portfolio UI: `src/components/portfolio/`
  - Admin UI: `src/components/admin/`
- **Data & Config:**
  - Database schema: `prisma/schema.prisma`
  - Database seeds: `prisma/seed.js`
  - Auth config & guards: `src/lib/auth.ts`, `src/lib/auth-guards.ts`, `src/lib/permissions.ts`
  - SEO / Sitemap / Robots: `src/app/sitemap.ts`, `src/app/robots.ts`
- **Gallery Images & Metadata:**
  - Gallery records are dynamically stored in database model `GalleryItem` (also `MediaAsset`).
  - Physical public assets reside in `public/` and remote images on Cloudinary / Unsplash.

---

## 3. Detected Deploy Target

- **Deploy Host:** **Vercel**
  - Detected via `.vercel/` configuration folder present in repository.
  - Git commit history confirms Vercel integration: `chore: trigger vercel deployment for 3d cloche redesign`.
  - Remote git repository: `https://github.com/peeushkanth05/balaji-caterers-website.git`.

---

## 4. Phase 1 Grep Analysis Summary

| Search Query | Matches Found | Key Locations |
| :--- | :--- | :--- |
| `under development` | 1 | `src/components/Header.tsx:246` (announcement banner) |
| `pure veg` / `pure vegetarian` | 16 | `catering-services-delhi-ncr`, `privacy-policy`, `puja-kirtan`, `wedding-catering-*`, admin FAQs |
| `vermasandeep124` | 10 | `src/app/privacy-policy/page.tsx`, `src/app/api/admin/settings/route.ts`, `src/app/api/admin/footer/route.ts`, `src/app/api/footer/route.ts`, `prisma/schema.prisma` defaults |
| `tel:+91 ` (with space) | 0 | Clean. (All tel links adhere to standard no-space format or use dynamic props) |
| `50 Photos` | 0 | Already using generic or dynamic count |
| `Uploaded Photo` | 1 | `src/app/api/admin/upload/route.ts:60` default title |
| `100% Satisfaction` | 1 | `src/app/admin/emojis/page.tsx` sample string |
| `Best Marriage` | 2 | `src/app/wedding-catering-dwarka/page.tsx:10, 17` |
| `Hygiene Certified` | 2 | `src/app/wedding-catering-dwarka/page.tsx`, `wedding-catering-south-delhi/page.tsx` |
| `FSSAI` | 4 | `catering-services-delhi-ncr`, `corporate-catering-noida`, `wedding-catering-noida`, `wedding-catering-west-delhi` |
| `Premier` | 10 | Header & Hero default badge copy and route fallbacks |
| `Event Type` | 16 | `src/components/PublicForm.tsx`, `src/app/admin/contact/page.tsx`, schema models |
