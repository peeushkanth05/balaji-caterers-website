"use client";

import { useEffect, useState } from "react";
import { UtensilsCrossed, Plus, Trash2, Edit2, Loader2, CheckCircle2, AlertCircle, Star, Filter } from "lucide-react";

export default function PackagesAdminPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Wedding");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [discountType, setDiscountType] = useState("none");
  const [discountValue, setDiscountValue] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const originalPrice = parseFloat(pricePerPerson) || 0;
  const discValue = parseFloat(discountValue) || 0;
  let liveDiscountedPrice = originalPrice;
  if (discountType === "percentage") {
    liveDiscountedPrice = originalPrice * (1 - discValue / 100);
  } else if (discountType === "amount") {
    liveDiscountedPrice = Math.max(0, originalPrice - discValue);
  }
  liveDiscountedPrice = Math.round(liveDiscountedPrice * 100) / 100;

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/admin/packages");
      const data = await res.json();
      if (data.packages) setPackages(data.packages);
    } catch (e) {
      console.error("Failed to fetch packages", e);
      setErrorMsg("Failed to load catering packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setCategory("Wedding");
    setPricePerPerson("");
    setDiscountType("none");
    setDiscountValue("");
    setDescription("");
    setFeatures("");
    setIsFeatured(false);
    setModalOpen(true);
  };

  const openEditModal = (pkg: any) => {
    setEditingId(pkg.id);
    setName(pkg.name);
    setCategory(pkg.category);
    setPricePerPerson(pkg.pricePerPerson.toString());
    setDiscountType(pkg.discountType || "none");
    setDiscountValue(pkg.discountValue ? pkg.discountValue.toString() : "");
    setDescription(pkg.description);
    setFeatures(pkg.features);
    setIsFeatured(pkg.isFeatured);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    const payload = {
      id: editingId,
      name,
      category,
      pricePerPerson,
      discountType,
      discountValue: discountValue ? parseFloat(discountValue) : 0,
      description,
      features,
      isFeatured,
    };

    try {
      const res = await fetch("/api/admin/packages", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setModalOpen(false);
        setSuccessMsg(editingId ? "Package updated successfully!" : "New package created!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchPackages();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save package");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving package");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const res = await fetch("/api/admin/packages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isFeatured: !currentFeatured }),
      });
      if (res.ok) {
        setPackages((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isFeatured: !currentFeatured } : p))
        );
      }
    } catch (e) {
      alert("Failed to toggle featured status");
    }
  };

  const handleDelete = async (id: string, pkgName: string) => {
    if (!confirm(`Delete package "${pkgName}"?`)) return;

    try {
      const res = await fetch("/api/admin/packages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setPackages((prev) => prev.filter((p) => p.id !== id));
        setSuccessMsg(`Package "${pkgName}" deleted.`);
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      alert("Error deleting package");
    }
  };

  const filteredPackages = filterCategory === "ALL"
    ? packages
    : packages.filter((p) => p.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-amber-500" /> Catering Packages CMS
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage your menu packages, price per plate, included features list, and featured highlights.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Package
        </button>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {["ALL", "Wedding", "Birthday Party", "Corporate Event", "Anniversary"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterCategory === cat
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Package Cards Grid */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-500" />
          <p className="text-sm">Loading packages...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    {pkg.category}
                  </span>
                  <button
                    onClick={() => handleToggleFeatured(pkg.id, pkg.isFeatured)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border transition-all ${
                      pkg.isFeatured
                        ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                        : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                    }`}
                    title="Toggle featured status on landing page"
                  >
                    <Star className={`w-3 h-3 ${pkg.isFeatured ? "fill-white" : ""}`} />
                    {pkg.isFeatured ? "FEATURED" : "STANDARD"}
                  </button>
                </div>

                <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">{pkg.name}</h3>
                <div className="mb-3">
                  {pkg.discountType && pkg.discountType !== "none" && pkg.discountValue > 0 ? (
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-amber-600">₹{pkg.discountedPrice}</span>
                        <span className="text-xs text-slate-400 line-through">₹{pkg.pricePerPerson}</span>
                        <span className="text-[10px] text-slate-500 font-normal">/ plate</span>
                      </div>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                        {pkg.discountType === "percentage" ? `${pkg.discountValue}% OFF` : `₹${pkg.discountValue} OFF`}
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-amber-600">
                      ₹{pkg.pricePerPerson} <span className="text-xs font-normal text-slate-500">/ plate</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">{pkg.description}</p>

                {pkg.features && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 mb-4">
                    <strong className="text-slate-800">Includes:</strong> {pkg.features}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  onClick={() => openEditModal(pkg)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg.id, pkg.name)}
                  className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif font-bold text-xl text-slate-900">
                {editingId ? "Edit Catering Package" : "Create New Package"}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Package Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Wedding Feast"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price / Plate (₹) *</label>
                  <input
                    type="number"
                    required
                    value={pricePerPerson}
                    onChange={(e) => setPricePerPerson(e.target.value)}
                    placeholder="e.g. 850"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="none">No Discount</option>
                    <option value="percentage">Percentage (%)</option>
                    <option value="amount">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Discount Value {discountType !== "none" && "*"}
                  </label>
                  <input
                    type="number"
                    disabled={discountType === "none"}
                    required={discountType !== "none"}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={discountType === "none" ? "N/A" : discountType === "percentage" ? "e.g. 10" : "e.g. 150"}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {discountType !== "none" && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs font-medium text-amber-800">
                  Calculated Price: <span className="line-through text-slate-400">₹{originalPrice}</span>{" "}
                  <span className="font-bold text-amber-600 text-sm">₹{liveDiscountedPrice}</span> per plate
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short overview of the catering spread..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Features / Items Included</label>
                <input
                  type="text"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Welcome Drink, 4 Starters, 6 Main Course, Live Counter"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 border-slate-300"
                />
                <label htmlFor="featured-check" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Feature on homepage package showcase
                </label>
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
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
