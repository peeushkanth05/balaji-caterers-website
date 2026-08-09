"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  gaId?: string;
}

const DEFAULT_GA_ID = "G-XZGBPFOHBR";

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const activeGaId = (gaId && gaId.trim() !== "") ? gaId.trim() : DEFAULT_GA_ID;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Validate format G-XXXXXXXXXX
    if (!activeGaId || !/^G-[A-Z0-9]+$/i.test(activeGaId)) {
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
        // Fallback to enabled if parse fails
      }
    }

    // Enable in production browser environment
    if (typeof window !== "undefined") {
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      if (!isLocalhost) {
        setEnabled(true);
      }
    }
  }, [activeGaId]);

  if (!enabled || !activeGaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${activeGaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${activeGaId}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
