"use client";

import { useState, useEffect } from "react";
import { Send, Loader2, MessageCircle } from "lucide-react";

import { trackContactFormStart, trackContactFormSubmit, trackWhatsAppClick } from "@/lib/gtag";

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
  const [whatsappHandoffUrl, setWhatsappHandoffUrl] = useState<string | null>(null);

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
        trackContactFormSubmit(eventType, serviceNeeded, guestCount);
        const cleanPhone = (whatsappNumber || "919810483544").replace(/[^0-9]/g, "");
        const waText = `Hello Verma Caterers! I just submitted an enquiry:
*Name:* ${name}
*Phone:* ${phone}
${email ? "*Email:* " + email + "\n" : ""}*Event:* ${eventType}
${serviceNeeded ? "*Service Needed:* " + serviceNeeded + "\n" : ""}${eventDate ? "*Event Date:* " + eventDate + "\n" : ""}*Expected Guests:* ${guestCount || "Not specified"}
${message ? "*Details:* " + message : ""}`.trim();

        setWhatsappHandoffUrl(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`);

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

      const waText = `Hello Verma Caterers! I would like to enquire about your services:
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
    <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
      <div className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white mb-2">
        {settings?.formTitle || "Request a Free Quote"}
      </div>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 font-normal">
        {settings?.formDescription || "Fill out your event details below for a customized quotation."}
      </p>

      {statusMsg && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs font-semibold ${
            statusMsg.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60"
              : "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/60"
          }`}
        >
          <p>{statusMsg.text}</p>
          {whatsappHandoffUrl && (
            <div className="mt-3 pt-3 border-t border-emerald-200/80 dark:border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-medium text-emerald-900 dark:text-emerald-300 text-[11px]">
                Want instant assistance? Chat directly with our catering manager:
              </span>
              <a
                href={whatsappHandoffUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("enquiry_success_handoff")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95 flex-shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          )}
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
                <label htmlFor={`form-field-${field.id}`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {field.label} {field.required && "*"}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={`form-field-${field.id}`}
                    rows={3}
                    required={field.required}
                    value={val}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={field.placeholder || ""}
                    aria-label={field.label}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                ) : field.type === "select" ? (
                  <select
                    id={`form-field-${field.id}`}
                    required={field.required}
                    value={val}
                    onChange={(e) => setter(e.target.value)}
                    aria-label={field.label}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none font-medium transition-colors"
                  >
                    <option value="">{field.placeholder || "Select Option"}</option>
                    {field.id === "eventType" ? (
                      dropdownEventTypes.map((opt) => (
                        <option key={opt} value={opt} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                          {opt}
                        </option>
                      ))
                    ) : (
                      dropdownServices.map((opt) => (
                        <option key={opt} value={opt} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                          {opt}
                        </option>
                      ))
                    )}
                  </select>
                ) : (
                  <input
                    id={`form-field-${field.id}`}
                    type={field.type || "text"}
                    required={field.required}
                    value={val}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={field.placeholder || ""}
                    aria-label={field.label}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] mt-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-70 cursor-pointer"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} {settings?.submitBtnText || "Send My Enquiry"}
        </button>
      </form>
    </div>
  );
}
