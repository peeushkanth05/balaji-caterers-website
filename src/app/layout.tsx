import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { FloatingSocials } from "@/components/FloatingSocials";

import CookieBanner from "@/components/CookieBanner";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://vermacaterers.in"),
  title: "Verma Caterers | Best Catering & Event Services in Delhi NCR",
  description:
    "Verma Caterers offers premium catering, floral decoration, sound & DJ setup, mattress rental, and full event management in Delhi NCR.",
  manifest: "/manifest.json",
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
    title: "Verma Caterers | Best Catering & Event Services in Delhi NCR",
    description: "Premium catering, floral décor, DJ & sound, and full event management services in Delhi NCR. 15+ years, 500+ events.",
    siteName: "Verma Caterers",
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
    title: "Verma Caterers | Best Catering & Event Services in Delhi NCR",
    description: "Premium catering, floral décor, DJ & sound, and full event management services in Delhi NCR.",
    images: ["/verma-logo-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Verma Caterers",
    "url": "https://vermacaterers.in",
    "logo": "https://vermacaterers.in/verma-logo-512.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9810483544",
      "contactType": "customer service"
    }
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
                  var theme = localStorage.getItem('verma_theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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
      <body className="font-sans antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <Providers>
          {children}
          <FloatingSocials />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
