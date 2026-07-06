"use client";

import { useState, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

export function PublicForm({
  whatsappNumber,
  availableServices = [],
}: {
  whatsappNumber: string;
  availableServices?: any[];
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
          text: "✅ Enquiry Received! Our team will call you shortly.",
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
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
      <h3 className="font-serif font-bold text-2xl text-slate-900 mb-2">
        🎉 Request a Free Quote
      </h3>
      <p className="text-xs text-slate-500 mb-6">
        Fill out your event details below for a customized quotation.
      </p>

      {statusMsg && (
        <div
          className={`mb-6 p-4 rounded-2xl text-xs font-bold ${
            statusMsg.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Peeyush Kanth"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Event Type *</label>
            <select
              required
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select Event</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday Party">Birthday Party</option>
              <option value="Engagement">Engagement</option>
              <option value="Corporate Event">Corporate Event</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Service Needed</label>
            <select
              value={serviceNeeded}
              onChange={(e) => setServiceNeeded(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500 font-medium"
            >
              <option value="">Select Service</option>
              {availableServices.length > 0 ? (
                availableServices.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))
              ) : (
                <>
                  <option value="Catering Services">Catering Services</option>
                  <option value="Wedding Host">Wedding Host</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Puja & Kirtan">Puja & Kirtan</option>
                  <option value="Floral Decoration">Floral Decoration</option>
                  <option value="Sound & DJ Setup">Sound & DJ Setup</option>
                  <option value="Event Management (End-to-End)">Event Management (End-to-End)</option>
                  <option value="Stall Booking">Stall Booking</option>
                  <option value="Event Anchoring">Event Anchoring</option>
                  <option value="Cooler Rental">Cooler Rental</option>
                  <option value="Mattress Rental">Mattress Rental</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Expected Guests</label>
            <input
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              placeholder="e.g. 200"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Tell Us More</label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any specific venue preferences or special requests..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />} Send My Enquiry
        </button>
      </form>
    </div>
  );
}
