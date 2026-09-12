import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PublicForm } from "@/components/PublicForm";
import { prisma } from "@/lib/prisma";
import { Calendar, Tag, ArrowLeft, MessageCircle, Phone } from "lucide-react";

interface BlogDetailProps {
  params: { slug: string };
}

async function getBlogPost(slug: string) {
  try {
    const blog = await prisma.blogPost.findUnique({
      where: { slug },
    });
    if (blog) return blog;
  } catch (e) {}

  if (slug === "wedding-catering-menu-guide-dwarka") {
    return {
      id: "fallback-wedding-guide",
      title: "How to Design the Perfect Royal Wedding Menu in Dwarka & Delhi NCR",
      slug: "wedding-catering-menu-guide-dwarka",
      excerpt: "A step-by-step guide to balancing starters, main course, and dessert live counters for 100 to 1000+ wedding guests.",
      category: "Wedding Catering",
      createdAt: new Date(),
      coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1000",
      content: `
        <h3>1. Start with High-Impact Welcome Drinks & Starters</h3>
        <p>The first 45 minutes set the tone for your wedding reception. For couples planning <a href="/wedding-catering-dwarka" class="text-amber-800 font-semibold underline hover:text-amber-600">wedding catering in Dwarka</a> or grand receptions with <a href="/wedding-catering-gurugram" class="text-amber-800 font-semibold underline hover:text-amber-600">wedding catering in Gurugram</a>, offering 4 to 6 hot starters alongside refreshing mocktail stations ensures guests feel welcomed immediately. Popular choices include Paneer Tikka, Dahi Ke Kebab, and Crispy Spring Rolls.</p>
        
        <h3>2. Structure the Main Course Buffet</h3>
        <p>Ensure a balanced multi-cuisine main course containing rich gravy dishes (like Dal Makhani and Paneer Butter Masala), light vegetable options, aromatic rice (Biryani or Kashmiri Pulao), and freshly baked breads (Naan, Missi Roti, Tandoori Roti). You can view transparent per-plate pricing in our <a href="/packages" class="text-amber-800 font-semibold underline hover:text-amber-600">catering packages & pricing</a> guide.</p>
        
        <h3>3. Add Live Food Counters for Visual Appeal</h3>
        <p>Live stalls add energy to wedding functions. Consider incorporating live Delhi Chaat, Pasta counters, Dim Sum stations, or a South Indian Dosa counter provided by professional <a href="/catering-services-delhi-ncr" class="text-amber-800 font-semibold underline hover:text-amber-600">catering services in Delhi NCR</a>.</p>
        
        <h3>4. Don't Compromise on Desserts</h3>
        <p>End the meal on a sweet note with traditional hot Halwa (Moong Dal or Gajar), Gulab Jamun, Kulfi, and live Ice Cream counters.</p>
      `,
    };
  }

  if (slug === "puja-kirtan-satvik-catering-tips") {
    return {
      id: "fallback-puja-guide",
      title: "Puja & Kirtan Catering Guide: Satvik & No Onion-Garlic Essentials",
      slug: "puja-kirtan-satvik-catering-tips",
      excerpt: "Important guidelines for preparing traditional Prashad, Bedmi Poori, and Satvik thalis for Mata Ki Chowki & Sundarkand Path.",
      category: "Religious Events",
      createdAt: new Date(),
      coverImage: "https://images.unsplash.com/photo-1533144893879-c65f9d453392?w=1000",
      content: `
        <h3>1. Purity and Sanctity in Preparation</h3>
        <p>Religious ceremonies like Mata Ki Chowki, Sundarkand, and Griha Pravesh demand strict purity. Our specialized <a href="/puja-kirtan-catering-delhi-ncr" class="text-amber-800 font-semibold underline hover:text-amber-600">Satvik puja catering in Delhi NCR</a> prepares prasadam and traditional feasts with dedicated pure-vegetarian utensils and zero onion or garlic.</p>
        
        <h3>2. Traditional Prasadam & Feast Menus</h3>
        <p>Popular Satvik menus include Desi Ghee Halwa, Poori, Aloo Tamatar Sabzi, Chana Prashad, and Kheer. Explore full menu options on our <a href="/catering-services-delhi-ncr" class="text-amber-800 font-semibold underline hover:text-amber-600">catering services page</a>.</p>
      `,
    };
  }

  if (slug === "small-gathering-catering-guest-calculator") {
    return {
      id: "fallback-small-gathering-guide",
      title: "Catering Food Quantity Guide for 50, 100 & 200 Guests",
      slug: "small-gathering-catering-guest-calculator",
      excerpt: "Avoid food waste and shortage with our expert guest quantity planning formulas for house parties and anniversary functions.",
      category: "Planning Tips",
      createdAt: new Date(),
      coverImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000",
      content: `
        <h3>1. Calculating Portions for Home Parties</h3>
        <p>Hosting 20 to 100 guests at home requires smart portion calculation. For intimate home functions, see our <a href="/small-gathering-catering-dwarka" class="text-amber-800 font-semibold underline hover:text-amber-600">small gathering catering in Dwarka</a> options, or plan your next milestone event with our <a href="/birthday-catering-dwarka" class="text-amber-800 font-semibold underline hover:text-amber-600">birthday party catering in Dwarka</a> team.</p>
        
        <h3>2. Estimating Per-Plate Pricing</h3>
        <p>Compare menu combinations and per-plate rates on our <a href="/packages" class="text-amber-800 font-semibold underline hover:text-amber-600">catering packages page</a>.</p>
      `,
    };
  }

  return null;
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const blog = await getBlogPost(params.slug);

  if (!blog) {
    return {
      title: "Article Not Found | Verma Caterers",
    };
  }

  return {
    title: `${blog.title} | Verma Caterers`,
    description: blog.excerpt || blog.title,
    alternates: {
      canonical: `https://vermacaterersevents.com/blogs/${params.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      images: blog.coverImage ? [{ url: blog.coverImage }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const blog = await getBlogPost(params.slug);

  if (!blog) {
    notFound();
  }

  let services: any[] = [];
  let settings: any = null;

  try {
    services = await prisma.service.findMany({ where: { isActive: true } });
    settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  } catch (e) {}

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.coverImage || "https://vermacaterersevents.com/verma-logo-512.png",
    "datePublished": blog.createdAt || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Verma Caterers & Events"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Verma Caterers & Events",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vermacaterersevents.com/verma-logo-512.png"
      }
    },
    "description": blog.excerpt || blog.title
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Guides
          </Link>

          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                {blog.category || "Catering Guide"}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(blog.createdAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">
              {blog.title}
            </h1>
          </header>

          {blog.coverImage && (
            <div className="relative h-[320px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body Content */}
          <div
            className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Call to Action Box inside Article */}
          <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white p-8 rounded-3xl space-y-4 border border-amber-500/30 shadow-xl my-12">
            <h3 className="text-xl font-serif font-bold text-amber-300">
              Planning a Wedding, Birthday, or Event in Delhi NCR?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Get customized catering menus, live counter setups, and instant per-plate quotes from Verma Caterers. Serving Dwarka, Gurugram, and all Delhi NCR regions.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://wa.me/919810483544?text=Hello%20Verma%20Caterers!%20I%20read%20your%20guide%20and%20want%20to%20request%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Direct WhatsApp Quote
              </a>
              <a
                href="tel:+919810483544"
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call +91 98104 83544
              </a>
            </div>
          </div>
        </article>

        <section className="max-w-4xl mx-auto px-6 py-8">
          <PublicForm whatsappNumber="919810483544" availableServices={services} settings={settings} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
