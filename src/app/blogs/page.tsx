import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { BookOpen, Calendar, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Catering Guides & Event Planning Blogs | Verma Caterers",
  description:
    "Explore expert guides on wedding menu planning, puja catering checklists, corporate event tips, and guest quantity calculators in Dwarka & Delhi NCR.",
  alternates: {
    canonical: "https://vermacaterersevents.com/blogs",
  },
};

export default async function BlogsListingPage() {
  let blogs: any[] = [];
  try {
    blogs = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Error fetching blogs:", e);
  }

  // Sample static blogs if database is empty to ensure high value content
  const fallbackBlogs = [
    {
      id: "b1",
      slug: "wedding-catering-menu-guide-dwarka",
      title: "How to Design the Perfect Royal Wedding Menu in Dwarka & Delhi NCR",
      excerpt: "A step-by-step guide to balancing starters, main course, and dessert live counters for 100 to 1000+ wedding guests.",
      category: "Wedding Catering",
      publishedAt: new Date().toISOString(),
      coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600",
    },
    {
      id: "b2",
      slug: "puja-kirtan-satvik-catering-tips",
      title: "Puja & Kirtan Catering Guide: Satvik & No Onion-Garlic Essentials",
      excerpt: "Important guidelines for preparing traditional Prashad, Bedmi Poori, and Satvik thalis for Mata Ki Chowki & Sundarkand Path.",
      category: "Religious Events",
      publishedAt: new Date().toISOString(),
      coverImage: "https://images.unsplash.com/photo-1533144893879-c65f9d453392?w=600",
    },
    {
      id: "b3",
      slug: "small-gathering-catering-guest-calculator",
      title: "Catering Food Quantity Guide for 50, 100 & 200 Guests",
      excerpt: "Avoid food waste and shortage with our expert guest quantity planning formulas for house parties and anniversary functions.",
      category: "Planning Tips",
      publishedAt: new Date().toISOString(),
      coverImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
    },
  ];

  const displayBlogs = blogs.length > 0 ? blogs : fallbackBlogs;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <section className="bg-gradient-to-b from-amber-500/10 via-slate-50 to-white py-16 px-6 border-b border-slate-200">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 inline-flex items-center gap-1.5 bg-amber-100 px-3.5 py-1 rounded-full">
              <BookOpen className="w-4 h-4" /> Catering & Event Guides
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900">
              Planning Tips, Menu Ideas & Event Insights
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Read practical advice from Delhi NCR’s premier caterers on choosing food menus, budget planning, live counter trends, and holy function requirements.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBlogs.map((b) => (
              <article
                key={b.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={b.coverImage || "https://images.unsplash.com/photo-1555244162-803834f70033?w=600"}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      {b.category || "Catering Guide"}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(b.publishedAt || b.createdAt || Date.now()).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <h2 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                      {b.title}
                    </h2>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {b.excerpt || b.content?.substring(0, 120) + "..."}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/blogs/${b.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:underline"
                  >
                    Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
