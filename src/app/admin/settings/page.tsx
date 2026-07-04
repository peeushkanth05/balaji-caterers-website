"use client";

import { useEffect, useState } from "react";
import { Settings, Save, Loader2, Phone, Mail, MapPin, User, CheckCircle2, Sparkles, BarChart2, Info } from "lucide-react";

export default function SiteSettingsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState("contact");

  // Contact Info
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");

  // Hero Section
  const [heroBadge, setHeroBadge] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  // Stats Counters
  const [stat1Number, setStat1Number] = useState("");
  const [stat1Label, setStat1Label] = useState("");
  const [stat2Number, setStat2Number] = useState("");
  const [stat2Label, setStat2Label] = useState("");
  const [stat3Number, setStat3Number] = useState("");
  const [stat3Label, setStat3Label] = useState("");
  const [stat4Number, setStat4Number] = useState("");
  const [stat4Label, setStat4Label] = useState("");

  // About Section
  const [aboutTag, setAboutTag] = useState("");
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutSubtitle, setAboutSubtitle] = useState("");

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.settings) {
        setPhone(data.settings.phone || "");
        setWhatsapp(data.settings.whatsapp || "");
        setEmail(data.settings.email || "");
        setOwnerName(data.settings.ownerName || "");
        setAddress(data.settings.address || "");
        setMapsUrl(data.settings.mapsUrl || "");

        setHeroBadge(data.settings.heroBadge || "");
        setHeroTitle(data.settings.heroTitle || "");
        setHeroSubtitle(data.settings.heroSubtitle || "");

        setStat1Number(data.settings.stat1Number || "");
        setStat1Label(data.settings.stat1Label || "");
        setStat2Number(data.settings.stat2Number || "");
        setStat2Label(data.settings.stat2Label || "");
        setStat3Number(data.settings.stat3Number || "");
        setStat3Label(data.settings.stat3Label || "");
        setStat4Number(data.settings.stat4Number || "");
        setStat4Label(data.settings.stat4Label || "");

        setAboutTag(data.settings.aboutTag || "");
        setAboutTitle(data.settings.aboutTitle || "");
        setAboutSubtitle(data.settings.aboutSubtitle || "");
      }
    } catch (e) {
      console.error("Failed to fetch settings", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");

    const payload = {
      phone,
      whatsapp,
      email,
      ownerName,
      address,
      mapsUrl,
      heroBadge,
      heroTitle,
      heroSubtitle,
      stat1Number,
      stat1Label,
      stat2Number,
      stat2Label,
      stat3Number,
      stat3Label,
      stat4Number,
      stat4Label,
      aboutTag,
      aboutTitle,
      aboutSubtitle,
    };

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMsg("✅ Website content & settings updated successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (e) {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-serif font-bold text-slate-900">
          Full Site Content & Business Settings
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Edit phone numbers, Hero headlines, animated stats counters, and About section copy in real-time.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("contact")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "contact"
              ? "bg-amber-500 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Phone className="w-3.5 h-3.5" /> Contact & Business Info
        </button>

        <button
          onClick={() => setActiveTab("hero")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "hero"
              ? "bg-amber-500 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Hero Section
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "stats"
              ? "bg-amber-500 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" /> Stats Counters
        </button>

        <button
          onClick={() => setActiveTab("about")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "about"
              ? "bg-amber-500 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Info className="w-3.5 h-3.5" /> About Us Section
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-500" />
          <p className="text-sm">Loading site settings...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          {/* TAB 1: Contact Info */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Owner / Director Name</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number (with country code)</label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps Link</label>
                <input
                  type="text"
                  required
                  value={mapsUrl}
                  onChange={(e) => setMapsUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Hero Section */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hero Pill Badge Tag</label>
                <input
                  type="text"
                  required
                  value={heroBadge}
                  onChange={(e) => setHeroBadge(e.target.value)}
                  placeholder="e.g. Delhi NCR's Premier Event Partner"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hero Main Headline Title</label>
                <input
                  type="text"
                  required
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="e.g. Every Celebration, Perfectly Crafted."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hero Subtitle Paragraph</label>
                <textarea
                  rows={3}
                  required
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Stats Counters */}
          {activeTab === "stats" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 uppercase">Stat #1</h4>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Number</label>
                    <input
                      type="text"
                      value={stat1Number}
                      onChange={(e) => setStat1Number(e.target.value)}
                      placeholder="500+"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={stat1Label}
                      onChange={(e) => setStat1Label(e.target.value)}
                      placeholder="Events Managed"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 uppercase">Stat #2</h4>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Number</label>
                    <input
                      type="text"
                      value={stat2Number}
                      onChange={(e) => setStat2Number(e.target.value)}
                      placeholder="15+"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={stat2Label}
                      onChange={(e) => setStat2Label(e.target.value)}
                      placeholder="Years Experience"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 uppercase">Stat #3</h4>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Number</label>
                    <input
                      type="text"
                      value={stat3Number}
                      onChange={(e) => setStat3Number(e.target.value)}
                      placeholder="1000+"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={stat3Label}
                      onChange={(e) => setStat3Label(e.target.value)}
                      placeholder="Happy Families"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 uppercase">Stat #4</h4>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Number</label>
                    <input
                      type="text"
                      value={stat4Number}
                      onChange={(e) => setStat4Number(e.target.value)}
                      placeholder="100%"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={stat4Label}
                      onChange={(e) => setStat4Label(e.target.value)}
                      placeholder="Satisfaction"
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: About Us */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">About Section Tag</label>
                <input
                  type="text"
                  required
                  value={aboutTag}
                  onChange={(e) => setAboutTag(e.target.value)}
                  placeholder="e.g. Why Us"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">About Section Title</label>
                <input
                  type="text"
                  required
                  value={aboutTitle}
                  onChange={(e) => setAboutTitle(e.target.value)}
                  placeholder="e.g. Why Choose Shree Balaji Caterers"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">About Section Subtitle Paragraph</label>
                <textarea
                  rows={3}
                  required
                  value={aboutSubtitle}
                  onChange={(e) => setAboutSubtitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-sm font-bold shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save All Settings
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
