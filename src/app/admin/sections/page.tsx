"use client";

import { useEffect, useState } from "react";
import { ListOrdered, ArrowUp, ArrowDown, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, Copy, Trash2 } from "lucide-react";

export default function SectionsAdminPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchSections = async () => {
    try {
      const res = await fetch("/api/admin/sections");
      const data = await res.json();
      if (data.sections) setSections(data.sections);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load sections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const saveOrder = async (reorderedList: any[]) => {
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = reorderedList.map((sec, idx) => ({
        id: sec.id,
        displayOrder: idx,
      }));

      const res = await fetch("/api/admin/sections", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections: payload }),
      });

      if (res.ok) {
        setSections(reorderedList);
        setSuccessMsg("Homepage layout reordered successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save reorder");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving layout order");
    } finally {
      setSubmitting(false);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const list = [...sections];
    const temp = list[index];
    list[index] = list[index - 1];
    list[index - 1] = temp;
    saveOrder(list);
  };

  const moveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const list = [...sections];
    const temp = list[index];
    list[index] = list[index + 1];
    list[index + 1] = temp;
    saveOrder(list);
  };

  const handleToggleEnabled = async (id: string, currentEnabled: boolean) => {
    try {
      const res = await fetch("/api/admin/sections", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isEnabled: !currentEnabled }),
      });
      if (res.ok) {
        setSections((prev) =>
          prev.map((s) => (s.id === id ? { ...s, isEnabled: !currentEnabled } : s))
        );
        setSuccessMsg("Section visibility updated!");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      alert("Failed to toggle section visibility");
    }
  };

  const handleDuplicate = async (sec: any) => {
    const customName = prompt(`Enter a label/title for the duplicated "${sec.name}" section:`, `${sec.name} (Copy)`);
    if (customName === null) return; // cancelled
    if (!customName.trim()) {
      alert("Label is required");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionType: sec.sectionType,
          name: customName,
          displayOrder: sections.length,
          isEnabled: true,
          settings: sec.settings || "",
        }),
      });

      if (res.ok) {
        setSuccessMsg("Section duplicated!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchSections();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to duplicate section");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error duplicating section");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete custom section "${name}"?`)) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/sections", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setSuccessMsg(`Section "${name}" deleted.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchSections();
      }
    } catch (e) {
      alert("Error deleting section");
    } finally {
      setSubmitting(false);
    }
  };

  // System Core sections should not be deleted, only custom duplicated sections can be deleted
  const isSystemSection = (type: string) => {
    const defaults = ["hero", "about", "services", "packages", "videos", "testimonials", "gallery", "portfolio", "contact", "footer"];
    return defaults.includes(type);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <ListOrdered className="w-6 h-6 text-amber-500" /> Homepage Section Management
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Control the structure and display priority of your website. Reorder layouts, hide or show sections, and duplicate custom segments instantly.
          </p>
        </div>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 border border-emerald-100 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-800 text-xs font-bold rounded-2xl flex items-center gap-2 border border-red-100">
          <AlertCircle className="w-4 h-4 text-red-600" /> {errorMsg}
        </div>
      )}

      {/* Main List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : sections.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400">
          No homepage sections found. Run database seeder or refresh.
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Section Layout Block
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Actions & Controls
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {sections.map((sec, idx) => {
              const isSys = isSystemSection(sec.sectionType);
              return (
                <div
                  key={sec.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 transition-colors gap-4 ${
                    !sec.isEnabled ? "bg-slate-50/70 text-slate-400" : "hover:bg-amber-50/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Index */}
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shadow-inner">
                      {idx + 1}
                    </div>

                    {/* Section details */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-tight flex items-center gap-2">
                        {sec.name}
                        {!sec.isEnabled && (
                          <span className="text-[9px] font-extrabold uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                            Hidden
                          </span>
                        )}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase tracking-wider">
                        Key: {sec.sectionType}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    {/* Reorder Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => moveUp(idx)}
                        disabled={idx === 0 || submitting}
                        className="p-2 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors bg-white shadow-sm"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveDown(idx)}
                        disabled={idx === sections.length - 1 || submitting}
                        className="p-2 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors bg-white shadow-sm"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Duplicate, Toggle, and Delete Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleEnabled(sec.id, sec.isEnabled)}
                        className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-[10px] font-bold uppercase transition-colors shadow-sm ${
                          sec.isEnabled
                            ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200"
                        }`}
                      >
                        {sec.isEnabled ? (
                          <>
                            <Eye className="w-3.5 h-3.5" /> Visible
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" /> Hidden
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDuplicate(sec)}
                        disabled={submitting}
                        className="p-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors bg-white shadow-sm flex items-center gap-1"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase hidden md:inline">Duplicate</span>
                      </button>

                      {!isSys && (
                        <button
                          onClick={() => handleDelete(sec.id, sec.name)}
                          disabled={submitting}
                          className="p-2 border border-red-200 hover:bg-red-50 text-red-500 rounded-xl transition-colors bg-white shadow-sm"
                          title="Delete Custom Section"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
