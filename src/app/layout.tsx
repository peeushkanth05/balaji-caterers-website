import type { Metadata, Viewport } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { FloatingSocials } from "@/components/FloatingSocials";
import CookieBanner from "@/components/CookieBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { prisma } from "@/lib/prisma";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
  try {
    settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });
  } catch (e) {
    // Graceful fallback
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vermacaterersevents.com/#organization",
        "name": "Verma Caterers",
        "url": "https://vermacaterersevents.com",
        "logo": "https://vermacaterersevents.com/verma-logo-512.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9810483544",
          "contactType": "customer service",
          "areaServed": "Delhi NCR"
        }
      },
      {
        "@type": ["LocalBusiness", "FoodEstablishment"],
        "@id": "https://vermacaterersevents.com/#localbusiness",
        "name": "Verma Caterers & Event Management",
        "image": "https://vermacaterersevents.com/verma-logo-512.png",
        "url": "https://vermacaterersevents.com",
        "telephone": "+91-9810483544",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Dwarka Sector 5, Madhu Vihar",
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
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "500"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://vermacaterersevents.com/#website",
        "url": "https://vermacaterersevents.com",
        "name": "Verma Caterers",
        "publisher": {
          "@id": "https://vermacaterersevents.com/#organization"
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${nunito.variable} ${playfair.variable}`} suppressHydrationWarning>
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
                  document.documentElement.classList.remove('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-slate-50 text-slate-900 transition-colors overflow-x-hidden">
        <GoogleAnalytics gaId={settings?.googleAnalyticsId} />
        <Providers>
          {children}
          <FloatingSocials />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
