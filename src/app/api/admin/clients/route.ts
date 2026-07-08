import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const clients = await prisma.client.findMany({
      orderBy: { priority: "asc" },
    });
    return NextResponse.json({ clients });
  } catch (error) {
    console.error("Fetch Clients Error:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { name, logoUrl, websiteUrl, isFeatured, priority, isActive } = await req.json();

    if (!name || !logoUrl) {
      return NextResponse.json({ error: "Name and logo URL are required" }, { status: 400 });
    }

    const newClient = await prisma.client.create({
      data: {
        name,
        logoUrl,
        websiteUrl: websiteUrl || null,
        isFeatured: isFeatured ?? false,
        priority: priority ? parseInt(priority.toString(), 10) : 0,
        isActive: isActive ?? true,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, client: newClient }, { status: 201 });
  } catch (error) {
    console.error("Create Client Error:", error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, name, logoUrl, websiteUrl, isFeatured, priority, isActive } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 });
    }

    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(websiteUrl !== undefined && { websiteUrl: websiteUrl || null }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(priority !== undefined && { priority: parseInt(priority.toString(), 10) }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, client: updatedClient });
  } catch (error) {
    console.error("Update Client Error:", error);
    return NextResponse.json({ error: "Failed to update client" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 });
    }

    await prisma.client.delete({
      where: { id },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Client Error:", error);
    return NextResponse.json({ error: "Failed to delete client" }, { status: 500 });
  }
}
