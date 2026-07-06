"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Megaphone, Plus, Trash2, Edit2, Loader2, Eye, EyeOff,
  ExternalLink, Upload, Calendar, ArrowUpDown, Image as ImageIcon,
} from "lucide-react";

export default function AdvertisementsAdminPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brandName, setBrandName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [ctaText, setCtaText] = useState("Learn More");
  const [isEnabled, setIsEnabled] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAds = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/advertisements");
      const data = await res.json();
      if (data.ads) setAds(data.ads);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setBrandName("");
    setImageUrl("");
    setRedirectUrl("");
    setCtaText("Learn More");
    setIsEnabled(true);
    setStartDate("");
    setEndDate("");
    setDisplayOrder(0);
  };

  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (ad: any) => {
    setEditingId(ad.id);
    setTitle(ad.title);
    setDescription(ad.description || "");
    setBrandName(ad.brandName || "");
    setImageUrl(ad.imageUrl);
    setRedirectUrl(ad.redirectUrl || "");
    setCtaText(ad.ctaText || "Learn More");
    setIsEnabled(ad.isEnabled);
    setStartDate(ad.startDate ? new Date(ad.startDate).toISOString().split("T")[0] : "");
    setEndDate(ad.endDate ? new Date(ad.endDate).toISOString().split("T")[0] : "");
    setDisplayOrder(ad.displayOrder);
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admin/media");

    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable) {
        setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
      }
    };

    xhr.onload = () => {
      setUploading(false);
      setUploadProgress(0);
      if (xhr.status === 200 || xhr.status === 201) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.url) setImageUrl(data.url);
        } catch {}
      } else {
        setErrorMsg("Image upload failed. Try again.");
        setTimeout(() => setErrorMsg(""), 4000);
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      setUploadProgress(0);
      setErrorMsg("Image upload failed.");
      setTimeout(() => setErrorMsg(""), 4000);
    };

    xhr.send(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/advertisements", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          title,
          description,
          brandName,
          imageUrl,
          redirectUrl,
          ctaText,
          isEnabled,
          startDate: startDate || null,
          endDate: endDate || null,
          displayOrder,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setSuccessMsg(editingId ? "Advertisement updated!" : "New advertisement created!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchAds();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving advertisement");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (ad: any) => {
    try {
      await fetch("/api/admin/advertisements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ad.id, isEnabled: !ad.isEnabled }),
      });
      fetchAds();
    } catch {}
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete advertisement "${name}"?`)) return;
    try {
      const res = await fetch("/api/admin/advertisements", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setSuccessMsg(`Advertisement "${name}" deleted.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchAds();
      }
    } catch {
      alert("Failed to delete advertisement");
    }
  };

  const getScheduleStatus = (ad: any) => {
    if (!ad.startDate && !ad.endDate) return { label: "Always Active", color: "bg-emerald-100 text-emerald-700" };
    const now = new Date();
    const start = ad.startDate ? new Date(ad.startDate) : null;
    const end = ad.endDate ? new Date(ad.endDate) : null;
    if (start && now < start) return { label: "Scheduled", color: "bg-blue-100 text-blue-700" };
    if (end && now > end) return { label: "Expired", color: "bg-red-100 text-red-700" };
    return { label: "Live", color: "bg-emerald-100 text-emerald-700" };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-amber-500" /> Advertisement Banners
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Create, schedule, and manage promotional banners displayed on the homepage.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" /> New Advertisement
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl">
          ✓ {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-bold rounded-2xl">
          ⚠ {errorMsg}
        </div>
      )}

      {/* Ads Grid */}
      {ads.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
          <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">No advertisements yet. Click "New Advertisement" to create your first banner.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ads.map((ad) => {
            const schedule = getScheduleStatus(ad);
            return (
              <div
                key={ad.id}
                className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${
                  ad.isEnabled ? "border-slate-200" : "border-slate-200 opacity-60"
                }`}
              >
                {/* Banner Preview */}
                <div className="h-40 bg-slate-100 relative overflow-hidden">
                  {ad.imageUrl ? (
                    <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-slate-300" />
                    </div>
                  )}
                  {/* Ad label */}
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                    Advertisement
                  </span>
                  {/* Schedule badge */}
                  <span className={`absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${schedule.color}`}>
                    {schedule.label}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-base leading-snug">{ad.title}</h3>
                    {ad.brandName && (
                      <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider mt-0.5">{ad.brandName}</p>
                    )}
                    {ad.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ad.description}</p>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <ArrowUpDown className="w-2.5 h-2.5" /> Order: {ad.displayOrder}
                    </span>
                    {ad.redirectUrl && (
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <ExternalLink className="w-2.5 h-2.5" /> {ad.ctaText}
                      </span>
                    )}
                    {(ad.startDate || ad.endDate) && (
                      <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {ad.startDate ? new Date(ad.startDate).toLocaleDateString("en-IN") : "—"} →{" "}
                        {ad.endDate ? new Date(ad.endDate).toLocaleDateString("en-IN") : "∞"}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleToggle(ad)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                        ad.isEnabled
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {ad.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {ad.isEnabled ? "Active" : "Disabled"}
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(ad)}
                        className="p-2 border border-slate-100 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors bg-white"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(ad.id, ad.title)}
                        className="p-2 border border-red-100 hover:bg-red-50 text-red-500 rounded-xl transition-colors bg-white"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-5">
              {editingId ? "Edit Advertisement" : "Create New Advertisement"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Banner Image */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Banner Image *</label>
                {imageUrl && (
                  <div className="mb-2 rounded-2xl overflow-hidden border border-slate-200 relative h-40">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                      Preview
                    </span>
                  </div>
                )}
                <div className="flex gap-3 items-center">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 bg-slate-50 border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-2xl py-3 px-4 text-xs font-bold text-slate-500 hover:text-amber-600 transition-colors">
                      <Upload className="w-4 h-4" /> {uploading ? `Uploading ${uploadProgress}%` : "Upload Image"}
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <span className="text-slate-400 text-[10px] font-bold">OR</span>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Paste image URL..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                {uploading && (
                  <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                  </div>
                )}
              </div>

              {/* Title & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ad Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Summer Special Offer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product / Brand Name</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="XYZ Brand"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief promotional text..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                />
              </div>

              {/* Redirect URL & CTA Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Redirect URL</label>
                  <input
                    type="url"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="Learn More"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Enable toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEnabled(!isEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isEnabled ? "bg-amber-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                      isEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-xs font-bold text-slate-700">
                  {isEnabled ? "Enabled — Banner is visible" : "Disabled — Banner is hidden"}
                </span>
              </div>

              {/* Actions */}
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
                  disabled={submitting || !imageUrl}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {editingId ? "Update Advertisement" : "Create Advertisement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
