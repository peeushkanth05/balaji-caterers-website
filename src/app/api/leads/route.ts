import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, eventType, serviceNeeded, eventDate, guestCount, message } = body;

    if (!name || !phone || !eventType) {
      return NextResponse.json(
        { success: false, error: "Name, Phone, and Event Type are required" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
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
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
