import { prisma } from "@/lib/prisma";

export async function hasPermission(
  userId: string,
  module: string,
  action: "view" | "add" | "edit" | "delete" | "publish" | "export" | "internal_notes"
): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, permissions: true },
    });

    if (!user) return false;

    // Super Admins automatically bypass all permission checks
    if (user.role === "SUPER_ADMIN") return true;

    const permissions = user.permissions ? JSON.parse(user.permissions) : {};
    const moduleActions = permissions[module] || [];

    return moduleActions.includes(action);
  } catch (e) {
    console.error("Permission check error:", e);
    return false;
  }
}

export async function logActivity(userId: string, action: string, details: any) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        details: typeof details === "string" ? details : JSON.stringify(details),
      },
    });
  } catch (e) {
    console.error("Failed to write audit log:", e);
  }
}
