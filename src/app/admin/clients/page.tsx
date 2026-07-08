"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Trash2, Edit2, Loader2, CheckCircle2, AlertCircle, Upload, ExternalLink } from "lucide-react";

export default function ClientsAdminPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [priority, setPriority] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      if (data.clients) setClients(data.clients);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load clients list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setLogoUrl("");
    setWebsiteUrl("");
    setIsFeatured(false);
    setPriority(clients.length + 1);
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (c: any) => {
    setEditingId(c.id);
    setName(c.name);
    setLogoUrl(c.logoUrl || "");
    setWebsiteUrl(c.websiteUrl || "");
    setIsFeatured(c.isFeatured ?? false);
    setPriority(c.priority ?? 0);
    setIsActive(c.isActive ?? true);
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
        setErrorMsg(data.error || "Failed to upload client logo");
      }
    } catch (err) {
      setErrorMsg("Error uploading logo image");
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
      const res = await fetch("/api/admin/clients", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          name,
          logoUrl,
          websiteUrl,
          isFeatured,
          priority: Number(priority),
          isActive,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setSuccessMsg(editingId ? "Client updated successfully!" : "New client logo created!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchClients();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save client details");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving client details");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, clientName: string) => {
    if (!confirm(`Delete client record: "${clientName}"?`)) return;

    try {
      const res = await fetch("/api/admin/clients", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setClients((prev) => prev.filter((c) => c.id !== id));
        setSuccessMsg("Client record deleted successfully.");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      alert("Error deleting client record");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-500" /> Client Logo CMS
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage corporate clients, brand logos, and prominent wedding clients displayed in the logo slider on the homepage.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" /> Add Client Logo
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
      ) : clients.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400">
          No client records added yet. Click "Add Client Logo" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((c) => (
            <div
              key={c.id}
              className={`bg-white border rounded-3xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                !c.isActive ? "border-slate-100 bg-slate-50/50 opacity-75" : "border-slate-200"
              }`}
            >
              <div>
                <div className="relative h-28 w-full bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100">
                  {c.logoUrl ? (
                    <img src={c.logoUrl} alt={c.name} className="max-h-20 max-w-[85%] object-contain" />
                  ) : (
                    <Users className="w-10 h-10 text-slate-300" />
                  )}
                  {c.isFeatured && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>

                <div className="mt-3 space-y-0.5 text-center">
                  <h3 className="font-bold text-slate-800 text-sm">{c.name}</h3>
                  {c.websiteUrl && (
                    <a
                      href={c.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 text-[10px] hover:underline inline-flex items-center gap-0.5"
                    >
                      Website <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
                <span className="text-[9px] text-slate-400 font-bold">
                  Priority: {c.priority}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(c)}
                    className="p-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors bg-white"
                    title="Edit"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id, c.name)}
                    className="p-1.5 border border-red-100 hover:bg-red-50 text-red-500 rounded-lg transition-colors bg-white"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
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
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            <h2 className="text-lg font-serif font-bold text-slate-900 mb-4">
              {editingId ? "Edit Client Logo" : "Add Client Logo"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client / Brand Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Google India or Sandeep Weds Preeti"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client Logo Image *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="/uploads/client.png"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Website URL (Optional)</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
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

                <div className="flex flex-col gap-1.5 justify-center pt-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                    />
                    <label htmlFor="isFeatured" className="text-xs font-bold text-slate-700 cursor-pointer">
                      Featured
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
                      Active
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
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
