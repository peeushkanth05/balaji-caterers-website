import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import { PackagesPageClient } from "@/components/PackagesPageClient";
import { Phone, Mail, MapPin } from "lucide-react";

export const revalidate = 0; // Fresh content on each request

export default async function PackagesPage() {
  let packages: any[] = [];
  let settings: any = null;

  try {
    packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" },
    });
    settings = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });
  } catch (e) {
    console.error("Failed to fetch packages for public page:", e);
  }

  const phone = settings?.phone || "+91 98104 83544";
  const email = settings?.email || "vermasandeep124@gmail.com";
  const address = settings?.address || "Dwarka Sector 5, Madhu Vihar, New Delhi";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <Header />

      {/* Hero Banner / Header Section */}
      <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 px-3.5 py-1.5 bg-amber-100 rounded-full border border-amber-200">
            Our Menu & Packages
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900">
            Premium Catering Packages
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Explore our curated culinary packages or build a customized menu tailored for your special occasion. We cater for weddings, corporate events, and parties in Delhi NCR.
          </p>
        </div>

        {/* Client side interactive list and filter */}
        <PackagesPageClient packages={packages} />
      </div>

      {/* Contact Banner */}
      <section className="bg-amber-500 text-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif font-bold">Need a Custom Menu or Quote?</h2>
          <p className="text-amber-50 text-sm max-w-lg mx-auto">
            Every event is unique. Contact Sandeep Verma directly to design a custom menu package fitting your budget and style.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href={`tel:${phone}`}
              className="px-6 py-3 bg-white text-amber-600 rounded-xl font-bold text-sm shadow-md hover:bg-slate-50 transition-colors"
            >
              Call: {phone}
            </a>
            <a
              href="/#contact"
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-md hover:bg-slate-800 transition-colors"
            >
              Request Call Back
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="font-serif font-bold text-white text-lg">Shree Balaji Caterers</div>
            <p className="text-xs text-slate-500 mt-1">{address}</p>
          </div>
          <div className="text-xs text-slate-500">
            &copy; 2026 Shree Balaji Caterers. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
