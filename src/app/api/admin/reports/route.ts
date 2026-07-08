import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { searchParams } = new URL(req.url);
    const exportType = searchParams.get("export");

    if (exportType === "leads") {
      const leads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
      });

      // Generate simple CSV string
      const headers = "ID,Name,Phone,Email,Event Type,Service Needed,Event Date,Guest Count,Status,Created At\n";
      const rows = leads
        .map((l) => {
          return `"${l.id}","${l.name}","${l.phone}","${l.email || ""}","${l.eventType}","${
            l.service || ""
          }","${l.eventDate ? l.eventDate.toISOString().substring(0, 10) : ""}","${l.guestCount || 0}","${
            l.status
          }","${l.createdAt.toISOString()}"`;
        })
        .join("\n");

      const csvContent = headers + rows;

      return new Response(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="leads_report_${Date.now()}.csv"`,
        },
      });
    }

    if (exportType === "packages") {
      const pkgs = await prisma.package.findMany({
        orderBy: { category: "asc" },
      });

      const headers = "ID,Name,Category,Price Per Person,Discount Type,Discount Value,Discounted Price,Features,Featured\n";
      const rows = pkgs
        .map((p) => {
          return `"${p.id}","${p.name}","${p.category}","${p.pricePerPerson}","${p.discountType}","${
            p.discountValue
          }","${p.discountedPrice}","${p.features.replace(/"/g, '""')}","${p.isFeatured}"`;
        })
        .join("\n");

      const csvContent = headers + rows;

      return new Response(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="packages_report_${Date.now()}.csv"`,
        },
      });
    }

    // Default: Return dashboard widget aggregates
    const [
      leadsCount,
      packagesCount,
      galleryCount,
      blogsCount,
      venuesCount,
      clientsCount,
      mediaCount,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.package.count(),
      prisma.galleryItem.count(),
      prisma.blogPost.count(),
      prisma.venuePartner.count(),
      prisma.client.count(),
      prisma.mediaAsset.count(),
    ]);

    // Group leads by status
    const leadsByStatus = await prisma.lead.groupBy({
      by: ["status"],
      _count: {
        id: true,
      },
    });

    const statusCounts = leadsByStatus.reduce((acc: any, curr) => {
      acc[curr.status] = curr._count.id;
      return acc;
    }, {
      NEW: 0,
      CONTACTED: 0,
      QUOTATION_SENT: 0,
      BOOKED: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads: leadsCount,
        statusCounts,
        totalPackages: packagesCount,
        totalGallery: galleryCount,
        totalBlogs: blogsCount,
        totalVenues: venuesCount,
        totalClients: clientsCount,
        totalMedia: mediaCount,
      },
    });
  } catch (error) {
    console.error("Fetch Reports Error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
