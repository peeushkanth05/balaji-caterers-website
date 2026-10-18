"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Smile,
  RotateCcw,
  Trash2,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface StatisticItem {
  id: string;
  icon: string;
  number: string;
  title: string;
  sortOrder: number;
  isEnabled: boolean;
}

const OFFICIAL_DEFAULTS = [
  { sortOrder: 1, icon: "🏆", number: "500+", title: "Events Managed" },
  { sortOrder: 2, icon: "⭐", number: "15+", title: "Years Experience" },
  { sortOrder: 3, icon: "💗", number: "1000+", title: "Happy Families" },
  { sortOrder: 4, icon: "💯", number: "100%", title: "Satisfaction" },
];

const PRESET_EMOJIS = [
  "🏆", "⭐", "💗", "❤️", "💯",
  "🍽️", "✨", "🎉", "👑", "🌟",
  "🎂", "🥂", "🔥", "👏", "💐",
  "🎊", "🥇", "🎯", "💎", "🤝",
];

export default function EmojiManagerPage() {
  const [stats, setStats] = useState<StatisticItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [restoringAll, setRestoringAll] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/emojis");
      const data = await res.json();
      if (data.statistics) {
        setStats(data.statistics);
      }
    } catch (e) {
      setErrorMsg("Failed to load statistics emojis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleEmojiChange = (id: string, newEmoji: string) => {
    setStats((prev) =>
      prev.map((item) => (item.id === id ? { ...item, icon: newEmoji } : item))
    );
  };

  const handleToggleCardEnable = async (item: StatisticItem) => {
    const updatedState = !item.isEnabled;
    setStats((prev) =>
      prev.map((s) => (s.id === item.id ? { ...s, isEnabled: updatedState } : s))
    );

    try {
      setSavingId(item.id);
      const res = await fetch("/api/admin/emojis", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, isEnabled: updatedState }),
      });
      if (!res.ok) throw new Error();
      setSuccessMsg(`Card "${item.title}" ${updatedState ? "enabled" : "disabled"}`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (e) {
      setErrorMsg("Failed to update status");
      setTimeout(() => setErrorMsg(""), 3000);
      fetchStats();
    } finally {
      setSavingId(null);
    }
  };

  const handleRemoveEmoji = async (item: StatisticItem) => {
    setStats((prev) =>
      prev.map((s) => (s.id === item.id ? { ...s, icon: "" } : s))
    );

    try {
      setSavingId(item.id);
      const res = await fetch("/api/admin/emojis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove-emoji", id: item.id }),
      });
      if (!res.ok) throw new Error();
      setSuccessMsg(`Emoji removed for "${item.title}". Card will display number only.`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (e) {
      setErrorMsg("Failed to remove emoji");
      setTimeout(() => setErrorMsg(""), 3000);
      fetchStats();
    } finally {
      setSavingId(null);
    }
  };

  const handleRestoreDefault = async (item: StatisticItem, index: number) => {
    const defaultData = OFFICIAL_DEFAULTS[index] || OFFICIAL_DEFAULTS[0];
    const defaultIcon = defaultData.icon;

    setStats((prev) =>
      prev.map((s) => (s.id === item.id ? { ...s, icon: defaultIcon, isEnabled: true } : s))
    );

    try {
      setSavingId(item.id);
      const res = await fetch("/api/admin/emojis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "restore-single",
          id: item.id,
          defaultIcon,
        }),
      });
      if (!res.ok) throw new Error();
      setSuccessMsg(`Restored default emoji (${defaultIcon}) for "${item.title}"`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (e) {
      setErrorMsg("Failed to restore default emoji");
      setTimeout(() => setErrorMsg(""), 3000);
      fetchStats();
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveItem = async (item: StatisticItem) => {
    try {
      setSavingId(item.id);
      const res = await fetch("/api/admin/emojis", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          icon: item.icon,
          number: item.number,
          title: item.title,
          isEnabled: item.isEnabled,
        }),
      });
      if (!res.ok) throw new Error();
      setSuccessMsg(`Saved changes for "${item.title}"!`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (e) {
      setErrorMsg("Failed to save changes");
      setTimeout(() => setErrorMsg(""), 3000);
    } finally {
      setSavingId(null);
    }
  };

  const handleRestoreAllDefaults = async () => {
    if (!window.confirm("Restore all 4 statistic cards to their official defaults?\n\n• 🏆 500+ Events Managed\n• ⭐ 15+ Years Experience\n• 💗 1000+ Happy Families\n• 💯 100% Satisfaction")) {
      return;
    }

    try {
      setRestoringAll(true);
      const res = await fetch("/api/admin/emojis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore-defaults" }),
      });
      const data = await res.json();
      if (data.statistics) {
        setStats(data.statistics);
        setSuccessMsg("Restored all 4 cards to default emojis!");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      setErrorMsg("Failed to restore default emojis");
      setTimeout(() => setErrorMsg(""), 4000);
    } finally {
      setRestoringAll(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading Emoji & Icon Manager...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">Emoji & Icon Manager</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                Homepage Statistics
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Change, disable, remove, or restore the emojis displayed above the four statistic numbers on the homepage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleRestoreAllDefaults}
            disabled={restoringAll}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
            title="Reset all 4 cards back to official defaults"
          >
            {restoringAll ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            ) : (
              <RotateCcw className="w-4 h-4 text-slate-500" />
            )}
            Restore All Defaults
          </button>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Live Homepage
          </Link>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-sm animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Live Preview Container (Mirroring Homepage) */}
      <div className="bg-gradient-to-br from-amber-500/5 via-slate-50 to-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Live Homepage Preview
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold">
            Real-time appearance above numbers
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const defaultData = OFFICIAL_DEFAULTS[idx] || OFFICIAL_DEFAULTS[0];
              const isDefault = stat.icon === defaultData.icon;
              const hasIcon = stat.icon && stat.icon.trim() !== "";

              return (
                <div
                  key={stat.id}
                  className={`relative text-center p-4 rounded-2xl transition-all border ${
                    stat.isEnabled
                      ? "bg-slate-50 border-slate-100 shadow-sm"
                      : "bg-slate-100/60 border-dashed border-slate-300 opacity-60"
                  }`}
                >
                  {!stat.isEnabled && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-200 text-slate-600">
                      Hidden
                    </span>
                  )}
                  {hasIcon ? (
                    <div className="text-3xl mb-1 select-none" role="img" aria-label={stat.title}>
                      {stat.icon}
                    </div>
                  ) : (
                    <div className="text-[10px] font-bold text-slate-400 mb-2 italic">
                      [No Emoji]
                    </div>
                  )}
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600">
                    {stat.number}
                  </div>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">{stat.title}</p>

                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400">Default:</span>
                    <span className="text-xs">{defaultData.icon}</span>
                    {isDefault ? (
                      <span className="text-[9px] font-extrabold text-emerald-600 uppercase bg-emerald-50 px-1 rounded">
                        Active
                      </span>
                    ) : (
                      <span className="text-[9px] font-extrabold text-amber-600 uppercase bg-amber-50 px-1 rounded">
                        Custom
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4 Cards Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, idx) => {
          const defaultData = OFFICIAL_DEFAULTS[idx] || OFFICIAL_DEFAULTS[0];
          const isSaving = savingId === stat.id;
          const isDefault = stat.icon === defaultData.icon;
          const hasIcon = stat.icon && stat.icon.trim() !== "";

          return (
            <div
              key={stat.id}
              className={`bg-white rounded-3xl border transition-all p-6 space-y-5 shadow-sm ${
                stat.isEnabled ? "border-slate-200" : "border-slate-300 bg-slate-50/50"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shadow-inner">
                    {hasIcon ? stat.icon : "—"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-md">
                        Card #{idx + 1}
                      </span>
                      {isDefault && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Official Default
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {stat.number} {stat.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleCardEnable(stat)}
                    disabled={isSaving}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                      stat.isEnabled
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                    title={stat.isEnabled ? "Card is visible on homepage" : "Card is hidden"}
                  >
                    {stat.isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="hidden sm:inline">{stat.isEnabled ? "Enabled" : "Disabled"}</span>
                  </button>
                </div>
              </div>

              {/* Emoji Input & Custom Picker */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Emoji Icon
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Type any emoji or pick from presets
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={stat.icon}
                      onChange={(e) => handleEmojiChange(stat.id, e.target.value)}
                      placeholder="e.g. 🏆"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-base font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => handleRemoveEmoji(stat)}
                    disabled={isSaving || !hasIcon}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-500 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-40"
                    title="Remove emoji (show number only)"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>

                  <button
                    onClick={() => handleRestoreDefault(stat, idx)}
                    disabled={isSaving || isDefault}
                    className="px-3 py-2.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-40"
                    title={`Restore default emoji (${defaultData.icon})`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Default ({defaultData.icon})</span>
                  </button>
                </div>

                {/* Preset Emoji Palette */}
                <div className="pt-2">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Quick Preset Selector:
                  </p>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-2xl border border-slate-200/80">
                    {PRESET_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleEmojiChange(stat.id, emoji)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform hover:scale-125 active:scale-95 ${
                          stat.icon === emoji
                            ? "bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-110"
                            : "hover:bg-white bg-slate-100/80"
                        }`}
                        title={`Select ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Number and Label Inputs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Counter Number
                  </label>
                  <input
                    type="text"
                    value={stat.number}
                    onChange={(e) =>
                      setStats((prev) =>
                        prev.map((s) => (s.id === stat.id ? { ...s, number: e.target.value } : s))
                      )
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-900 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Label Text
                  </label>
                  <input
                    type="text"
                    value={stat.title}
                    onChange={(e) =>
                      setStats((prev) =>
                        prev.map((s) => (s.id === stat.id ? { ...s, title: e.target.value } : s))
                      )
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-900 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {hasIcon ? `Active Emoji: ${stat.icon}` : "No emoji assigned"}
                </span>

                <button
                  onClick={() => handleSaveItem(stat)}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Navigation Card */}
      <div className="p-5 bg-white rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Need more Hero customizations?</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            You can also configure background banners, hero slides, and floating cards in the Hero Banner CMS.
          </p>
        </div>
        <Link
          href="/admin/hero"
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors flex-shrink-0"
        >
          Open Hero Banner CMS →
        </Link>
      </div>
    </div>
  );
}
