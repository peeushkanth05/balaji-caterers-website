// =============================================================================
// Hero Section — Shared TypeScript Types
// =============================================================================
// These interfaces mirror the Prisma models and are used across:
//   - Admin panel (form state)
//   - API routes (request/response payloads)
//   - Frontend components (rendering props)
// =============================================================================

/** Individual statistic counter (e.g. "500+ Events Managed") */
export interface HeroStatisticData {
  id: string;
  heroSectionId: string;
  icon: string;
  number: string;
  prefix: string;
  suffix: string;
  title: string;
  sortOrder: number;
  isEnabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Hero image for slider/gallery */
export interface HeroImageData {
  id: string;
  heroSectionId: string;
  imageUrl: string;
  mobileImageUrl: string;
  altText: string;
  caption: string;
  displayOrder: number;
  isEnabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Floating service card (e.g. "Catering — North & Fusion") */
export interface HeroFloatingCardData {
  id: string;
  heroSectionId: string;
  icon: string;
  title: string;
  description: string;
  link: string;
  color: string;
  sortOrder: number;
  isEnabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Complete Hero Section configuration (parent record with all children) */
export interface HeroSectionData {
  id: string;

  // General
  isEnabled: boolean;
  layoutType: string;
  backgroundType: string;
  themeStyle: string;

  // Logo
  logoUrl: string;
  logoDarkUrl: string;
  logoLightUrl: string;
  logoWidth: number;
  logoHeight: number;
  logoAlt: string;
  logoClickUrl: string;

  // Announcement Bar
  announcementShow: boolean;
  announcementText: string;
  announcementIcon: string;
  announcementLink: string;
  announcementBgColor: string;
  announcementTextColor: string;

  // Badge
  badgeShow: boolean;
  badgeText: string;
  badgeIcon: string;
  badgeColor: string;

  // Heading
  heading: string;
  headingHighlight: string;
  headingAlignment: string;

  // Subheading
  subheading: string;
  subheadingAlignment: string;
  subheadingCharLimit: number;

  // Primary Button
  primaryBtnText: string;
  primaryBtnLink: string;
  primaryBtnIcon: string;
  primaryBtnNewTab: boolean;

  // Secondary Button
  secondaryBtnText: string;
  secondaryBtnLink: string;
  secondaryBtnIcon: string;
  secondaryBtnNewTab: boolean;

  // Slider Settings
  sliderAutoPlay: boolean;
  sliderSpeed: number;
  sliderLoop: boolean;
  sliderPauseOnHover: boolean;
  sliderNavigation: boolean;
  sliderPagination: boolean;
  sliderTransition: string;

  // Background Settings
  bgImage: string;
  bgVideo: string;
  overlayColor: string;
  overlayOpacity: number;
  bgBlur: number;
  bgParallax: boolean;
  bgGradient: string;

  // Theme Colors
  colorHeading: string;
  colorSubheading: string;
  colorButtons: string;
  colorBadge: string;
  colorBackground: string;
  colorOverlay: string;

  // SEO
  seoTitle: string;
  seoDescription: string;
  seoImageAlt: string;
  seoStructuredData: string;

  // Mobile Overrides
  mobileHeading: string;
  mobileSubheading: string;
  mobileImage: string;
  mobileHideElements: string;
  mobileBtnText: string;

  // Relations
  statistics: HeroStatisticData[];
  images: HeroImageData[];
  floatingCards: HeroFloatingCardData[];

  createdAt?: string;
  updatedAt?: string;
}

/** Payload for creating/updating statistics */
export interface HeroStatisticPayload {
  id?: string;
  icon?: string;
  number?: string;
  prefix?: string;
  suffix?: string;
  title?: string;
  sortOrder?: number;
  isEnabled?: boolean;
}

/** Payload for creating/updating images */
export interface HeroImagePayload {
  id?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  altText?: string;
  caption?: string;
  displayOrder?: number;
  isEnabled?: boolean;
}

/** Payload for creating/updating floating cards */
export interface HeroFloatingCardPayload {
  id?: string;
  icon?: string;
  title?: string;
  description?: string;
  link?: string;
  color?: string;
  sortOrder?: number;
  isEnabled?: boolean;
}
