import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// GET /api/admin/packages - Admin only: List all packages
export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ packages });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

// POST /api/admin/packages - Admin only: Create a new package
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

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
        isFeatured: isFeatured ?? false,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, package: newPackage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}

// PATCH /api/admin/packages - Admin only: Update a package or toggle featured status
export async function PATCH(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id, name, category, pricePerPerson, description, features, isFeatured } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Package ID required" }, { status: 400 });
    }

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(category !== undefined && { category }),
        ...(pricePerPerson !== undefined && { pricePerPerson: parseFloat(pricePerPerson.toString()) }),
        ...(description !== undefined && { description }),
        ...(features !== undefined && { features }),
        ...(isFeatured !== undefined && { isFeatured }),
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, package: updatedPackage });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}

// DELETE /api/admin/packages - Admin only: Remove a package
export async function DELETE(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Package ID required" }, { status: 400 });
    }

    await prisma.package.delete({ where: { id } });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
