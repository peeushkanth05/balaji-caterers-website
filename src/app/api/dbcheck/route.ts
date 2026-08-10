import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const hasDbUrl = !!process.env.DATABASE_URL;
  const dbUrlPrefix = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.split("://")[0]
    : "none";

  try {
    const userCount = await prisma.user.count();

    // If no users exist, auto-seed initial admin
    if (userCount === 0) {
      const superAdminEmail = "vermasandeep124@gmail.com";
      const hashedPassword = await bcrypt.hash("Admin@Verma2026", 10);
      await prisma.user.create({
        data: {
          name: "Sandeep Verma (Owner)",
          email: superAdminEmail,
          password: hashedPassword,
          phone: "+919810483544",
          role: "SUPER_ADMIN",
        },
      });
      return NextResponse.json({
        status: "ok",
        hasDbUrl,
        dbProvider: dbUrlPrefix,
        userCount: 1,
        message: "Seeded initial Super Admin account vermasandeep124@gmail.com",
      });
    }

    const adminUser = await prisma.user.findFirst({
      select: { id: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json({
      status: "ok",
      hasDbUrl,
      dbProvider: dbUrlPrefix,
      userCount,
      adminFound: !!adminUser,
      adminEmail: adminUser?.email || null,
      adminRole: adminUser?.role || null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        hasDbUrl,
        dbProvider: dbUrlPrefix,
        errorMessage: error?.message || "Unknown DB error",
        errorCode: error?.code || null,
      },
      { status: 500 }
    );
  }
}
