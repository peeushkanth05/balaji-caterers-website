import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { privacyConsent, marketingConsent, whatsappConsent } = await req.json();

    const ipAddress = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const log = await prisma.consentLog.create({
      data: {
        ipAddress,
        userAgent,
        privacyConsent: privacyConsent ?? false,
        marketingConsent: marketingConsent ?? false,
        whatsappConsent: whatsappConsent ?? false,
      },
    });

    return NextResponse.json({ success: true, id: log.id });
  } catch (error) {
    console.error("Consent log failed:", error);
    return NextResponse.json({ error: "Failed to log consent" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
