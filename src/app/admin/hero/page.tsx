"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Save,
  Plus,
  Trash2,
  Edit2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  BarChart2,
  Layers,
} from "lucide-react";
import { HeroSectionData } from "@/types/hero";
import { MediaLibraryModal } from "@/components/admin/MediaLibraryModal";

export default function AdminHeroCMSPage() {
  const [hero, setHero] = useState<HeroSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"general" | "stats" | "slides" | "cards">("general");

  // Reusable Media Library Selector
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  // General Form State
  const [badgeText, setBadgeText] = useState("");
  const [badgeIcon, setBadgeIcon] = useState("");
  const [badgeShow, setBadgeShow] = useState(true);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [primaryBtnText, setPrimaryBtnText] = useState("");
  const [primaryBtnLink, setPrimaryBtnLink] = useState("");
  const [secondaryBtnText, setSecondaryBtnText] = useState("");
  const [secondaryBtnLink, setSecondaryBtnLink] = useState("");
  const [sliderAutoPlay, setSliderAutoPlay] = useState(true);
  const [sliderSpeed, setSliderSpeed] = useState(5000);

  // Modal State for Sub-resources
  const [statModalOpen, setStatModalOpen] = useState(false);
  const [editingStatId, setEditingStatId] = useState<string | null>(null);
  const [statNumber, setStatNumber] = useState("");
  const [statTitle, setStatTitle] = useState("");
  const [statIcon, setStatIcon] = useState("🏆");

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");

  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [cardIcon, setCardIcon] = useState("🍽️");
  const [cardLink, setCardLink] = useState("");
  const [cardColor, setCardColor] = useState("amber");

  const fetchHero = async () => {
    try {
      const res = await fetch("/api/admin/hero");
      const data = await res.json();
      if (data.hero) {
        setHero(data.hero);
        setBadgeText(data.hero.badgeText || "");
        setBadgeIcon(data.hero.badgeIcon || "⭐");
        setBadgeShow(data.hero.badgeShow ?? true);
        setHeading(data.hero.heading || "");
        setSubheading(data.hero.subheading || "");
        setPrimaryBtnText(data.hero.primaryBtnText || "");
        setPrimaryBtnLink(data.hero.primaryBtnLink || "");
        setSecondaryBtnText(data.hero.secondaryBtnText || "");
        setSecondaryBtnLink(data.hero.secondaryBtnLink || "");
        setSliderAutoPlay(data.hero.sliderAutoPlay ?? true);
        setSliderSpeed(data.hero.sliderSpeed || 5000);
      }
    } catch (e) {
      console.error("Failed to load hero configuration", e);
      setErrorMsg("Failed to load Hero CMS settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/hero", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          badgeText,
          badgeIcon,
          badgeShow,
          heading,
          subheading,
          primaryBtnText,
          primaryBtnLink,
          secondaryBtnText,
          secondaryBtnLink,
          sliderAutoPlay,
          sliderSpeed,
        }),
      });

      if (res.ok) {
        showToast("Hero headlines and actions saved successfully!");
        fetchHero();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save Hero section");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving Hero settings");
    } finally {
      setSaving(false);
    }
  };

  // Add or Edit Statistic Counter
  const handleStatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingStatId;
      const res = await fetch("/api/admin/hero/statistics", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingStatId || undefined,
          icon: statIcon,
          number: statNumber,
          title: statTitle,
        }),
      });

      if (res.ok) {
        setStatModalOpen(false);
        setEditingStatId(null);
        setStatNumber("");
        setStatTitle("");
        setStatIcon("🏆");
        showToast(isEdit ? "Statistic counter updated!" : "Statistic counter added!");
        fetchHero();
      }
    } catch (e) {
      alert("Error saving statistic item");
    } finally {
      setSaving(false);
    }
  };

  const openNewStatModal = () => {
    setEditingStatId(null);
    setStatNumber("");
    setStatTitle("");
    setStatIcon("🏆");
    setStatModalOpen(true);
  };

  const openEditStatModal = (stat: any) => {
    setEditingStatId(stat.id);
    setStatNumber(stat.number);
    setStatTitle(stat.title);
    setStatIcon(stat.icon || "🏆");
    setStatModalOpen(true);
  };

  const handleDeleteStat = async (id: string) => {
    if (!confirm("Are you sure you want to delete this statistic item?")) return;
    try {
      await fetch("/api/admin/hero/statistics", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      showToast("Statistic item deleted!");
      fetchHero();
    } catch (e) {
      alert("Error deleting item");
    }
  };

  // Add or Edit Slide Image
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingImageId;
      const res = await fetch("/api/admin/hero/images", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingImageId || undefined,
          imageUrl,
          altText: imageAlt,
          caption: imageCaption,
        }),
      });

      if (res.ok) {
        setImageModalOpen(false);
        setEditingImageId(null);
        setImageUrl("");
        setImageAlt("");
        setImageCaption("");
        showToast(isEdit ? "Slider image updated!" : "Slider image added!");
        fetchHero();
      }
    } catch (e) {
      alert("Error saving image slide");
    } finally {
      setSaving(false);
    }
  };

  const openNewImageModal = () => {
    setEditingImageId(null);
    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
    setImageModalOpen(true);
  };

  const openEditImageModal = (img: any) => {
    setEditingImageId(img.id);
    setImageUrl(img.imageUrl);
    setImageAlt(img.altText);
    setImageCaption(img.caption || "");
    setImageModalOpen(true);
  };

  const handleMediaSelect = (url: string) => {
    setImageUrl(url);
    setMediaModalOpen(false);
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Delete this hero slide image?")) return;
    try {
      await fetch("/api/admin/hero/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      showToast("Slider image deleted!");
      fetchHero();
    } catch (e) {
      alert("Error deleting image slide");
    }
  };

  // Add or Edit Floating Card
  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editingCardId;
      const res = await fetch("/api/admin/hero/floating-cards", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingCardId || undefined,
          icon: cardIcon,
          title: cardTitle,
          description: cardDesc,
          link: cardLink,
          color: cardColor,
        }),
      });

      if (res.ok) {
        setCardModalOpen(false);
        setEditingCardId(null);
        setCardTitle("");
        setCardDesc("");
        setCardIcon("🍽️");
        setCardLink("");
        setCardColor("amber");
        showToast(isEdit ? "Floating card updated!" : "Floating card added!");
        fetchHero();
      }
    } catch (e) {
      alert("Error saving floating card");
    } finally {
      setSaving(false);
    }
  };

  const openNewCardModal = () => {
    setEditingCardId(null);
    setCardTitle("");
    setCardDesc("");
    setCardIcon("🍽️");
    setCardLink("");
    setCardColor("amber");
    setCardModalOpen(true);
  };

  const openEditCardModal = (card: any) => {
    setEditingCardId(card.id);
    setCardTitle(card.title);
    setCardDesc(card.description);
    setCardIcon(card.icon || "🍽️");
    setCardLink(card.link || "");
    setCardColor(card.color || "amber");
    setCardModalOpen(true);
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm("Delete this floating card?")) return;
    try {
      await fetch("/api/admin/hero/floating-cards", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      showToast("Floating card deleted!");
      fetchHero();
    } catch (e) {
      alert("Error deleting floating card");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200 max-w-5xl">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-500" />
        <p className="text-sm">Loading Hero CMS configurations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" /> Hero Section CMS Engine
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Customize main landing headlines, call-to-action buttons, slide carousel images, and animated stats counters.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "general"
              ? "bg-amber-500 text-white shadow-sm shadow-amber-500/25"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Sparkles className="w-4 h-4" /> Headline & Buttons
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "stats"
              ? "bg-amber-500 text-white shadow-sm shadow-amber-500/25"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BarChart2 className="w-4 h-4" /> Statistics Counters ({hero?.statistics?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab("slides")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "slides"
              ? "bg-amber-500 text-white shadow-sm shadow-amber-500/25"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Image Slider ({hero?.images?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab("cards")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "cards"
              ? "bg-amber-500 text-white shadow-sm shadow-amber-500/25"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Layers className="w-4 h-4" /> Floating Cards ({hero?.floatingCards?.length || 0})
        </button>
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

      {/* Tab Contents */}
      {activeTab === "general" && (
        <form onSubmit={handleSaveGeneral} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Badge Icon (Emoji)</label>
              <input
                type="text"
                value={badgeIcon}
                onChange={(e) => setBadgeIcon(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Badge Pill Text</label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Main Hero Headline *</label>
            <input
              type="text"
              required
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-bold text-slate-900 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Hero Subtitle Paragraph *</label>
            <textarea
              rows={3}
              required
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Button Text</label>
              <input
                type="text"
                value={primaryBtnText}
                onChange={(e) => setPrimaryBtnText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Button Link</label>
              <input
                type="text"
                value={primaryBtnLink}
                onChange={(e) => setPrimaryBtnLink(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Button Text</label>
              <input
                type="text"
                value={secondaryBtnText}
                onChange={(e) => setSecondaryBtnText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Button Link</label>
              <input
                type="text"
                value={secondaryBtnLink}
                onChange={(e) => setSecondaryBtnLink(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-sm font-bold shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Hero Copy
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Statistics */}
      {activeTab === "stats" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
            <h3 className="font-serif font-bold text-slate-900 text-lg">Active Statistics Items</h3>
            <button
              onClick={openNewStatModal}
              className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Stat Counter
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hero?.statistics?.map((stat) => (
              <div key={stat.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <h4 className="text-xl font-bold font-serif text-amber-600">{stat.number}</h4>
                  <p className="text-xs text-slate-600 font-semibold">{stat.title}</p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditStatModal(stat)}
                    className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg"
                    title="Edit stat"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteStat(stat.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete stat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Carousel slides */}
      {activeTab === "slides" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
            <h3 className="font-serif font-bold text-slate-900 text-lg">Hero Carousel Slides</h3>
            <button
              onClick={openNewImageModal}
              className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Slide Image
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {hero?.images?.map((img) => (
              <div key={img.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="relative aspect-[4/3] w-full bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.imageUrl} alt={img.altText} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="text-xs text-slate-700 font-bold truncate max-w-[150px]">
                    {img.altText}
                    {img.caption && <span className="block text-[10px] text-slate-400 font-normal">{img.caption}</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditImageModal(img)}
                      className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteImage(img.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Floating cards */}
      {activeTab === "cards" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
            <h3 className="font-serif font-bold text-slate-900 text-lg">Floating Feature Badges</h3>
            <button
              onClick={openNewCardModal}
              className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Floating Card
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hero?.floatingCards?.map((card) => (
              <div key={card.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{card.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{card.title}</h4>
                    <p className="text-xs text-slate-500">{card.description}</p>
                    {card.link && <p className="text-[9px] text-slate-400">Link: {card.link}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditCardModal(card)}
                    className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Add/Edit Stat */}
      {statModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleStatSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              {editingStatId ? "Edit Statistic Counter" : "Add Statistic Counter"}
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Icon (Emoji)</label>
              <input type="text" value={statIcon} onChange={(e) => setStatIcon(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-1 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Number (e.g. 500+)</label>
              <input type="text" required value={statNumber} onChange={(e) => setStatNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-1 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Label (e.g. Events Managed)</label>
              <input type="text" required value={statTitle} onChange={(e) => setStatTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-1 focus:ring-amber-500" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setStatModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">Cancel</button>
              <button type="submit" disabled={saving} className="px-5 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-sm">
                {saving ? "Saving..." : editingStatId ? "Update Item" : "Add Item"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Add/Edit Image Slide */}
      {imageModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleImageSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              {editingImageId ? "Edit Hero Slide Image" : "Add Hero Slide Image"}
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Image File</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Click Select to pick from Library..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-amber-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setMediaModalOpen(true)}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Select
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Alt Text</label>
              <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Grand Royal Wedding Mandap" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-1 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Caption / Overlay Text</label>
              <input type="text" value={imageCaption} onChange={(e) => setImageCaption(e.target.value)} placeholder="Lavish Floral Canopy settings" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-1 focus:ring-amber-500" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setImageModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">Cancel</button>
              <button type="submit" disabled={saving} className="px-5 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-sm">
                {saving ? "Saving..." : editingImageId ? "Update Slide" : "Add Slide"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Add/Edit Card */}
      {cardModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCardSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              {editingCardId ? "Edit Floating Feature Card" : "Add Floating Feature Card"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Icon (Emoji)</label>
                <input type="text" value={cardIcon} onChange={(e) => setCardIcon(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-1 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Color Theme</label>
                <select
                  value={cardColor}
                  onChange={(e) => setCardColor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-1 focus:ring-amber-500 font-semibold text-slate-700"
                >
                  <option value="amber">Amber Gold</option>
                  <option value="orange">Orange Fire</option>
                  <option value="blue">Blue Sky</option>
                  <option value="emerald">Emerald Green</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
              <input type="text" required value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} placeholder="Catering" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-1 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <input type="text" required value={cardDesc} onChange={(e) => setCardDesc(e.target.value)} placeholder="North & Fusion" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-1 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Link Address (Optional)</label>
              <input type="text" value={cardLink} onChange={(e) => setCardLink(e.target.value)} placeholder="e.g. /#services" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:ring-1 focus:ring-amber-500" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setCardModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500">Cancel</button>
              <button type="submit" disabled={saving} className="px-5 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-sm">
                {saving ? "Saving..." : editingCardId ? "Update Card" : "Add Card"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Media Selector Modal Pop-up */}
      <MediaLibraryModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={handleMediaSelect}
        allowMultiple={false}
        title="Select Slide Image"
      />
    </div>
  );
}
