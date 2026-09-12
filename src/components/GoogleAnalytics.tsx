"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  gaId?: string;
}

const DEFAULT_GA_ID = "G-XZGBPF0HBR";

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  let activeGaId = gaId && gaId.trim() !== "" ? gaId.trim() : DEFAULT_GA_ID;

  // Sanitize common typo where letter 'O' was used instead of digit '0'
  if (activeGaId.toUpperCase() === "G-XZGBPFOHBR") {
    activeGaId = DEFAULT_GA_ID;
  }

  if (!activeGaId || !/^G-[A-Z0-9]+$/i.test(activeGaId)) {
    return null;
  }

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
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  );
}

