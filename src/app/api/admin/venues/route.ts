import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const venues = await prisma.venuePartner.findMany({
      orderBy: { priority: "asc" },
    });
    return NextResponse.json({ venues });
  } catch (error) {
    console.error("Fetch Venues Error:", error);
    return NextResponse.json({ error: "Failed to fetch venue partners" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { name, logoUrl, websiteUrl, description, address, priority, isFeatured, isActive } = await req.json();

    if (!name || !logoUrl) {
      return NextResponse.json({ error: "Name and logo URL are required" }, { status: 400 });
    }

    const newVenue = await prisma.venuePartner.create({
      data: {
        name,
        logoUrl,
        websiteUrl: websiteUrl || null,
        description: description || null,
        address: address || null,
        priority: priority ? parseInt(priority.toString(), 10) : 0,
        isFeatured: isFeatured ?? false,
        isActive: isActive ?? true,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, venue: newVenue }, { status: 201 });
  } catch (error) {
    console.error("Create Venue Error:", error);
    return NextResponse.json({ error: "Failed to create venue partner" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, name, logoUrl, websiteUrl, description, address, priority, isFeatured, isActive } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Venue ID is required" }, { status: 400 });
    }

    const updatedVenue = await prisma.venuePartner.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(websiteUrl !== undefined && { websiteUrl: websiteUrl || null }),
        ...(description !== undefined && { description: description || null }),
        ...(address !== undefined && { address: address || null }),
        ...(priority !== undefined && { priority: parseInt(priority.toString(), 10) }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, venue: updatedVenue });
  } catch (error) {
    console.error("Update Venue Error:", error);
    return NextResponse.json({ error: "Failed to update venue partner" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Venue ID is required" }, { status: 400 });
    }

    await prisma.venuePartner.delete({
      where: { id },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Venue Error:", error);
    return NextResponse.json({ error: "Failed to delete venue partner" }, { status: 500 });
  }
}
