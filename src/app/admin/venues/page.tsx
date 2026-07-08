"use client";

import { useEffect, useState } from "react";
import { Building2, Plus, Trash2, Edit2, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff, Upload, ExternalLink } from "lucide-react";

export default function VenuesAdminPage() {
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [priority, setPriority] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchVenues = async () => {
    try {
      const res = await fetch("/api/admin/venues");
      const data = await res.json();
      if (data.venues) setVenues(data.venues);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load venue partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setLogoUrl("");
    setWebsiteUrl("");
    setDescription("");
    setAddress("");
    setPriority(venues.length + 1);
    setIsFeatured(false);
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (v: any) => {
    setEditingId(v.id);
    setName(v.name);
    setLogoUrl(v.logoUrl || "");
    setWebsiteUrl(v.websiteUrl || "");
    setDescription(v.description || "");
    setAddress(v.address || "");
    setPriority(v.priority ?? 0);
    setIsFeatured(v.isFeatured ?? false);
    setIsActive(v.isActive ?? true);
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
        setLogoUrl(data.url);
      } else {
        setErrorMsg(data.error || "Failed to upload logo image");
      }
    } catch (err) {
      setErrorMsg("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/venues", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          name,
          logoUrl,
          websiteUrl,
          description,
          address,
          priority: Number(priority),
          isFeatured,
          isActive,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setSuccessMsg(editingId ? "Venue updated successfully!" : "New venue partner created!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchVenues();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save venue");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving venue");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, venueName: string) => {
    if (!confirm(`Delete venue partner: "${venueName}"?`)) return;

    try {
      const res = await fetch("/api/admin/venues", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setVenues((prev) => prev.filter((v) => v.id !== id));
        setSuccessMsg("Venue partner deleted.");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      alert("Error deleting venue partner");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-amber-500" /> Venue Partners CMS
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage partner banquet halls, farmhouses, and venues displayed in the horizontal marquee on the website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" /> Add Venue Partner
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

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : venues.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400">
          No venue partners added yet. Click "Add Venue Partner" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {venues.map((v) => (
            <div
              key={v.id}
              className={`bg-white border rounded-3xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                !v.isActive ? "border-slate-100 bg-slate-50/50 opacity-75" : "border-slate-200"
              }`}
            >
              <div>
                <div className="relative h-32 w-full bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100">
                  {v.logoUrl ? (
                    <img src={v.logoUrl} alt={v.name} className="max-h-24 max-w-[90%] object-contain" />
                  ) : (
                    <Building2 className="w-12 h-12 text-slate-300" />
                  )}
                  {v.isFeatured && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="font-serif font-bold text-slate-900 text-base">{v.name}</h3>
                  {v.address && <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-1">{v.address}</p>}
                  {v.websiteUrl && (
                    <a
                      href={v.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 text-[11px] font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      Visit Website <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Priority: {v.priority}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(v)}
                    className="p-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors bg-white"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(v.id, v.name)}
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
          <div className="bg-white rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">
              {editingId ? "Edit Venue Partner" : "Add Venue Partner"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Venue Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Radisson Blu Dwarka Banquet"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Venue Logo / Cover Image *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="/uploads/logo.png or database link"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs"
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Website Redirect Link (Optional)</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://radissonhotels.com/dwarka"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Venue Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Spacious luxury ballroom for up to 800 guests."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Address (Optional)</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Sector 13, Dwarka, New Delhi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Priority</label>
                  <input
                    type="number"
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2 justify-center pt-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                    />
                    <label htmlFor="isFeatured" className="text-xs font-bold text-slate-700 cursor-pointer">
                      Featured Partner
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
                      Active Status
                    </label>
                  </div>
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
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
