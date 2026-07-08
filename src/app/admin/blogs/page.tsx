"use client";

import { useEffect, useState } from "react";
import { BookOpen, Plus, Trash2, Edit2, Loader2, CheckCircle2, AlertCircle, Upload, Eye, Calendar, User } from "lucide-react";

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("Catering Guide");
  const [tagsInput, setTagsInput] = useState("");
  const [authorName, setAuthorName] = useState("Sandeep Verma");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [publishDate, setPublishDate] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const categories = ["Catering Guide", "Decor Ideas", "Wedding Planning", "Food Trends", "News & Event"];

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      if (data.blogs) setBlogs(data.blogs);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setContent("");
    setExcerpt("");
    setCoverImage("");
    setCategory("Catering Guide");
    setTagsInput("");
    setAuthorName("Sandeep Verma");
    setSeoTitle("");
    setSeoDescription("");
    setIsFeatured(false);
    setIsActive(true);
    setPublishDate(new Date().toISOString().substring(0, 16));
    setModalOpen(true);
  };

  const openEditModal = (b: any) => {
    setEditingId(b.id);
    setTitle(b.title);
    setSlug(b.slug || "");
    setContent(b.content || "");
    setExcerpt(b.excerpt || "");
    setCoverImage(b.coverImage || "");
    setCategory(b.category || "Catering Guide");
    // Parse tags JSON or display as comma-separated
    try {
      const parsedTags = JSON.parse(b.tags);
      setTagsInput(Array.isArray(parsedTags) ? parsedTags.join(", ") : "");
    } catch {
      setTagsInput("");
    }
    setAuthorName(b.authorName || "Sandeep Verma");
    setSeoTitle(b.seoTitle || "");
    setSeoDescription(b.seoDescription || "");
    setIsFeatured(b.isFeatured ?? false);
    setIsActive(b.isActive ?? true);
    setPublishDate(new Date(b.publishDate || b.createdAt).toISOString().substring(0, 16));
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setCoverImage(data.url);
      } else {
        setErrorMsg(data.error || "Failed to upload cover image");
      }
    } catch (err) {
      setErrorMsg("Error uploading blog cover image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    // Process tags
    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      const res = await fetch("/api/admin/blogs", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          title,
          slug,
          content,
          excerpt,
          coverImage,
          category,
          tags: JSON.stringify(tagsArray),
          authorName,
          seoTitle: seoTitle || title,
          seoDescription: seoDescription || excerpt,
          isFeatured,
          isActive,
          publishDate: new Date(publishDate).toISOString(),
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setSuccessMsg(editingId ? "Blog post updated successfully!" : "New blog post published!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchBlogs();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save blog post");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving blog post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, blogTitle: string) => {
    if (!confirm(`Delete blog post: "${blogTitle}"?`)) return;

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        setSuccessMsg("Blog post deleted.");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      alert("Error deleting blog post");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-500" /> Blog Guide CMS
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Publish catering manuals, decorating advice, wedding checklists, and company announcements for customers and SEO indexing.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" /> Write Blog Post
        </button>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 border border-emerald-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-800 text-xs font-bold rounded-2xl flex items-center gap-2 border border-red-100">
          <AlertCircle className="w-4 h-4 text-red-600" /> {errorMsg}
        </div>
      )}

      {/* Grid List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400">
          No blog posts published yet. Write your first post to educate readers.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((b) => (
            <div
              key={b.id}
              className={`bg-white border rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all ${
                !b.isActive ? "border-slate-100 bg-slate-50/50 opacity-75" : "border-slate-200"
              }`}
            >
              <div>
                <div className="h-44 w-full bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                  {b.coverImage ? (
                    <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover" />
                  ) : (
                    <BookOpen className="w-16 h-16 text-slate-300" />
                  )}
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {b.category}
                  </span>
                  {b.isFeatured && (
                    <span className="absolute top-3 right-3 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(b.publishDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {b.authorName}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 text-base leading-snug line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{b.excerpt || b.content}</p>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold truncate max-w-[50%]">
                  Slug: /{b.slug}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={`/blogs/${b.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors bg-white"
                    title="View post on website"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => openEditModal(b)}
                    className="p-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors bg-white"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id, b.title)}
                    className="p-2 border border-red-100 hover:bg-red-50 text-red-500 rounded-xl transition-colors bg-white"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">
              {editingId ? "Edit Blog Post" : "Write Blog Post"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Post Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 10 Indian Wedding Food Ideas for 2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Slug (URL Path) - Auto-generated if empty</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. indian-wedding-food-ideas-2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cover Image</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="/uploads/blog-cover.jpg"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs"
                    />
                    <label className="flex-shrink-0 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl px-4 py-3 flex items-center justify-center cursor-pointer transition-colors">
                      {uploading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                      ) : (
                        <Upload className="w-4 h-4 text-slate-600" />
                      )}
                      <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Excerpt (Summary)</label>
                <input
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Provide a quick summary of the article (displays in cards)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Post Content * (Text or HTML)</label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the full body content here..."
                  rows={8}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="wedding, catering, sweets"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Publish Date / Time</label>
                  <input
                    type="datetime-local"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* SEO settings panel */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">SEO Metadata Override (Optional)</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">SEO Title Tag</label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="Title tag override"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">SEO Meta Description</label>
                    <input
                      type="text"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder="Description override"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="isFeatured" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Pin to Featured Posts
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="isActive" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Publish Immediately
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
