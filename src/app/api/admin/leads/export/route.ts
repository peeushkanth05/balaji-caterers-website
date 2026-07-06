import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";
import { hasPermission, logActivity } from "@/lib/permissions";

export async function GET(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  const allowed = await hasPermission(auth.user.id, "enquiries", "export");
  if (!allowed) {
    return NextResponse.json({ error: "Forbidden. Export permission required." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "csv"; // "csv" | "xlsx"
    const status = searchParams.get("status") || "ALL";
    const search = searchParams.get("search") || "";
    const startDateStr = searchParams.get("startDate");
    const endDateStr = searchParams.get("endDate");

    // Build query conditions
    const where: any = {};

    // 1. Status Filter
    if (status !== "ALL") {
      where.status = status;
    }

    // 2. Search Filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { eventType: { contains: search, mode: "insensitive" } },
        { service: { contains: search, mode: "insensitive" } },
      ];
    }

    // 3. Date Range Filter (Event Date)
    if (startDateStr || endDateStr) {
      where.eventDate = {};
      if (startDateStr) {
        where.eventDate.gte = new Date(startDateStr);
      }
      if (endDateStr) {
        // Set end date to end of day
        const end = new Date(endDateStr);
        end.setHours(23, 59, 59, 999);
        where.eventDate.lte = end;
      }
    }

    // Fetch leads matching filters
    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Map database records to formatted Excel rows
    const dataRows = leads.map((lead) => ({
      "Customer Name": lead.name,
      "Phone Number": lead.phone,
      "Email Address": lead.email || "N/A",
      "Event Type": lead.eventType,
      "Service Needed": lead.service || "General",
      "Number of Guests": lead.guestCount || 0,
      "Event Date": lead.eventDate
        ? new Date(lead.eventDate).toLocaleDateString("en-IN")
        : "N/A",
      "Status": lead.status,
      "Internal Notes": lead.notes || "",
      "Created Date": new Date(lead.createdAt).toLocaleDateString("en-IN"),
    }));

    // Create Excel Workbook
    const worksheet = XLSX.utils.json_to_sheet(dataRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads Report");

    await logActivity(
      auth.user.id,
      "EXPORT_LEADS",
      `Exported leads: format=${format}, status=${status}, search=${search}`
    );

    if (format === "xlsx") {
      const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
      return new Response(buffer, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="leads_export_${Date.now()}.xlsx"`,
        },
      });
    } else {
      // Default to CSV
      const csvContent = XLSX.utils.sheet_to_csv(worksheet);
      return new Response(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="leads_export_${Date.now()}.csv"`,
        },
      });
    }
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}
