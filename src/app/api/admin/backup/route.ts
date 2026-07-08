import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const auth = await requireAdminSession();
  if (!auth.authorized) return auth.errorResponse;

  try {
    const { searchParams } = new URL(req.url);
    const download = searchParams.get("download");

    if (download) {
      // Query ALL tables to compile full database snapshot
      const [
        users,
        leads,
        packages,
        services,
        galleryItems,
        siteSettings,
        heroSections,
        heroStatistics,
        heroImages,
        heroFloatingCards,
        portfolioCategories,
        portfolios,
        headerMenus,
        headerSubmenus,
        headerActions,
        headerSettings,
        socialMediaLinks,
        videoGalleryItems,
        testimonials,
        alertTickers,
        homepageSections,
        enquiryFormSettings,
        advertisements,
        venuePartners,
        clients,
        faqs,
        blogPosts,
      ] = await Promise.all([
        prisma.user.findMany(),
        prisma.lead.findMany(),
        prisma.package.findMany(),
        prisma.service.findMany(),
        prisma.galleryItem.findMany(),
        prisma.siteSetting.findMany(),
        prisma.heroSection.findMany(),
        prisma.heroStatistic.findMany(),
        prisma.heroImage.findMany(),
        prisma.heroFloatingCard.findMany(),
        prisma.portfolioCategory.findMany(),
        prisma.portfolio.findMany(),
        prisma.headerMenu.findMany(),
        prisma.headerSubmenu.findMany(),
        prisma.headerAction.findMany(),
        prisma.headerSettings.findMany(),
        prisma.socialMediaLink.findMany(),
        prisma.videoGalleryItem.findMany(),
        prisma.testimonial.findMany(),
        prisma.alertTicker.findMany(),
        prisma.homepageSection.findMany(),
        prisma.enquiryFormSetting.findMany(),
        prisma.advertisement.findMany(),
        prisma.venuePartner.findMany(),
        prisma.client.findMany(),
        prisma.faq.findMany(),
        prisma.blogPost.findMany(),
      ]);

      const backupSnapshot = {
        timestamp: new Date().toISOString(),
        tables: {
          users,
          leads,
          packages,
          services,
          galleryItems,
          siteSettings,
          heroSections,
          heroStatistics,
          heroImages,
          heroFloatingCards,
          portfolioCategories,
          portfolios,
          headerMenus,
          headerSubmenus,
          headerActions,
          headerSettings,
          socialMediaLinks,
          videoGalleryItems,
          testimonials,
          alertTickers,
          homepageSections,
          enquiryFormSettings,
          advertisements,
          venuePartners,
          clients,
          faqs,
          blogPosts,
        },
      };

      const backupString = JSON.stringify(backupSnapshot, null, 2);

      // Log the backup action to DbBackup
      await prisma.dbBackup.create({
        data: {
          filename: `balaji_db_backup_${Date.now()}.json`,
          fileSize: Buffer.byteLength(backupString),
          status: "COMPLETED",
          createdBy: auth.session?.user?.email || "Super Admin",
        },
      });

      return new Response(backupString, {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="balaji_backup_${Date.now()}.json"`,
        },
      });
    }

    // Default: Return list of database backup records
    const backups = await prisma.dbBackup.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ backups });
  } catch (error) {
    console.error("Backup Action Error:", error);
    return NextResponse.json({ error: "Failed to generate database backup snapshot" }, { status: 500 });
  }
}
