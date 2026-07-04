import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/packages
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ packages });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

// POST /api/admin/packages
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, category, pricePerPerson, description, features, isFeatured } = await req.json();

    if (!name || !category || !pricePerPerson) {
      return NextResponse.json({ error: "Name, category, and price are required" }, { status: 400 });
    }

    const newPackage = await prisma.package.create({
      data: {
        name,
        category,
        pricePerPerson: parseFloat(pricePerPerson.toString()),
        description: description || "",
        features: features || "",
        isFeatured: isFeatured || false,
      },
    });

    return NextResponse.json({ success: true, package: newPackage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}

// PATCH /api/admin/packages
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, name, category, pricePerPerson, description, features, isFeatured } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Package ID required" }, { status: 400 });
    }

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(category && { category }),
        ...(pricePerPerson !== undefined && { pricePerPerson: parseFloat(pricePerPerson.toString()) }),
        ...(description !== undefined && { description }),
        ...(features !== undefined && { features }),
        ...(isFeatured !== undefined && { isFeatured }),
      },
    });

    return NextResponse.json({ success: true, package: updatedPackage });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}

// DELETE /api/admin/packages
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Package ID required" }, { status: 400 });
    }

    await prisma.package.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
