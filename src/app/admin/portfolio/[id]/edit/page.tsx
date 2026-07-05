"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Loader2,
  Sparkles,
  Save,
  Tag,
  FolderKanban,
} from "lucide-react";
import { PortfolioCategoryData } from "@/types/portfolio";

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [categories, setCategories] = useState<PortfolioCategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [altText, setAltText] = useState("");

  // Upload States
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, portRes] = await Promise.all([
          fetch("/api/admin/categories", { credentials: "include" }),
          fetch(`/api/admin/portfolios/${id}`, { credentials: "include" }),
        ]);

        const catData = await catRes.json();
        const portData = await portRes.json();

        if (catData.categories) setCategories(catData.categories);

        if (portData.portfolio) {
          const item = portData.portfolio;
          setTitle(item.title);
          setSlug(item.slug);
          setCategoryId(item.categoryId);
          setShortDescription(item.shortDescription || "");
          setLongDescription(item.longDescription || "");
          setCoverImage(item.coverImage || "");
          setGalleryImages(item.galleryImages || []);
          setTagsInput(Array.isArray(item.tags) ? item.tags.join(", ") : "");
          setFeatured(item.featured || false);
          setActive(item.active !== undefined ? item.active : true);
          setDisplayOrder(item.displayOrder || 0);
          setSeoTitle(item.seoTitle || "");
          setSeoDescription(item.seoDescription || "");
          setAltText(item.altText || "");
        }
      } catch (err) {
        console.error("Error loading portfolio data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setCoverImage(data.url);
      } else {
        alert(data.error || "Failed to upload cover image");
      }
    } catch (err) {
      alert("Error uploading file");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.urls) {
        setGalleryImages((prev) => [...prev, ...data.urls]);
      } else {
        alert(data.error || "Failed to upload gallery images");
      }
    } catch (err) {
      alert("Error uploading gallery files");
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title || !categoryId || !coverImage || !shortDescription) {
      setErrorMsg("Please fill in Title, Category, Cover Image, and Short Description.");
      return;
    }

    setSubmitting(true);

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title,
      slug,
      categoryId,
      shortDescription,
      longDescription: longDescription || shortDescription,
      coverImage,
      galleryImages,
      featuredImage: coverImage,
      altText: altText || title,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || shortDescription,
      tags: tagsArray,
      featured,
      active,
      displayOrder,
    };

    try {
      const res = await fetch(`/api/admin/portfolios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/portfolio");
      } else {
        setErrorMsg(data.error || "Failed to update portfolio");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-500" />
        <p className="text-sm">Loading portfolio item details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/portfolio"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-amber-600"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio List
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
          <FolderKanban className="w-6 h-6 text-amber-500" /> Edit Portfolio: {title}
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Update images, gallery items, category assignment, and SEO meta values.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
          ❌ {errorMsg}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        {/* Section 1: Basic Info */}
        <div className="space-y-6">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-600 border-b border-slate-100 pb-2">
            1. Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-mono focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-6 pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400"
                />
                <Sparkles className="w-4 h-4 text-amber-500" /> Featured Item
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-400"
                />
                Published
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Short Description *</label>
            <textarea
              rows={2}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
            <textarea
              rows={5}
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Section 2: Media */}
        <div className="space-y-6">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-600 border-b border-slate-100 pb-2">
            2. Cover & Gallery Media
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Cover Image *</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {coverImage ? (
                <div className="w-32 h-24 rounded-2xl overflow-hidden bg-slate-100 relative border border-slate-200 flex-shrink-0">
                  <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setCoverImage("")}
                    className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full hover:bg-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="w-full sm:w-64 h-24 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center cursor-pointer transition-colors">
                  {uploadingCover ? (
                    <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs font-bold text-amber-600">Upload Cover Image</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleCoverUpload} className="sr-only" />
                </label>
              )}

              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Photo Gallery ({galleryImages.length} images)
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {galleryImages.map((imgUrl, idx) => (
                <div key={idx} className="relative h-28 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <label className="h-28 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center cursor-pointer transition-colors">
                {uploadingGallery ? (
                  <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                ) : (
                  <>
                    <Plus className="w-6 h-6 text-amber-600 mb-1" />
                    <span className="text-xs font-bold text-amber-600">Add Photos</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Section 3: SEO */}
        <div className="space-y-6">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-600 border-b border-slate-100 pb-2">
            3. Search Engine Optimization (SEO)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">SEO Meta Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Image Alt Text</label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">SEO Meta Description</label>
            <textarea
              rows={2}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end border-t border-slate-100">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-sm font-bold shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Update Portfolio
          </button>
        </div>
      </form>
    </div>
  );
}
