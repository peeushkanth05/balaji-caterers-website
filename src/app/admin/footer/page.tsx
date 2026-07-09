"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Info, ShieldCheck, HelpCircle, FileText, Landmark, FileQuestion } from "lucide-react";

export default function AdminFooterPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "policies">("general");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Footer fields states
  const [aboutText, setAboutText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [copyrightText, setCopyrightText] = useState("");

  // Legal markdown states
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [termsOfService, setTermsOfService] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [cookiePolicy, setCookiePolicy] = useState("");
  const [disclaimer, setDisclaimer] = useState("");

  useEffect(() => {
    fetch("/api/admin/footer")
      .then((res) => res.json())
      .then((data) => {
        if (data.footer) {
          const f = data.footer;
          setAboutText(f.aboutText || "");
          setLocationText(f.locationText || "");
          setMapsUrl(f.mapsUrl || "");
          setPhone(f.phone || "");
          setEmail(f.email || "");
          setCopyrightText(f.copyrightText || "");
          setPrivacyPolicy(f.privacyPolicy || "");
          setTermsOfService(f.termsOfService || "");
          setRefundPolicy(f.refundPolicy || "");
          setCancellationPolicy(f.cancellationPolicy || "");
          setCookiePolicy(f.cookiePolicy || "");
          setDisclaimer(f.disclaimer || "");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/footer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aboutText,
          locationText,
          mapsUrl,
          phone,
          email,
          copyrightText,
          privacyPolicy,
          termsOfService,
          refundPolicy,
          cancellationPolicy,
          cookiePolicy,
          disclaimer,
        }),
      });

      if (res.ok) {
        setSuccessMsg("Footer content & policy settings updated successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to update footer");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            📂 Footer CMS Manager
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage company briefs, coordinates, map coordinates, copyright statements, and DPDP-compliant legal policy markdowns.
          </p>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("general")}
          className={`pb-3 px-4 font-bold text-xs transition-all border-b-2 uppercase ${
            activeTab === "general"
              ? "border-amber-500 text-amber-600"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          General Footer Info
        </button>
        <button
          onClick={() => setActiveTab("policies")}
          className={`pb-3 px-4 font-bold text-xs transition-all border-b-2 uppercase ${
            activeTab === "policies"
              ? "border-amber-500 text-amber-600"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          Legal Policy Markdowns
        </button>
      </div>

      {/* Toast notifications */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl border border-emerald-100">
          ✨ {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-800 text-xs font-bold rounded-2xl border border-red-100">
          ⚠️ {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Tab 1: General Info */}
          {activeTab === "general" && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-serif font-bold text-slate-900 border-b pb-2 border-slate-100">
                Company Details & Location
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company Summary About Text</label>
                  <textarea
                    rows={3}
                    required
                    value={aboutText}
                    onChange={(e) => setAboutText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    placeholder="Short brief showing in the first column of the footer..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location Address Text</label>
                  <input
                    type="text"
                    required
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps Redirect URL</label>
                  <input
                    type="url"
                    required
                    value={mapsUrl}
                    onChange={(e) => setMapsUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Copyright Footer Notice</label>
                  <input
                    type="text"
                    required
                    value={copyrightText}
                    onChange={(e) => setCopyrightText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Legal policy markdowns */}
          {activeTab === "policies" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Privacy Policy */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck className="w-4.5 h-4.5 text-amber-500" /> Privacy Policy
                </h3>
                <textarea
                  rows={8}
                  value={privacyPolicy}
                  onChange={(e) => setPrivacyPolicy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Terms of Service */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <Landmark className="w-4.5 h-4.5 text-amber-500" /> Terms & Conditions
                </h3>
                <textarea
                  rows={8}
                  value={termsOfService}
                  onChange={(e) => setTermsOfService(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Refund Policy */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <FileText className="w-4.5 h-4.5 text-amber-500" /> Refund Policy
                </h3>
                <textarea
                  rows={8}
                  value={refundPolicy}
                  onChange={(e) => setRefundPolicy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Cancellation Policy */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <FileQuestion className="w-4.5 h-4.5 text-amber-500" /> Cancellation Policy
                </h3>
                <textarea
                  rows={8}
                  value={cancellationPolicy}
                  onChange={(e) => setCancellationPolicy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Cookie Policy */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <Info className="w-4.5 h-4.5 text-amber-500" /> Cookie Policy
                </h3>
                <textarea
                  rows={8}
                  value={cookiePolicy}
                  onChange={(e) => setCookiePolicy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Disclaimer */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <HelpCircle className="w-4.5 h-4.5 text-amber-500" /> Disclaimer
                </h3>
                <textarea
                  rows={8}
                  value={disclaimer}
                  onChange={(e) => setDisclaimer(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

            </div>
          )}

          {/* Footer Save Action Bar */}
          <div className="flex items-center justify-end bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs py-3.5 px-8 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Footer Settings
                </>
              )}
            </button>
          </div>

        </form>
      )}
    </div>
  );
}
