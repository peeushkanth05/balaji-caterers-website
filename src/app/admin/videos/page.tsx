"use client";

import { useEffect, useState } from "react";
import { Video, Plus, Trash2, Edit2, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff, Film } from "lucide-react";

export default function VideosAdminPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/admin/videos");
      const data = await res.json();
      if (data.videos) setVideos(data.videos);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setThumbnailUrl("");
    setDisplayOrder(videos.length + 1);
    setIsEnabled(true);
    setModalOpen(true);
  };

  const openEditModal = (vid: any) => {
    setEditingId(vid.id);
    setTitle(vid.title);
    setDescription(vid.description || "");
    setVideoUrl(vid.videoUrl);
    setThumbnailUrl(vid.thumbnailUrl);
    setDisplayOrder(vid.displayOrder ?? 0);
    setIsEnabled(vid.isEnabled ?? true);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/videos", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          title,
          description,
          videoUrl,
          thumbnailUrl,
          displayOrder: Number(displayOrder),
          isEnabled,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setSuccessMsg(editingId ? "Video updated successfully!" : "New video added!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchVideos();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save video");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving video");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleEnabled = async (id: string, currentEnabled: boolean) => {
    try {
      const res = await fetch("/api/admin/videos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isEnabled: !currentEnabled }),
      });
      if (res.ok) {
        setVideos((prev) =>
          prev.map((v) => (v.id === id ? { ...v, isEnabled: !currentEnabled } : v))
        );
      }
    } catch (e) {
      alert("Failed to toggle status");
    }
  };

  const handleDelete = async (id: string, heading: string) => {
    if (!confirm(`Delete video "${heading}"?`)) return;

    try {
      const res = await fetch("/api/admin/videos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
        setSuccessMsg(`Video "${heading}" deleted.`);
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      alert("Error deleting video");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Video className="w-6 h-6 text-amber-500" /> Video Gallery CMS
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage your event video showcases, upload mp4 links or YouTube references, and configure titles/descriptions.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" /> Add Video
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

      {/* Video Cards Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400">
          No videos added yet. Click "Add Video" to upload/link event videos.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className={`bg-white border rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                !vid.isEnabled ? "border-slate-100 bg-slate-50/50 opacity-75" : "border-slate-200"
              }`}
            >
              <div>
                {/* Thumbnail Preview */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden group">
                  {vid.thumbnailUrl ? (
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Film className="w-12 h-12" />
                    </div>
                  )}
                  <span className="absolute top-3 right-3 text-[10px] font-extrabold uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Order: {vid.displayOrder}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-slate-900 text-base leading-snug">
                    {vid.title}
                  </h3>
                  {vid.description && (
                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                      {vid.description}
                    </p>
                  )}
                  <p className="text-[10px] text-slate-400 font-medium truncate pt-1">
                    Link: <span className="text-amber-600 font-bold">{vid.videoUrl}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 p-4 bg-slate-50/30">
                <button
                  onClick={() => handleToggleEnabled(vid.id, vid.isEnabled)}
                  className={`flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase py-1.5 px-3 rounded-full transition-colors ${
                    vid.isEnabled
                      ? "bg-amber-50 text-amber-800 hover:bg-amber-100"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {vid.isEnabled ? (
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
                    onClick={() => openEditModal(vid)}
                    className="p-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors bg-white"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(vid.id, vid.title)}
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

      {/* Modal dialog */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">
              {editingId ? "Edit Video Info" : "Add New Event Video"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Royal Grand Wedding Catering Highlight"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary of the services provided at the event..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Video URL (MP4, YouTube, or Drive link) *</label>
                <input
                  type="text"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Thumbnail Cover Image URL *</label>
                <input
                  type="text"
                  required
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="/gallery_decor/thumbnail.jpg"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isEnabled"
                    checked={isEnabled}
                    onChange={(e) => setIsEnabled(e.target.checked)}
                    className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="isEnabled" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Show Video Slider
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
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
