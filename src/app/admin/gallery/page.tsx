"use client";

import { useEffect, useState } from "react";
import { Upload, Plus, Trash2, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";

export default function GalleryAdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Wedding");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/admin/gallery", { credentials: "include" });
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch (e) {
      console.error("Failed to fetch gallery", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image file to upload");
      return;
    }

    setSubmitting(true);
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("category", category);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok && result.item) {
        setItems((prev) => [result.item, ...prev]);
        setSuccessMsg("✅ Image uploaded and published to gallery!");
        setModalOpen(false);
        setTitle("");
        setSelectedFile(null);
        setPreviewUrl(null);
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (e: any) {
      alert(e.message || "Error uploading image");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, photoTitle: string) => {
    if (!confirm(`Remove photo "${photoTitle}" from gallery?`)) return;

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        credentials: "include",
      });

      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (e) {
      alert("Error deleting photo");
    }
  };

  const formatImageUrl = (url: string) => {
    if (!url) return "/new-logo.png";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
      return url;
    }
    return `/${url}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            Portfolio & Gallery Management
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Upload new event photos, mandap setups, and food spreads directly from your device.
          </p>
        </div>

        <button
          onClick={() => {
            setTitle("");
            setSelectedFile(null);
            setPreviewUrl(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-amber-500/20"
        >
          <Upload className="w-4 h-4" /> Upload New Photo
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-500" />
          <p className="text-sm">Loading gallery photos...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-semibold">No portfolio photos uploaded yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click "Upload New Photo" above to add your first photo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm group relative flex flex-col justify-between"
            >
              <div className="h-52 relative bg-slate-100 overflow-hidden">
                <img
                  src={formatImageUrl(item.imageUrl)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/new-logo.png";
                  }}
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold shadow-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex items-center justify-between border-t border-slate-100 bg-white">
                <h4 className="font-bold text-sm text-slate-900 truncate">{item.title}</h4>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  title="Delete photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                Upload Portfolio Photo
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Royal Wedding Mandap Decor"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Floral">Floral</option>
                  <option value="Catering">Catering</option>
                  <option value="DJ & Sound">DJ & Sound</option>
                  <option value="Birthday">Birthday</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Image File *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors">
                  <div className="space-y-2 text-center">
                    {previewUrl ? (
                      <div className="space-y-2">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto h-32 w-full object-cover rounded-xl shadow-sm border border-slate-200"
                        />
                        <p className="text-xs text-slate-500 truncate max-w-[200px] mx-auto">
                          {selectedFile?.name}
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-8 w-8 text-slate-400" />
                        <div className="flex text-xs text-slate-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-bold text-amber-600 hover:text-amber-500 focus-within:outline-none">
                            <span>Choose image file</span>
                            <input
                              type="file"
                              accept="image/*"
                              required
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag & drop</p>
                        </div>
                        <p className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
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
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Upload & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
