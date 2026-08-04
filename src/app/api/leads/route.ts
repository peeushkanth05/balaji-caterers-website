import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
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
