"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Save,
  Loader2,
  Phone,
  Mail,
  MapPin,
  User,
  CheckCircle2,
  Info,
  AlertCircle,
  Building,
  Image as ImageIcon,
  Share2,
  BarChart,
  Calendar,
} from "lucide-react";
import { MediaLibraryModal } from "@/components/admin/MediaLibraryModal";

export default function SiteSettingsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"branding" | "contact" | "social" | "seo" | "about">("branding");

  // Reusable Media Library Selector states
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<"logo" | "favicon" | "seoImage" | null>(null);

  // Branding Info State
  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");

  // Contact Info State
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [businessHours, setBusinessHours] = useState("");

  // Social Links State
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  // SEO & Analytics State
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoOgImage, setSeoOgImage] = useState("");

  // About Section State
  const [aboutTag, setAboutTag] = useState("");
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutSubtitle, setAboutSubtitle] = useState("");

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.settings) {
        setCompanyName(data.settings.companyName || "");
        setLogoUrl(data.settings.logoUrl || "");
        setFaviconUrl(data.settings.faviconUrl || "");

        setPhone(data.settings.phone || "");
        setWhatsapp(data.settings.whatsapp || "");
        setEmail(data.settings.email || "");
        setOwnerName(data.settings.ownerName || "");
        setAddress(data.settings.address || "");
        setMapsUrl(data.settings.mapsUrl || "");
        setBusinessHours(data.settings.businessHours || "");

        setFacebookUrl(data.settings.facebookUrl || "");
        setInstagramUrl(data.settings.instagramUrl || "");
        setYoutubeUrl(data.settings.youtubeUrl || "");
        setTwitterUrl(data.settings.twitterUrl || "");

        setGoogleAnalyticsId(data.settings.googleAnalyticsId || "");
        setSeoTitle(data.settings.seoTitle || "");
        setSeoDescription(data.settings.seoDescription || "");
        setSeoOgImage(data.settings.seoOgImage || "");

        setAboutTag(data.settings.aboutTag || "");
        setAboutTitle(data.settings.aboutTitle || "");
        setAboutSubtitle(data.settings.aboutSubtitle || "");
      }
    } catch (e) {
      console.error("Failed to fetch settings", e);
      setErrorMsg("Failed to load settings from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const openMediaSelector = (target: "logo" | "favicon" | "seoImage") => {
    setMediaTarget(target);
    setMediaModalOpen(true);
  };

  const handleMediaSelect = (url: string) => {
    if (mediaTarget === "logo") setLogoUrl(url);
    if (mediaTarget === "favicon") setFaviconUrl(url);
    if (mediaTarget === "seoImage") setSeoOgImage(url);
    setMediaTarget(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    const payload = {
      companyName,
      logoUrl,
      faviconUrl,
      phone,
      whatsapp,
      email,
      ownerName,
      address,
      mapsUrl,
      businessHours,
      facebookUrl,
      instagramUrl,
      youtubeUrl,
      twitterUrl,
      googleAnalyticsId,
      seoTitle,
      seoDescription,
      seoOgImage,
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
        setSuccessMsg("All business settings & meta configurations updated successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to update settings");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-500" /> Website Settings Control Center
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage company branding, contacts, social media accounts, global SEO metatags, and analytics scripts from one location.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("branding")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "branding"
              ? "bg-amber-500 text-white shadow-sm shadow-amber-500/25"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Building className="w-4 h-4" /> Branding & Logo
        </button>

        <button
          onClick={() => setActiveTab("contact")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "contact"
              ? "bg-amber-500 text-white shadow-sm shadow-amber-500/25"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Phone className="w-4 h-4" /> Business Info
        </button>

        <button
          onClick={() => setActiveTab("social")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "social"
              ? "bg-amber-500 text-white shadow-sm shadow-amber-500/25"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Share2 className="w-4 h-4" /> Social Links
        </button>

        <button
          onClick={() => setActiveTab("seo")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "seo"
              ? "bg-amber-500 text-white shadow-sm shadow-amber-500/25"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BarChart className="w-4 h-4" /> SEO & Analytics
        </button>

        <button
          onClick={() => setActiveTab("about")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "about"
              ? "bg-amber-500 text-white shadow-sm shadow-amber-500/25"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Info className="w-4 h-4" /> About Us Copy
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
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-500" />
          <p className="text-sm">Loading site settings...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          {/* BRANDING TAB */}
          {activeTab === "branding" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Uploader */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Company Logo</label>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                      <img src={logoUrl || "/new-logo.png"} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => openMediaSelector("logo")}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-sm"
                      >
                        Select Logo
                      </button>
                      <p className="text-[10px] text-slate-400">Suggest 256x256 WebP/PNG image</p>
                    </div>
                  </div>
                </div>

                {/* Favicon Uploader */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Website Favicon</label>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                      <img src={faviconUrl || "/favicon.ico"} alt="Favicon" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => openMediaSelector("favicon")}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-sm"
                      >
                        Select Favicon
                      </button>
                      <p className="text-[10px] text-slate-400">Suggest 32x32 standard ICO format</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT INFO TAB */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Owner Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Phone *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number (e.g., 919810483544) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <input
                      type="text"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Business Hours *</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={businessHours}
                      onChange={(e) => setBusinessHours(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps URL *</label>
                  <input
                    type="url"
                    required
                    value={mapsUrl}
                    onChange={(e) => setMapsUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business Address *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SOCIAL LINKS TAB */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Facebook Profile URL</label>
                  <input
                    type="url"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Profile URL</label>
                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/yourpage"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Channel URL</label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/c/yourchannel"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Twitter / X URL</label>
                  <input
                    type="url"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="https://x.com/yourpage"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO & ANALYTICS TAB */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Google Analytics ID (G-XXXXXXX)</label>
                  <input
                    type="text"
                    value={googleAnalyticsId}
                    onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                    placeholder="G-123456789"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Default SEO Meta Title *</label>
                  <input
                    type="text"
                    required
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Default SEO Meta Description *</label>
                <textarea
                  rows={3}
                  required
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Default Social OpenGraph (OG) Image</label>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="w-24 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img src={seoOgImage || "/new-logo.png"} alt="SEO OG" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => openMediaSelector("seoImage")}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-sm"
                    >
                      Select Default OG Image
                    </button>
                    <p className="text-[10px] text-slate-400">Used when sharing website link on WhatsApp/Facebook</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT US COPY TAB */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">About Section Tagline *</label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">About Section Title *</label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">About Section Subtitle / Paragraph *</label>
                <textarea
                  rows={4}
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

      {/* Media Selector Modal Pop-up */}
      <MediaLibraryModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={handleMediaSelect}
        allowMultiple={false}
        title="Select Branding Asset"
      />
    </div>
  );
}
