"use client";

import { useEffect, useState } from "react";
import {
  UtensilsCrossed,
  Plus,
  Trash2,
  Edit2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Star,
  Filter,
  Search,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";

export default function PackagesAdminPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Wedding");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [discountType, setDiscountType] = useState("none");
  const [discountValue, setDiscountValue] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Bulk operation states
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

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
    setIsActive(true);
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
    setIsActive(pkg.isActive ?? true);
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
      isActive,
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

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch("/api/admin/packages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentActive }),
      });
      if (res.ok) {
        setPackages((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isActive: !currentActive } : p))
        );
      }
    } catch (e) {
      alert("Failed to toggle active status");
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

  // Duplicate Action
  const handleDuplicate = async (pkg: any) => {
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    const payload = {
      name: `${pkg.name} (Copy)`,
      category: pkg.category,
      pricePerPerson: pkg.pricePerPerson.toString(),
      discountType: pkg.discountType,
      discountValue: pkg.discountValue,
      description: pkg.description,
      features: pkg.features,
      isFeatured: false,
      isActive: true,
    };

    try {
      const res = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMsg(`Duplicated "${pkg.name}" successfully!`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchPackages();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to duplicate package");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error duplicating package");
    } finally {
      setSubmitting(false);
    }
  };

  // Bulk Operations
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredPackages.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleBulkAction = async (action: "delete" | "activate" | "deactivate") => {
    if (selectedIds.length === 0) return;
    if (action === "delete" && !confirm(`Are you sure you want to delete ${selectedIds.length} packages?`)) return;

    setBulkActionLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    let successCount = 0;
    try {
      for (const id of selectedIds) {
        let res;
        if (action === "delete") {
          res = await fetch("/api/admin/packages", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });
        } else {
          res = await fetch("/api/admin/packages", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, isActive: action === "activate" }),
          });
        }
        if (res.ok) successCount++;
      }

      setSuccessMsg(`Bulk operation completed: ${successCount} packages updated.`);
      setTimeout(() => setSuccessMsg(""), 4000);
      setSelectedIds([]);
      fetchPackages();
    } catch (error) {
      setErrorMsg("Bulk operation encountered errors.");
    } finally {
      setBulkActionLoading(false);
    }
  };

  // Filter & Search Logic
  const filteredPackages = packages.filter((p) => {
    const matchesCategory = filterCategory === "ALL" || p.category === filterCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.features.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-amber-500" /> Catering Packages CMS
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage your menu packages, price per plate, included features list, and active visibility controls.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Package
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Search */}
        <div className="lg:col-span-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search package name or features..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="lg:col-span-8 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {["ALL", "Wedding", "Birthday Party", "Corporate Event", "Anniversary"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterCategory === cat
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Operations Bar */}
      {selectedIds.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold text-amber-800">
            Selected {selectedIds.length} catering packages
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleBulkAction("activate")}
              disabled={bulkActionLoading}
              className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
            >
              Bulk Activate
            </button>
            <button
              onClick={() => handleBulkAction("deactivate")}
              disabled={bulkActionLoading}
              className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
            >
              Bulk Deactivate
            </button>
            <button
              onClick={() => handleBulkAction("delete")}
              disabled={bulkActionLoading}
              className="px-3.5 py-1.5 bg-rose-500 text-white rounded-lg text-xs font-bold hover:bg-rose-600 transition-colors shadow-sm"
            >
              Bulk Delete
            </button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Package Cards List */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-500" />
          <p className="text-sm">Loading packages...</p>
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <p className="text-sm">No catering packages found matching the criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card list */}
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-3xl p-6 border transition-all duration-200 shadow-sm relative flex flex-col justify-between ${
                selectedIds.includes(pkg.id) ? "ring-2 ring-amber-500 border-transparent" : "border-slate-200"
              }`}
            >
              {/* Select check */}
              <div className="absolute top-4 left-4 z-10">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(pkg.id)}
                  onChange={(e) => handleSelectOne(pkg.id, e.target.checked)}
                  className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500 cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 ml-6">
                    {pkg.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {/* Active/Inactive Badge */}
                    <button
                      onClick={() => handleToggleActive(pkg.id, pkg.isActive ?? true)}
                      className={`p-1 rounded-lg border transition-all ${
                        pkg.isActive ?? true
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                      }`}
                      title={pkg.isActive ?? true ? "Active: Click to Hide" : "Inactive: Click to Show"}
                    >
                      {pkg.isActive ?? true ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleToggleFeatured(pkg.id, pkg.isFeatured)}
                      className={`px-2 py-1 rounded-full text-[9px] font-bold flex items-center gap-1 border transition-all ${
                        pkg.isFeatured
                          ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                          : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                      }`}
                      title="Toggle featured status"
                    >
                      <Star className={`w-2.5 h-2.5 ${pkg.isFeatured ? "fill-white" : ""}`} />
                      {pkg.isFeatured ? "FEATURED" : "STANDARD"}
                    </button>
                  </div>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">{pkg.name}</h3>
                <div className="mb-3">
                  {pkg.discountType && pkg.discountType !== "none" && pkg.discountValue > 0 ? (
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-amber-600">₹{pkg.discountedPrice}</span>
                        <span className="text-xs text-slate-400 line-through">₹{pkg.pricePerPerson}</span>
                        <span className="text-[10px] text-slate-500 font-normal">/ plate</span>
                      </div>
                      <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                        {pkg.discountType === "percentage" ? `${pkg.discountValue}% OFF` : `₹${pkg.discountValue} OFF`}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-amber-600">₹{pkg.pricePerPerson}</span>
                      <span className="text-[10px] text-slate-400">/ plate</span>
                    </div>
                  )}
                </div>

                <p className="text-slate-500 text-xs line-clamp-3 mb-4 leading-relaxed">
                  {pkg.description || "No description provided."}
                </p>

                {pkg.features && (
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Included Dishes & Features
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {pkg.features.split(",").map((f: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-md text-[10px] font-medium text-slate-600"
                        >
                          {f.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions row */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => handleDuplicate(pkg)}
                  className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
                  title="Duplicate Package"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openEditModal(pkg)}
                  className="p-2 hover:bg-amber-50 rounded-xl text-slate-500 hover:text-amber-600 transition-colors"
                  title="Edit Package"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id, pkg.name)}
                  className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600 transition-colors"
                  title="Delete Package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-lg font-serif font-bold text-slate-900">
                {editingId ? "✏️ Edit Package Details" : "✨ Create Catering Package"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Wedding Veg Golden Package"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Anniversary">Anniversary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price Per Person (₹) *</label>
                  <input
                    type="number"
                    required
                    value={pricePerPerson}
                    onChange={(e) => setPricePerPerson(e.target.value)}
                    placeholder="e.g. 1500"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Discount settings */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  Optional Discount/Promotional Offer
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Discount Type</label>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="none">No Discount</option>
                      <option value="percentage">Percentage (%)</option>
                      <option value="amount">Fixed Amount (₹)</option>
                    </select>
                  </div>

                  {discountType !== "none" && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {discountType === "percentage" ? "Percentage Value (%)" : "Amount Value (₹)"}
                      </label>
                      <input
                        type="number"
                        required
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        placeholder="Value"
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {discountType !== "none" && (
                  <div className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                    🎉 Live Calculated Price: ₹{liveDiscountedPrice} / plate
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the core elements of the package..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dishes & Features List (Comma separated)
                </label>
                <textarea
                  rows={3}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="e.g. 5 Starters, 6 Main Course Dishes, 3 Desserts, Live Pasta Counter"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer p-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-800">Featured Highlight</span>
                    <span className="block text-[9px] text-slate-400">Show in featured list</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-800">Active Visibility</span>
                    <span className="block text-[9px] text-slate-400">Show on public pages</span>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 px-4 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {editingId ? "Save Changes" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
