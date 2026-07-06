import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Fetch Header Settings
    let settings = await prisma.headerSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.headerSettings.create({
        data: {
          id: "default",
          stickyHeader: true,
          topBarActive: true,
          topBarText: "Delhi NCR's Premier Event Partner & Caterer!",
          showSocials: true,
          showContact: true,
        },
      });
    }

    // 2. Fetch Menus (ordered by displayOrder)
    let menus = await prisma.headerMenu.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        submenus: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    // Seed default menus if table is completely empty
    if (menus.length === 0) {
      const defaultMenus = [
        { label: "Home", link: "/", displayOrder: 0 },
        {
          label: "Services",
          link: "/#services",
          displayOrder: 1,
          submenus: [
            { label: "Catering Services", link: "/#services", displayOrder: 0 },
            { label: "Wedding Host", link: "/#services", displayOrder: 1 },
            { label: "Birthday Party", link: "/#services", displayOrder: 2 },
            { label: "Puja & Kirtan", link: "/#services", displayOrder: 3 },
            { label: "Floral Decoration", link: "/#services", displayOrder: 4 },
            { label: "Sound & DJ Setup", link: "/#services", displayOrder: 5 },
            { label: "Event Management (End-to-End)", link: "/#services", displayOrder: 6 },
            { label: "Stall Booking", link: "/#services", displayOrder: 7 },
            { label: "Event Anchoring", link: "/#services", displayOrder: 8 },
            { label: "Cooler Rental", link: "/#services", displayOrder: 9 },
            { label: "Mattress Rental", link: "/#services", displayOrder: 10 },
          ],
        },
        { label: "Packages", link: "/packages", displayOrder: 2 },
        { label: "Portfolios", link: "/#portfolio", displayOrder: 3 },
        { label: "Contact", link: "/#contact", displayOrder: 4 },
      ];

      for (const m of defaultMenus) {
        if (m.submenus) {
          const createdMenu = await prisma.headerMenu.create({
            data: {
              label: m.label,
              link: m.link,
              displayOrder: m.displayOrder,
            },
          });
          for (const sub of m.submenus) {
            await prisma.headerSubmenu.create({
              data: {
                menuId: createdMenu.id,
                label: sub.label,
                link: sub.link,
                displayOrder: sub.displayOrder,
              },
            });
          }
        } else {
          await prisma.headerMenu.create({
            data: {
              label: m.label,
              link: m.link,
              displayOrder: m.displayOrder,
            },
          });
        }
      }

      // Re-fetch seeded menus
      menus = await prisma.headerMenu.findMany({
        orderBy: { displayOrder: "asc" },
        include: {
          submenus: {
            orderBy: { displayOrder: "asc" },
          },
        },
      });
    }

    // 3. Fetch Header Action Buttons
    let actions = await prisma.headerAction.findMany({
      orderBy: { displayOrder: "asc" },
    });

    if (actions.length === 0) {
      await prisma.headerAction.create({
        data: {
          label: "Get Quote",
          link: "/#contact",
          style: "primary",
          displayOrder: 0,
          active: true,
        },
      });
      actions = await prisma.headerAction.findMany({
        orderBy: { displayOrder: "asc" },
      });
    }

    // 4. Fetch Site settings (branding details & social links)
    const siteSettings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });

    return NextResponse.json({ settings, menus, actions, siteSettings });
  } catch (error) {
    console.error("Public Header API Error:", error);
    return NextResponse.json({ error: "Failed to load header configuration" }, { status: 500 });
  }
}
