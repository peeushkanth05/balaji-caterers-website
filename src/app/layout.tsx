import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { FloatingSocials } from "@/components/FloatingSocials";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import CookieBanner from "@/components/CookieBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { prisma } from "@/lib/prisma";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vermacaterersevents.com"),
  title: "Verma Caterers & Events | Catering & Event Management in Delhi NCR",
  description:
    "Verma Caterers & Events offers premium wedding, party & corporate catering, floral décor, DJ setup, and full event management across Delhi, Dwarka & Gurugram.",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://vermacaterersevents.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Verma Caterers & Events | Catering & Event Management in Delhi NCR",
    description:
      "Verma Caterers & Events offers premium wedding, party & corporate catering, floral décor, DJ setup, and full event management across Delhi, Dwarka & Gurugram.",
    url: "https://vermacaterersevents.com",
    siteName: "Verma Caterers & Events",
    images: [
      {
        url: "/verma-logo-512.png",
        width: 512,
        height: 512,
        alt: "Verma Caterers Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verma Caterers & Events | Catering & Event Management in Delhi NCR",
    description:
      "Verma Caterers & Events offers premium wedding, party & corporate catering, floral décor, DJ setup, and full event management across Delhi, Dwarka & Gurugram.",
    images: ["/verma-logo-512.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings: any = null;
  let verifiedTestimonials: any[] = [];
  try {
    settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });
    verifiedTestimonials = await prisma.testimonial.findMany({
      where: { isEnabled: true },
    });
  } catch (e) {
    // Graceful fallback
  }

  const reviewCount = verifiedTestimonials.length;
  const avgRating = reviewCount > 0
    ? (verifiedTestimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / reviewCount).toFixed(1)
    : null;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vermacaterersevents.com/#organization",
        "name": "Verma Caterers & Events",
        "url": "https://vermacaterersevents.com",
        "logo": "https://vermacaterersevents.com/verma-logo-512.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": settings?.phone || "+91-9810483544",
          "contactType": "customer service",
          "areaServed": "Delhi NCR"
        }
      },
      {
        "@type": ["LocalBusiness", "FoodEstablishment"],
        "@id": "https://vermacaterersevents.com/#localbusiness",
        "name": "Verma Caterers & Events",
        "image": "https://vermacaterersevents.com/verma-logo-512.png",
        "url": "https://vermacaterersevents.com",
        "telephone": settings?.phone || "+91-9810483544",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": settings?.address || "Dwarka Sector 5, Madhu Vihar",
          "addressLocality": "New Delhi",
          "addressRegion": "Delhi NCR",
          "postalCode": "110059",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.5921,
          "longitude": 77.0460
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "21:00"
        },
        ...(reviewCount > 0 && avgRating ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": avgRating,
            "reviewCount": reviewCount.toString()
          }
        } : {})
      },
      {
        "@type": "WebSite",
        "@id": "https://vermacaterersevents.com/#website",
        "url": "https://vermacaterersevents.com",
        "name": "Verma Caterers & Events",
        "publisher": {
          "@id": "https://vermacaterersevents.com/#organization"
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${roboto.variable} ${roboto.className}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-[#F8F7F3] text-[#111827] dark:bg-slate-950 dark:text-slate-100 transition-colors overflow-x-hidden">
        <GoogleAnalytics gaId={settings?.googleAnalyticsId} />
        <Providers>
          {children}
          <FloatingSocials />
          <MobileStickyBar phone={settings?.phone} whatsapp={settings?.whatsappNumber} />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
