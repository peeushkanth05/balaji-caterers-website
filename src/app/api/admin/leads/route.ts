import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { hasPermission, logActivity } from "@/lib/permissions";

// GET /api/admin/leads - Fetch all leads (Auth required)
export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  // View permission check
  const allowed = await hasPermission(auth.user.id, "enquiries", "view");
  if (!allowed) {
    return NextResponse.json({ error: "Forbidden. Access denied." }, { status: 403 });
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

// PATCH /api/admin/leads - Update lead status or internal notes
export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, status, notes, assignedTo } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    // Permission checks
    if (status) {
      const allowed = await hasPermission(auth.user.id, "enquiries", "edit");
      if (!allowed) return NextResponse.json({ error: "Forbidden. Edit permission required." }, { status: 403 });
    }
    if (notes !== undefined) {
      const allowed = await hasPermission(auth.user.id, "enquiries", "edit");
      if (!allowed) return NextResponse.json({ error: "Forbidden. Edit permission required." }, { status: 403 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        ...(assignedTo !== undefined && { assignedTo }),
      },
    });

    // Write audit log
    await logActivity(
      auth.user.id,
      "UPDATE_LEAD",
      `Updated lead ${id}: status=${status || "no-change"}, has_notes=${notes !== undefined}`
    );

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
