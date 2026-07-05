"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Sparkles,
  Images,
  Layers,
  Loader2,
  CheckCircle2,
  FolderKanban,
  ExternalLink,
} from "lucide-react";
import { PortfolioData, PortfolioCategoryData } from "@/types/portfolio";

export default function PortfolioAdminPage() {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const [categories, setCategories] = useState<PortfolioCategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [actionMsg, setActionMsg] = useState("");

  const fetchData = async () => {
    try {
      const [portRes, catRes] = await Promise.all([
        fetch("/api/admin/portfolios", { credentials: "include" }),
        fetch("/api/admin/categories", { credentials: "include" }),
      ]);
      const portData = await portRes.json();
      const catData = await catRes.json();

      if (portData.portfolios) setPortfolios(portData.portfolios);
      if (catData.categories) setCategories(catData.categories);
    } catch (e) {
      console.error("Failed to fetch admin portfolio data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/portfolios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentActive }),
        credentials: "include",
      });
      if (res.ok) {
        setPortfolios((prev) =>
          prev.map((item) => (item.id === id ? { ...item, active: !currentActive } : item))
        );
        setActionMsg("✅ Status updated");
        setTimeout(() => setActionMsg(""), 3000);
      }
    } catch (e) {
      alert("Failed to toggle status");
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/admin/portfolios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentFeatured }),
        credentials: "include",
      });
      if (res.ok) {
        setPortfolios((prev) =>
          prev.map((item) => (item.id === id ? { ...item, featured: !currentFeatured } : item))
        );
        setActionMsg("✅ Featured toggle updated");
        setTimeout(() => setActionMsg(""), 3000);
      }
    } catch (e) {
      alert("Failed to toggle featured status");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete portfolio item "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/portfolios/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setPortfolios((prev) => prev.filter((item) => item.id !== id));
        setActionMsg("✅ Portfolio deleted successfully");
        setTimeout(() => setActionMsg(""), 3000);
      }
    } catch (e) {
      alert("Failed to delete portfolio");
    }
  };

  const filteredPortfolios = portfolios.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.categoryId === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-amber-500" /> Enterprise Portfolio Manager
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage projects, upload gallery images, configure featured hero slides, and edit SEO settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/portfolio/categories"
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Layers className="w-4 h-4 text-amber-500" /> Manage Categories
          </Link>

          <Link
            href="/admin/portfolio/new"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add New Portfolio
          </Link>
        </div>
      </div>

      {actionMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionMsg}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="md:col-span-6 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex-shrink-0">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.categoryName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Portfolio Table / Grid */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-500" />
          <p className="text-sm">Loading portfolios...</p>
        </div>
      ) : filteredPortfolios.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-semibold">No portfolio items found.</p>
          <p className="text-xs text-slate-400 mt-1">Click "Add New Portfolio" above to create your first portfolio.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                  <th className="py-4 px-6">Portfolio Item</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Gallery</th>
                  <th className="py-4 px-4">Featured</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredPortfolios.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Item Cover & Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                          <img
                            src={item.coverImage || "/new-logo.png"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">/portfolio/{item.slug}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      {item.category ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">
                          <span>{item.category.icon}</span>
                          <span>{item.category.categoryName}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">Uncategorized</span>
                      )}
                    </td>

                    {/* Gallery Count */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 text-slate-600 font-bold">
                        <Images className="w-3.5 h-3.5 text-amber-500" />
                        <span>{item.galleryImages ? item.galleryImages.length : 0}</span>
                      </span>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleFeatured(item.id, item.featured)}
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1 ${
                          item.featured
                            ? "bg-amber-500 text-slate-950 shadow-sm"
                            : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        {item.featured ? "Featured" : "Regular"}
                      </button>
                    </td>

                    {/* Active Toggle */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleActive(item.id, item.active)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                          item.active
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-rose-100 text-rose-800 border border-rose-200"
                        }`}
                      >
                        {item.active ? "Active" : "Disabled"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/portfolio/${item.slug}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="View live page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/admin/portfolio/${item.id}/edit`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit portfolio"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete portfolio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
