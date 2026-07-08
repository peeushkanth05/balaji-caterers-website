"use client";

import { useEffect, useState } from "react";
import { Megaphone, Plus, Trash2, Edit2, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AlertsAdminPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#f59e0b");
  const [textColor, setTextColor] = useState("#ffffff");
  const [speed, setSpeed] = useState(40);
  const [priority, setPriority] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showOnHomepage, setShowOnHomepage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAlerts = async () => {
    try {
      const res = await fetch("/api/admin/alerts");
      const data = await res.json();
      if (data.alerts) setAlerts(data.alerts);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load alerts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);  const openAddModal = () => {
    setEditingId(null);
    setText("");
    setBgColor("#f59e0b");
    setTextColor("#ffffff");
    setSpeed(40);
    setPriority(alerts.length + 1);
    setIsEnabled(true);
    setRedirectUrl("");
    setStartDate("");
    setEndDate("");
    setShowOnHomepage(false);
    setModalOpen(true);
  };

  const openEditModal = (a: any) => {
    setEditingId(a.id);
    setText(a.text);
    setBgColor(a.bgColor || "#f59e0b");
    setTextColor(a.textColor || "#ffffff");
    setSpeed(a.speed ?? 40);
    setPriority(a.priority ?? 0);
    setIsEnabled(a.isEnabled ?? true);
    setRedirectUrl(a.redirectUrl || "");
    setStartDate(a.startDate ? new Date(a.startDate).toISOString().split("T")[0] : "");
    setEndDate(a.endDate ? new Date(a.endDate).toISOString().split("T")[0] : "");
    setShowOnHomepage(a.showOnHomepage ?? false);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/alerts", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          text,
          bgColor,
          textColor,
          speed: Number(speed),
          priority: Number(priority),
          isEnabled,
          redirectUrl: redirectUrl || null,
          startDate: startDate || null,
          endDate: endDate || null,
          showOnHomepage,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setSuccessMsg(editingId ? "Alert ticker updated!" : "New alert created successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchAlerts();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save alert");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving alert");
    } finally {
      setSubmitting(false);
    }
  };
  const handleToggleEnabled = async (id: string, currentEnabled: boolean) => {
    try {
      const res = await fetch("/api/admin/alerts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isEnabled: !currentEnabled }),
      });
      if (res.ok) {
        setAlerts((prev) =>
          prev.map((a) => (a.id === id ? { ...a, isEnabled: !currentEnabled } : a))
        );
      }
    } catch (e) {
      alert("Failed to toggle status");
    }
  };

  const handleDelete = async (id: string, alertText: string) => {
    if (!confirm(`Delete alert: "${alertText}"?`)) return;

    try {
      const res = await fetch("/api/admin/alerts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
        setSuccessMsg("Alert announcement deleted.");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      alert("Error deleting alert");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-amber-500" /> Top Alert Ticker CMS
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Display attention-grabbing scrolling text alerts at the absolute top header (e.g. holiday booking notices, discounts, important messages).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" /> Add Alert
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

      {/* Alerts Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : alerts.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400">
          No alert announcements added yet. Click "Add Alert" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alerts.map((a) => (
            <div
              key={a.id}
              className={`bg-white border rounded-3xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                !a.isEnabled ? "border-slate-100 bg-slate-50/50 opacity-75" : "border-slate-200"
              }`}
            >
              <div>
                {/* Ticker Preview Card */}
                <div
                  className="rounded-2xl p-4 text-center text-xs font-bold overflow-hidden shadow-inner flex items-center justify-center"
                  style={{ backgroundColor: a.bgColor, color: a.textColor }}
                >
                  <span className="truncate">{a.text}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <div>
                    Speed: <span className="text-slate-800 font-extrabold">{a.speed}s</span>
                  </div>
                  <div>
                    Priority: <span className="text-slate-800 font-extrabold">{a.priority}</span>
                  </div>
                  <div className="text-right">
                    Active: <span className={a.isEnabled ? "text-emerald-600" : "text-slate-400"}>{a.isEnabled ? "Yes" : "No"}</span>
                  </div>
                </div>

                {/* Extra Details */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  {a.redirectUrl && (
                    <div className="text-slate-600 flex items-center gap-1.5">
                      <span className="font-semibold text-[10px] uppercase text-slate-400">Redirect Link:</span>
                      <a href={a.redirectUrl} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline truncate max-w-[200px]">
                        {a.redirectUrl}
                      </a>
                    </div>
                  )}
                  {(a.startDate || a.endDate) && (
                    <div className="text-slate-600">
                      <span className="font-semibold text-[10px] uppercase text-slate-400">Schedule:</span>{" "}
                      <span className="font-medium text-slate-800">
                        {a.startDate ? new Date(a.startDate).toLocaleDateString("en-IN") : "Anytime"}{" "}
                        →{" "}
                        {a.endDate ? new Date(a.endDate).toLocaleDateString("en-IN") : "Forever"}
                      </span>
                    </div>
                  )}
                  <div className="text-slate-600 flex items-center gap-2">
                    <span className="font-semibold text-[10px] uppercase text-slate-400">Show on Homepage:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      a.showOnHomepage ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"
                    }`}>
                      {a.showOnHomepage ? "Yes (Banner & Ticker)" : "No (Ticker Only)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
                <button
                  onClick={() => handleToggleEnabled(a.id, a.isEnabled)}
                  className={`flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase py-1.5 px-3 rounded-full transition-colors ${
                    a.isEnabled
                      ? "bg-amber-50 text-amber-800 hover:bg-amber-100"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {a.isEnabled ? (
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
                    onClick={() => openEditModal(a)}
                    className="p-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors bg-white"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id, a.text)}
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
              {editingId ? "Edit Ticker Alert" : "Add Ticker Alert"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alert Text Message *</label>
                <input
                  type="text"
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="✨ Flat 10% OFF on Wedding bookings completed this week! Call us now."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Redirect Link URL (Optional)</label>
                <input
                  type="url"
                  value={redirectUrl}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                  placeholder="https://example.com/promo-landing"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Date (Optional)</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Date (Optional)</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Background Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 border border-slate-200 rounded-xl p-0.5 cursor-pointer bg-slate-50"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Text Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-10 h-10 border border-slate-200 rounded-xl p-0.5 cursor-pointer bg-slate-50"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Scroll Duration (Seconds)</label>
                  <input
                    type="number"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    placeholder="40"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-[10px] text-slate-400 font-medium mt-1 block">Higher = slower scroll</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority Order (Weight)</label>
                  <input
                    type="number"
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-[10px] text-slate-400 font-medium mt-1 block">Higher = display first</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 py-1">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isEnabled"
                    checked={isEnabled}
                    onChange={(e) => setIsEnabled(e.target.checked)}
                    className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="isEnabled" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                    Enable this offer ticker / alert
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showOnHomepage"
                    checked={showOnHomepage}
                    onChange={(e) => setShowOnHomepage(e.target.checked)}
                    className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="showOnHomepage" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                    Show on both the Ticker and Homepage
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
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
