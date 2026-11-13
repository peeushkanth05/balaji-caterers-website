"use client";

import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";
import { captureLandingAttribution } from "@/lib/attribution";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    captureLandingAttribution();
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
