import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PackagesPageClient } from "@/components/PackagesPageClient";

export const revalidate = 0; // Fresh content on each request

export const metadata: Metadata = {
  title: "Catering Packages & Per Plate Pricing | Verma Caterers Delhi NCR",
  description:
    "Explore transparent catering packages for weddings, corporate galas & birthdays across Delhi, Dwarka & Gurugram. Multi-cuisine menus, live counters & custom budget quotes.",
  alternates: {
    canonical: "https://vermacaterersevents.com/packages",
  },
  openGraph: {
    title: "Catering Packages & Per Plate Pricing | Verma Caterers Delhi NCR",
    description:
      "Explore transparent catering packages for weddings, corporate galas & birthdays across Delhi, Dwarka & Gurugram. Multi-cuisine menus, live counters & custom quotes.",
    url: "https://vermacaterersevents.com/packages",
    siteName: "Verma Caterers",
    images: [
      {
        url: "/verma-logo-512.png",
        width: 512,
        height: 512,
        alt: "Verma Caterers Logo",
      },
    ],
  },
};

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

  const cleanPackages = packages.map((pkg) => ({
    ...pkg,
    pricePerPerson: Number(pkg.pricePerPerson),
    discountValue: Number(pkg.discountValue),
    discountedPrice: Number(pkg.discountedPrice),
  }));

  const packagesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://vermacaterersevents.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Catering Packages",
            "item": "https://vermacaterersevents.com/packages"
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Catering Packages & Pricing",
        "description": "Customizable multi-cuisine catering packages for weddings, corporate dining, and private events in Delhi NCR.",
        "itemListElement": cleanPackages.map((pkg, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "Offer",
            "name": pkg.name,
            "description": pkg.description,
            "price": pkg.discountedPrice || pkg.pricePerPerson,
            "priceCurrency": "INR",
            "url": "https://vermacaterersevents.com/packages",
            "seller": {
              "@type": "Caterer",
              "name": "Verma Caterers & Events"
            }
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packagesSchema) }}
      />
      <div>
        <Header />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent py-20 px-6">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
              Our Premium Catering Packages
            </h1>
            <p className="max-w-2xl mx-auto text-sm text-slate-600">
              Explore our curated catering menus tailormade for weddings, corporate galas, birthday bashes, and intimate family gatherings.
            </p>
          </div>
        </section>

        {/* Packages Grid client */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <PackagesPageClient
            packages={cleanPackages}
            whatsapp={settings?.whatsappNumber}
            phone={settings?.phone}
          />
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
