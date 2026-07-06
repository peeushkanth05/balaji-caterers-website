"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Loader2, Save, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

export default function ContactSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Form info states
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionHeading, setSectionHeading] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [submitBtnText, setSubmitBtnText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Array states
  const [fields, setFields] = useState<any[]>([]);
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);

  // Add item temp states
  const [newEventType, setNewEventType] = useState("");
  const [newService, setNewService] = useState("");

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/contact");
      const data = await res.json();
      if (data.settings) {
        const s = data.settings;
        setSectionTitle(s.sectionTitle);
        setSectionHeading(s.sectionHeading);
        setFormTitle(s.formTitle);
        setFormDescription(s.formDescription);
        setPhone(s.phone);
        setEmail(s.email);
        setAddress(s.address);
        setSubmitBtnText(s.submitBtnText);
        setSuccessMessage(s.successMessage);
        setErrorMessage(s.errorMessage);

        setFields(JSON.parse(s.fieldsJson || "[]"));
        setEventTypes(JSON.parse(s.eventTypesJson || "[]"));
        setServices(JSON.parse(s.servicesJson || "[]"));
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load contact settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleFieldChange = (index: number, key: string, value: any) => {
    setFields((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const handleAddEventType = () => {
    if (!newEventType.trim()) return;
    setEventTypes((prev) => [...prev, newEventType.trim()]);
    setNewEventType("");
  };

  const handleRemoveEventType = (val: string) => {
    setEventTypes((prev) => prev.filter((item) => item !== val));
  };

  const handleAddService = () => {
    if (!newService.trim()) return;
    setServices((prev) => [...prev, newService.trim()]);
    setNewService("");
  };

  const handleRemoveService = (val: string) => {
    setServices((prev) => prev.filter((item) => item !== val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      // Sort fields before saving
      const sortedFields = [...fields].sort((a, b) => Number(a.displayOrder) - Number(b.displayOrder));

      const res = await fetch("/api/admin/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionTitle,
          sectionHeading,
          formTitle,
          formDescription,
          phone,
          email,
          address,
          submitBtnText,
          successMessage,
          errorMessage,
          fieldsJson: JSON.stringify(sortedFields),
          eventTypesJson: JSON.stringify(eventTypes),
          servicesJson: JSON.stringify(services),
        }),
      });

      if (res.ok) {
        setSuccessMsg("Contact page & enquiry settings updated successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchSettings();
      } else {
        throw new Error("Failed to update settings");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving contact settings");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-6 h-6 text-amber-500" /> Contact & Enquiry Section Settings
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Configure titles, labels, placeholders, input visibility, required fields, and selection dropdown values dynamically.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl">
          ✓ {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-bold rounded-2xl">
          ⚠ {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: General Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column A: Contact details */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-950 border-b pb-2 border-slate-100 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-amber-500" /> Contact Details Info
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Section Header Tag</label>
              <input
                type="text"
                required
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Section Main Heading</label>
              <input
                type="text"
                required
                value={sectionHeading}
                onChange={(e) => setSectionHeading(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number Displayed</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address Displayed</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Physical Location Address</label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Column B: Form Meta settings */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-950 border-b pb-2 border-slate-100 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-amber-500" /> Form Headers & Responses
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Form Heading Title</label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Form Description Subtext</label>
              <textarea
                rows={2}
                required
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Submit Button Text</label>
              <input
                type="text"
                required
                value={submitBtnText}
                onChange={(e) => setSubmitBtnText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Form Success Notification Msg</label>
              <input
                type="text"
                required
                value={successMessage}
                onChange={(e) => setSuccessMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Form Field Manager Grid */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-lg text-slate-950 border-b pb-2 border-slate-100">
            Form Inputs Field Settings
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Field ID</th>
                  <th className="px-4 py-3">Display Label Name</th>
                  <th className="px-4 py-3">Placeholder Text</th>
                  <th className="px-4 py-3 text-center">Enabled</th>
                  <th className="px-4 py-3 text-center">Required</th>
                  <th className="px-4 py-3">Display Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fields.map((field, idx) => (
                  <tr key={field.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{field.id}</td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => handleFieldChange(idx, "label", e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={field.placeholder || ""}
                        onChange={(e) => handleFieldChange(idx, "placeholder", e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none w-full"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={field.isEnabled}
                        onChange={(e) => handleFieldChange(idx, "isEnabled", e.target.checked)}
                        className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => handleFieldChange(idx, "required", e.target.checked)}
                        className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={field.displayOrder}
                        onChange={(e) => handleFieldChange(idx, "displayOrder", Number(e.target.value))}
                        className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none w-20"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Dropdown Lists Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Types Dropdown CMS */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-955 border-b pb-2 border-slate-100">
              Event Types Dropdown Values
            </h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add type (e.g. Baby Shower)"
                value={newEventType}
                onChange={(e) => setNewEventType(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddEventType}
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 max-h-[220px] overflow-y-auto p-1 bg-slate-50 rounded-2xl border border-slate-200">
              {eventTypes.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveEventType(item)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Services Dropdown CMS */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-955 border-b pb-2 border-slate-100">
              Services Dropdown Values
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add service (e.g. Tent Rental)"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddService}
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 max-h-[220px] overflow-y-auto p-1 bg-slate-50 rounded-2xl border border-slate-200">
              {services.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveService(item)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer save bar */}
        <div className="flex items-center justify-end bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs py-3.5 px-6 rounded-2xl transition-all shadow-sm active:scale-[0.99]"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" /> Save Configuration Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
