"use client";

import { useEffect, useState } from "react";
import { HelpCircle, Plus, Trash2, Edit2, Loader2, CheckCircle2, AlertCircle, Search } from "lucide-react";

export default function FaqsAdminPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("All");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const categories = ["General", "Catering & Menu", "Packages & Pricing", "Decor & Audio", "Booking & Cancellation"];

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/admin/faqs");
      const data = await res.json();
      if (data.faqs) setFaqs(data.faqs);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setCategory("General");
    setPriority(faqs.length + 1);
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (f: any) => {
    setEditingId(f.id);
    setQuestion(f.question);
    setAnswer(f.answer);
    setCategory(f.category || "General");
    setPriority(f.priority ?? 0);
    setIsActive(f.isActive ?? true);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/faqs", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          question,
          answer,
          category,
          priority: Number(priority),
          isActive,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setSuccessMsg(editingId ? "FAQ updated successfully!" : "New FAQ created!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchFaqs();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save FAQ");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving FAQ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, qText: string) => {
    if (!confirm(`Delete FAQ: "${qText.substring(0, 40)}..."?`)) return;

    try {
      const res = await fetch("/api/admin/faqs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
        setSuccessMsg("FAQ deleted.");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      alert("Error deleting FAQ");
    }
  };

  // Filtering
  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFilterCategory === "All" || f.category === selectedFilterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-amber-500" /> FAQ Accordion CMS
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage frequently asked questions and answers to clear customer doubts and improve SEO ranking automatically.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" /> Add FAQ
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

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or answers..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="w-full md:w-60">
          <select
            value={selectedFilterCategory}
            onChange={(e) => setSelectedFilterCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400">
          No FAQs found matching the selected filters.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((f) => (
            <div
              key={f.id}
              className={`bg-white border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                !f.isActive ? "border-slate-100 opacity-70 bg-slate-50/50" : "border-slate-200"
              }`}
            >
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber-50 text-amber-800 text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-amber-100/50 uppercase">
                    {f.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Priority: {f.priority}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                  {f.question}
                </h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{f.answer}</p>
              </div>

              <div className="flex items-center gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 justify-end">
                <button
                  onClick={() => openEditModal(f)}
                  className="p-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors bg-white"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(f.id, f.question)}
                  className="p-2 border border-red-100 hover:bg-red-50 text-red-500 rounded-xl transition-colors bg-white"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">
              {editingId ? "Edit FAQ" : "Add FAQ"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">FAQ Question *</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. Do you offer vegetarian and non-vegetarian options?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">FAQ Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Answer Text *</label>
                <textarea
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="e.g. Yes! We have separate kitchens for pure veg and non-veg preparations..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
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
                  <span className="text-[10px] text-slate-400 font-medium mt-1 block">Lower = display first</span>
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="isActive" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Enable FAQ (Display to customers)
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
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
