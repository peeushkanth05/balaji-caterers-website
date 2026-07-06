import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

const DEFAULT_FIELDS = [
  { id: "name", name: "name", label: "Your Name", placeholder: "Peeyush Kanth", required: true, isEnabled: true, displayOrder: 0, type: "text" },
  { id: "phone", name: "phone", label: "Mobile Number", placeholder: "+91 98765 43210", required: true, isEnabled: true, displayOrder: 1, type: "text" },
  { id: "email", name: "email", label: "Email Address", placeholder: "you@example.com", required: false, isEnabled: true, displayOrder: 2, type: "email" },
  { id: "eventType", name: "eventType", label: "Event Type", placeholder: "Select Event", required: true, isEnabled: true, displayOrder: 3, type: "select" },
  { id: "service", name: "service", label: "Service Needed", placeholder: "Select Service", required: false, isEnabled: true, displayOrder: 4, type: "select" },
  { id: "eventDate", name: "eventDate", label: "Event Date", placeholder: "dd-mm-yyyy", required: false, isEnabled: true, displayOrder: 5, type: "date" },
  { id: "guestCount", name: "guestCount", label: "Expected Guests", placeholder: "e.g. 200", required: false, isEnabled: true, displayOrder: 6, type: "number" },
  { id: "message", name: "message", label: "Tell Us More", placeholder: "Any specific venue preferences or special requests...", required: false, isEnabled: true, displayOrder: 7, type: "textarea" }
];

const DEFAULT_EVENT_TYPES = ["Wedding", "Birthday Party", "Engagement", "Corporate Event", "Anniversary", "Puja & Kirtan", "Floral Decoration", "Sound & DJ Setup", "Other"];

const DEFAULT_SERVICES = [
  "Catering Services",
  "Wedding Host",
  "Birthday Party",
  "Puja & Kirtan",
  "Floral Decoration",
  "Sound & DJ Setup",
  "Event Management (End-to-End)",
  "Stall Booking",
  "Event Anchoring",
  "Cooler Rental",
  "Mattress Rental"
];

// GET /api/admin/contact - Fetch contact settings
export async function GET() {
  try {
    let settings = await prisma.enquiryFormSetting.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.enquiryFormSetting.create({
        data: {
          id: "default",
          sectionTitle: "Get In Touch",
          sectionHeading: "Let's Plan Your Dream Event",
          formTitle: "Request a Free Quote",
          formDescription: "Fill out your event details below for a customized quotation.",
          phone: "+91 98104 83544",
          phoneIcon: "Phone",
          email: "vermasandeep124@gmail.com",
          emailIcon: "Mail",
          address: "Dwarka Sector 5, Madhu Vihar, New Delhi",
          addressIcon: "MapPin",
          submitBtnText: "Send My Enquiry",
          successMessage: "Thank you! Your enquiry has been received successfully.",
          errorMessage: "Something went wrong. Please try again later.",
          fieldsJson: JSON.stringify(DEFAULT_FIELDS),
          eventTypesJson: JSON.stringify(DEFAULT_EVENT_TYPES),
          servicesJson: JSON.stringify(DEFAULT_SERVICES),
        },
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Fetch Contact Settings Error:", error);
    return NextResponse.json({ error: "Failed to fetch contact settings" }, { status: 500 });
  }
}

// PATCH /api/admin/contact - Update contact settings
export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const body = await req.json();

    const updatedSettings = await prisma.enquiryFormSetting.upsert({
      where: { id: "default" },
      create: {
        id: "default",
        ...body,
      },
      update: {
        ...body,
      },
    });

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error) {
    console.error("Update Contact Settings Error:", error);
    return NextResponse.json({ error: "Failed to update contact settings" }, { status: 500 });
  }
}
