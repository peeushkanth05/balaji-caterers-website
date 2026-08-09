"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  gaId?: string;
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable if gaId is valid format G-XXXXXXXXXX
    if (!gaId || !/^G-[A-Z0-9]+$/i.test(gaId.trim())) {
      setEnabled(false);
      return;
    }

    // Check cookie consent preferences
    const savedConsent = localStorage.getItem("verma_cookie_consent");
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        if (parsed.analyticsConsent === false) {
          setEnabled(false);
          return;
        }
      } catch (e) {
        // Fallback to default enabled if consent record is unparseable
      }
    }

    // Only load on non-localhost production environments or when specifically enabled
    if (typeof window !== "undefined") {
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      if (!isLocalhost) {
        setEnabled(true);
      }
    }
  }, [gaId]);

  if (!enabled || !gaId) return null;

  const cleanGaId = gaId.trim();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${cleanGaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${cleanGaId}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
