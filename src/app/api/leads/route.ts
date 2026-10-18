import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// In-memory rate limiter for public lead submissions
// Max 5 submissions per IP per 10 minutes window
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Periodic cleanup if map grows
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

function getClientIp(req: Request): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }
  return "anonymous";
}

export async function POST(req: Request) {
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { success: false, error: "Too many enquiries submitted. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    let { name, phone, email, eventType, serviceNeeded, eventDate, guestCount, message } = body;

    // Trim and sanitize inputs
    name = (name || "").trim();
    phone = (phone || "").trim();
    email = (email || "").trim();
    eventType = (eventType || "").trim();
    message = (message || "").trim();

    if (!name || !phone || !eventType) {
      return NextResponse.json(
        { success: false, error: "Name, Phone, and Event Type are required" },
        { status: 400 }
      );
    }

    // Phone format check (must be at least 10 digits)
    const cleanedPhone = phone.replace(/[^0-9+]/g, "");
    if (cleanedPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit phone number" },
        { status: 400 }
      );
    }

    // Basic email format check if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        phone: cleanedPhone,
        email: email || null,
        eventType,
        service: serviceNeeded || null,
        eventDate: eventDate ? new Date(eventDate) : null,
        guestCount: guestCount ? parseInt(guestCount.toString(), 10) : null,
        message: message || null,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    console.error("Error saving lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry. Please try again." },
      { status: 500 }
    );
  }
}
