"use client";

import { useState, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

const DEFAULT_FIELDS = [
  { id: "name", name: "name", label: "Your Name", placeholder: "Peeyush Kanth", required: true, isEnabled: true, displayOrder: 0, type: "text" },
  { id: "phone", name: "phone", label: "Mobile Number", placeholder: "+91 98765 43210", required: true, isEnabled: true, displayOrder: 1, type: "text" },
  { id: "email", name: "email", label: "Email Address", placeholder: "you@example.com", required: false, isEnabled: true, displayOrder: 2, type: "email" },
  { id: "eventType", name: "eventType", label: "Event Type", placeholder: "Select Event", required: true, isEnabled: true, displayOrder: 3, type: "select" },
  { id: "service", name: "service", label: "Service Needed", placeholder: "Select Service", required: false, isEnabled: true, displayOrder: 4, type: "select" },
  { id: "eventDate", name: "eventDate", label: "Event Date", placeholder: "dd-mm-yyyy", required: false, isEnabled: true, displayOrder: 5, type: "date" },
  { id: "guestCount", name: "guestCount", label: "Expected Guests", placeholder: "e.g. 200", required: false, isEnabled: true, displayOrder: 6, type: "number" },
  { id: "message", name: "message", label: "Tell Us More", placeholder: "Any specific venue preferences or special requests...", required: false, isEnabled: true, displayOrder: 7, type: "textarea" }
];

export function PublicForm({
  whatsappNumber,
  availableServices = [],
  settings,
}: {
  whatsappNumber: string;
  availableServices?: any[];
  settings?: any;
}) {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [message, setMessage] = useState("");

  // Listen for service selection from Services section
  useEffect(() => {
    const handleServiceSelect = (e: any) => {
      if (e.detail) {
        setServiceNeeded(e.detail);
      }
    };
    window.addEventListener("select-service-enquiry", handleServiceSelect);
    return () => {
      window.removeEventListener("select-service-enquiry", handleServiceSelect);
    };
  }, []);

  // Parse fields configuration
  let activeFields = DEFAULT_FIELDS;
  let dropdownEventTypes = ["Wedding", "Birthday Party", "Engagement", "Corporate Event", "Anniversary", "Other"];
  let dropdownServices = availableServices.map(s => s.title);

  if (settings) {
    try {
      if (settings.fieldsJson) {
        const parsedFields = JSON.parse(settings.fieldsJson);
        if (Array.isArray(parsedFields) && parsedFields.length > 0) {
          activeFields = parsedFields;
        }
      }
      if (settings.eventTypesJson) {
        const parsedEvents = JSON.parse(settings.eventTypesJson);
        if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
          dropdownEventTypes = parsedEvents;
        }
      }
      if (settings.servicesJson) {
        const parsedServices = JSON.parse(settings.servicesJson);
        if (Array.isArray(parsedServices) && parsedServices.length > 0) {
          dropdownServices = parsedServices;
        }
      }
    } catch (err) {
      console.error("Error parsing Enquiry Form settings", err);
    }
  }

  // Filter and sort active fields
  const visibleFields = activeFields
    .filter((f) => f.isEnabled)
    .sort((a, b) => Number(a.displayOrder) - Number(b.displayOrder));

  const getState = (id: string) => {
    switch (id) {
      case "name": return name;
      case "phone": return phone;
      case "email": return email;
      case "eventType": return eventType;
      case "service": return serviceNeeded;
      case "eventDate": return eventDate;
      case "guestCount": return guestCount;
      case "message": return message;
      default: return "";
    }
  };

  const getSetter = (id: string) => {
    switch (id) {
      case "name": return setName;
      case "phone": return setPhone;
      case "email": return setEmail;
      case "eventType": return setEventType;
      case "service": return setServiceNeeded;
      case "eventDate": return setEventDate;
      case "guestCount": return setGuestCount;
      case "message": return setMessage;
      default: return () => {};
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    const payload = {
      name,
      phone,
      email,
      eventType,
      serviceNeeded,
      eventDate,
      guestCount,
      message,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setStatusMsg({
          type: "success",
          text: settings?.successMessage || "✅ Enquiry Received! Our team will call you shortly.",
        });
        setName("");
        setPhone("");
        setEmail("");
        setEventType("");
        setServiceNeeded("");
        setEventDate("");
        setGuestCount("");
        setMessage("");
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (err) {
      setStatusMsg({
        type: "success",
        text: "💬 Opening WhatsApp with your enquiry details...",
      });

      const waText = `Hello Shree Balaji Caterers! I would like to enquire about your services:
*Name:* ${name}
*Phone:* ${phone}
${email ? "*Email:* " + email + "\n" : ""}*Event:* ${eventType}
${serviceNeeded ? "*Service Needed:* " + serviceNeeded + "\n" : ""}${eventDate ? "*Event Date:* " + eventDate + "\n" : ""}*Expected Guests:* ${guestCount || "Not specified"}
${message ? "*Details:* " + message : ""}`.trim();

      const cleanPhone = (whatsappNumber || "919810483544").replace(/[^0-9]/g, "");
      setTimeout(() => {
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`, "_blank");
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
      <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white mb-2">
        {settings?.formTitle || "🎉 Request a Free Quote"}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
        {settings?.formDescription || "Fill out your event details below for a customized quotation."}
      </p>

      {statusMsg && (
        <div
          className={`mb-6 p-4 rounded-2xl text-xs font-bold ${
            statusMsg.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-450 border border-emerald-200 dark:border-emerald-900/40"
              : "bg-red-50 dark:bg-red-955/20 text-red-800 dark:text-red-450 border border-red-200 dark:border-red-900/40"
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleFields.map((field) => {
            const isWide = field.id === "email" || field.id === "message";
            const val = getState(field.id);
            const setter = getSetter(field.id);

            return (
              <div key={field.id} className={isWide ? "sm:col-span-2" : ""}>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {field.label} {field.required && "*"}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    required={field.required}
                    value={val}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={field.placeholder || ""}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                ) : field.type === "select" ? (
                  <select
                    required={field.required}
                    value={val}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
                  >
                    <option value="">{field.placeholder || "Select Option"}</option>
                    {field.id === "eventType" ? (
                      dropdownEventTypes.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))
                    ) : (
                      dropdownServices.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))
                    )}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    required={field.required}
                    value={val}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={field.placeholder || ""}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] mt-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />} {settings?.submitBtnText || "Send My Enquiry"}
        </button>
      </form>
    </div>
  );
}
