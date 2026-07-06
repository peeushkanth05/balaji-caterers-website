"use client";

import { useEffect, useState } from "react";
import { Share2, Plus, Trash2, Edit2, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function SocialMediaAdminPage() {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [platform, setPlatform] = useState("instagram");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("📷");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const platforms = [
    { key: "facebook", name: "Facebook", defaultIcon: "📘" },
    { key: "instagram", name: "Instagram", defaultIcon: "📷" },
    { key: "youtube", name: "YouTube", defaultIcon: "🎥" },
    { key: "linkedin", name: "LinkedIn", defaultIcon: "💼" },
    { key: "x", name: "X (Twitter)", defaultIcon: "🐦" },
    { key: "whatsapp", name: "WhatsApp", defaultIcon: "💬" },
    { key: "other", name: "Other / Custom", defaultIcon: "🔗" },
  ];

  const fetchLinks = async () => {
    try {
      const res = await fetch("/api/admin/social");
      const data = await res.json();
      if (data.socialLinks) setSocialLinks(data.socialLinks);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load social links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setPlatform("instagram");
    setUrl("");
    setIcon("📷");
    setDisplayOrder(socialLinks.length + 1);
    setIsEnabled(true);
    setModalOpen(true);
  };

  const openEditModal = (link: any) => {
    setEditingId(link.id);
    setPlatform(link.platform);
    setUrl(link.url);
    setIcon(link.icon || "🔗");
    setDisplayOrder(link.displayOrder ?? 0);
    setIsEnabled(link.isEnabled ?? true);
    setModalOpen(true);
  };

  const handlePlatformChange = (pKey: string) => {
    setPlatform(pKey);
    const selected = platforms.find((p) => p.key === pKey);
    if (selected) {
      setIcon(selected.defaultIcon);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/social", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          platform,
          url,
          icon,
          displayOrder: Number(displayOrder),
          isEnabled,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setSuccessMsg(editingId ? "Social link updated!" : "Social link added!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchLinks();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save link");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving link");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleEnabled = async (id: string, currentEnabled: boolean) => {
    try {
      const res = await fetch("/api/admin/social", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isEnabled: !currentEnabled }),
      });
      if (res.ok) {
        setSocialLinks((prev) =>
          prev.map((s) => (s.id === id ? { ...s, isEnabled: !currentEnabled } : s))
        );
      }
    } catch (e) {
      alert("Failed to toggle status");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name} link?`)) return;

    try {
      const res = await fetch("/api/admin/social", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setSocialLinks((prev) => prev.filter((s) => s.id !== id));
        setSuccessMsg(`${name} link deleted.`);
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      alert("Error deleting link");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-amber-500" /> Social Media CMS
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Configure floating social bars, website announcement bar icons, and platform link ordering.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" /> Add Social Icon
        </button>
      </div>

      {/* Messages */}
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

      {/* Content List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : socialLinks.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400">
          No social media profiles added yet. Click "Add Social Icon" to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((link) => {
            const pName = platforms.find((p) => p.key === link.platform)?.name || link.platform;
            return (
              <div
                key={link.id}
                className={`bg-white border rounded-3xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                  !link.isEnabled ? "border-slate-100 bg-slate-50/50 opacity-75" : "border-slate-200"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{link.icon || "🔗"}</span>
                    <span className="text-[10px] font-extrabold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      Order: {link.displayOrder}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 mt-3 text-lg capitalize">
                    {pName}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1 truncate hover:text-amber-600 transition-colors">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.url}
                    </a>
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
                  <button
                    onClick={() => handleToggleEnabled(link.id, link.isEnabled)}
                    className={`flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase py-1.5 px-3 rounded-full transition-colors ${
                      link.isEnabled
                        ? "bg-amber-50 text-amber-800 hover:bg-amber-100"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {link.isEnabled ? (
                      <>
                        <Eye className="w-3.5 h-3.5" /> Enabled
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" /> Disabled
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(link)}
                      className="p-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(link.id, pName)}
                      className="p-2 border border-red-100 hover:bg-red-50 text-red-500 rounded-xl transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">
              {editingId ? "Edit Social Link" : "Add Social Media Link"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Platform *</label>
                <select
                  required
                  value={platform}
                  onChange={(e) => handlePlatformChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                >
                  {platforms.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Social Profile URL *</label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://instagram.com/shreebalaji"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Icon (Emoji/Symbol)</label>
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="📷"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="isEnabled"
                  checked={isEnabled}
                  onChange={(e) => setIsEnabled(e.target.checked)}
                  className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="isEnabled" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Enable and display link publicly
                </label>
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
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Social Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
