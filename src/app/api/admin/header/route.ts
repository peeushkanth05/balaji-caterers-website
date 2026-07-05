import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// GET /api/admin/header - Admin only: Fetch header settings, menus, and actions
export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const settings = await prisma.headerSettings.upsert({
      where: { id: "default" },
      update: {},
      create: {
        id: "default",
        stickyHeader: true,
        topBarActive: true,
        topBarText: "Delhi NCR's Premier Event Partner & Caterer!",
        showSocials: true,
        showContact: true,
      },
    });

    const menus = await prisma.headerMenu.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        submenus: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    const actions = await prisma.headerAction.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ settings, menus, actions });
  } catch (error) {
    console.error("Admin Header GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch header data" }, { status: 500 });
  }
}

// POST /api/admin/header - Admin only: Create, update, delete or reorder header assets
export async function POST(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const body = await req.json();
    const { type, payload } = body;

    if (!type || !payload) {
      return NextResponse.json({ error: "Type and payload parameters are required" }, { status: 400 });
    }

    let result: any = null;

    // 1. UPDATE GENERAL HEADER SETTINGS
    if (type === "settings") {
      const { stickyHeader, topBarActive, topBarText, showSocials, showContact } = payload;
      result = await prisma.headerSettings.upsert({
        where: { id: "default" },
        update: {
          stickyHeader: stickyHeader ?? true,
          topBarActive: topBarActive ?? true,
          topBarText: topBarText || "",
          showSocials: showSocials ?? true,
          showContact: showContact ?? true,
        },
        create: {
          id: "default",
          stickyHeader: stickyHeader ?? true,
          topBarActive: topBarActive ?? true,
          topBarText: topBarText || "Delhi NCR's Premier Event Partner & Caterer!",
          showSocials: showSocials ?? true,
          showContact: showContact ?? true,
        },
      });
    }

    // 2. CREATE OR UPDATE PRIMARY MENU
    else if (type === "menu") {
      const { id, label, link, displayOrder } = payload;
      if (!label || !link) {
        return NextResponse.json({ error: "Label and link are required" }, { status: 400 });
      }

      if (id) {
        result = await prisma.headerMenu.update({
          where: { id },
          data: { label, link, displayOrder: displayOrder || 0 },
        });
      } else {
        result = await prisma.headerMenu.create({
          data: { label, link, displayOrder: displayOrder || 0 },
        });
      }
    }

    // 3. CREATE OR UPDATE SUBMENU
    else if (type === "submenu") {
      const { id, menuId, label, link, displayOrder } = payload;
      if (!menuId || !label || !link) {
        return NextResponse.json({ error: "menuId, label and link are required" }, { status: 400 });
      }

      if (id) {
        result = await prisma.headerSubmenu.update({
          where: { id },
          data: { label, link, displayOrder: displayOrder || 0 },
        });
      } else {
        result = await prisma.headerSubmenu.create({
          data: { menuId, label, link, displayOrder: displayOrder || 0 },
        });
      }
    }

    // 4. CREATE OR UPDATE ACTION BUTTONS
    else if (type === "action") {
      const { id, label, link, style, displayOrder, active } = payload;
      if (!label || !link) {
        return NextResponse.json({ error: "Label and link are required" }, { status: 400 });
      }

      if (id) {
        result = await prisma.headerAction.update({
          where: { id },
          data: {
            label,
            link,
            style: style || "primary",
            displayOrder: displayOrder || 0,
            active: active ?? true,
          },
        });
      } else {
        result = await prisma.headerAction.create({
          data: {
            label,
            link,
            style: style || "primary",
            displayOrder: displayOrder || 0,
            active: active ?? true,
          },
        });
      }
    }

    // 5. REORDER PRIMARY MENUS IN BULK
    else if (type === "reorder-menus") {
      const { items } = payload; // Array of { id, displayOrder }
      if (!Array.isArray(items)) {
        return NextResponse.json({ error: "Items array is required for reorder" }, { status: 400 });
      }

      for (const item of items) {
        await prisma.headerMenu.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        });
      }
      result = { success: true };
    }

    // 6. DELETE SECTIONS
    else if (type === "delete-menu") {
      const { id } = payload;
      await prisma.headerMenu.delete({ where: { id } });
      result = { success: true };
    } else if (type === "delete-submenu") {
      const { id } = payload;
      await prisma.headerSubmenu.delete({ where: { id } });
      result = { success: true };
    } else if (type === "delete-action") {
      const { id } = payload;
      await prisma.headerAction.delete({ where: { id } });
      result = { success: true };
    } else {
      return NextResponse.json({ error: "Unknown action type" }, { status: 400 });
    }

    // Invalidate static caching
    revalidatePath("/");

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Admin Header POST Error:", error);
    return NextResponse.json({ error: "Failed to update header settings" }, { status: 500 });
  }
}
