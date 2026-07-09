import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PackagesPageClient } from "@/components/PackagesPageClient";

export const revalidate = 0; // Fresh content on each request

export default async function PackagesPage() {
  let packages: any[] = [];
  let settings: any = null;

  try {
    packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });
  } catch (e) {
    console.error("Failed to fetch packages for public page:", e);
  }

  const cleanPackages = packages.map(pkg => ({
    ...pkg,
    pricePerPerson: Number(pkg.pricePerPerson),
    discountValue: Number(pkg.discountValue),
    discountedPrice: Number(pkg.discountedPrice),
  }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between transition-colors">
      <div>
        <Header />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent dark:from-amber-950/20 dark:via-orange-950/10 py-20 px-6">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white">
              Our Premium Catering Packages
            </h1>
            <p className="max-w-2xl mx-auto text-sm text-slate-600 dark:text-slate-450">
              Explore our curated catering menus tailormade for weddings, corporate galas, birthday bashes, and intimate family gatherings.
            </p>
          </div>
        </section>

        {/* Packages Grid client */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <PackagesPageClient packages={cleanPackages} />
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
