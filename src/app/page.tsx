"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Send,
  Star,
  ChevronRight,
  ShieldCheck,
  Award,
  HeartHandshake,
  Menu as MenuIcon,
  X,
  Loader2,
} from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [message, setMessage] = useState("");

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
      // Save directly to Next.js API & Prisma Database
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

        // Reset form
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
      // Seamless WhatsApp Fallback
      setStatusMsg({
        type: "success",
        text: "💬 Opening WhatsApp with your enquiry details...",
      });

      const waText = `Hello Shree Balaji Caterers! I would like to enquire about your services:
*Name:* ${name}
*Phone:* ${phone}
${email ? "*Email:* " + email + "\n" : ""}*Event:* ${eventType}
${serviceNeeded ? "*Service:* " + serviceNeeded + "\n" : ""}${eventDate ? "*Event Date:* " + eventDate + "\n" : ""}*Expected Guests:* ${guestCount || "Not specified"}
${message ? "*Details:* " + message : ""}`.trim();

      const cleanPhone = "+919810483544".replace(/[^0-9]/g, "");
      setTimeout(() => {
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`, "_blank");
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/919810483544"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 transition-all hover:scale-110 active:scale-95"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-7 h-7" />
        </a>
        <a
          href="tel:9810483544"
          className="w-14 h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-amber-500/30 transition-all hover:scale-110 active:scale-95"
          title="Call Now"
        >
          <Phone className="w-7 h-7" />
        </a>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-500/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-amber-500/20">
              <Image
                src="/new-logo.png"
                alt="Shree Balaji Logo"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <span className="font-serif font-bold text-xl text-slate-900 leading-tight block">
                Shree Balaji
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600">
                Caterers & Events
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-700">
            <a href="#about" className="hover:text-amber-600 transition-colors">
              About Us
            </a>
            <a href="#services" className="hover:text-amber-600 transition-colors">
              Services
            </a>
            <a href="#portfolio" className="hover:text-amber-600 transition-colors">
              Gallery
            </a>
            <a href="#location" className="hover:text-amber-600 transition-colors">
              Location
            </a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin/login"
              className="text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-200 px-3.5 py-2 rounded-xl transition-all"
            >
              Staff Portal
            </Link>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              Get a Quote ✨
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-amber-600"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 font-semibold text-center">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-800 hover:text-amber-600"
            >
              About Us
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-800 hover:text-amber-600"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-800 hover:text-amber-600"
            >
              Gallery
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-800 hover:text-amber-600"
            >
              Contact
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block w-full py-3 rounded-full bg-amber-500 text-white font-bold"
            >
              Get a Quote ✨
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Delhi NCR's Premier Event Partner
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-[1.15]">
            Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Celebration</span>, Perfectly Crafted.
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From grand weddings to intimate family gatherings — Shree Balaji Caterers brings you world-class catering, stunning floral décor, seamless sound, and complete event management.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base shadow-lg shadow-amber-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Book Your Event ✨
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-base shadow-sm transition-all"
            >
              View Our Work 🎨
            </a>
          </div>
        </div>

        {/* Hero Feature Visuals */}
        <div className="grid grid-cols-2 gap-4 relative">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 rounded-3xl border border-amber-500/20 shadow-sm text-center">
            <div className="text-4xl mb-2">🍽️</div>
            <h3 className="font-bold text-slate-900">Catering</h3>
            <p className="text-xs text-slate-500 mt-1">North, South & Fusion</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 p-6 rounded-3xl border border-orange-500/20 shadow-sm text-center mt-6">
            <div className="text-4xl mb-2">🌸</div>
            <h3 className="font-bold text-slate-900">Floral Décor</h3>
            <p className="text-xs text-slate-500 mt-1">Custom Stage Themes</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-3xl border border-blue-500/20 shadow-sm text-center">
            <div className="text-4xl mb-2">📢</div>
            <h3 className="font-bold text-slate-900">Sound & DJ</h3>
            <p className="text-xs text-slate-500 mt-1">Pro PA Systems</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 rounded-3xl border border-emerald-500/20 shadow-sm text-center mt-6">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="font-bold text-slate-900">Full Events</h3>
            <p className="text-xs text-slate-500 mt-1">Complete Execution</p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-900 text-white py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-amber-400">500+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Events Managed</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-amber-400">15+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-amber-400">1000+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Happy Families</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-amber-400">100%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Satisfaction</div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Why Us</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
            Why Choose Shree Balaji Caterers
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            With 15+ years of experience and 500+ successful events in Delhi NCR, we bring passion, precision, and a personal touch to every celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto text-amber-600">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">15+ Years Trust</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Over a decade of serving Delhi NCR families with reliable, high-quality event services.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto text-orange-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">One-Stop Solution</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Catering, décor, sound, lighting, mattress & cooler rental — everything under one roof.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Customized Menus</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tailored to your specific theme, budget, guest count, and dietary preferences.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto text-purple-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Owner Direct</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Owned & directed by Sandeep Verma — personal attention for every event.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="bg-amber-500/5 py-20 px-6 border-y border-amber-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Our Premium Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-amber-500/40 transition-all group">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">Catering Services</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Authentic North Indian, South Indian, Chinese & Continental cuisines. Live counters, street food stations, and dessert spreads.
              </p>
              <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                Veg & Non-Veg
              </span>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-amber-500/40 transition-all group">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">Floral Decoration</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Breathtaking mandap designs, stage arrangements, entrance gates, and floral canopies with fresh roses, orchids & marigolds.
              </p>
              <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-800">
                Custom Themes
              </span>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-amber-500/40 transition-all group">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">Sound & DJ Setup</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Professional-grade PA systems, DJ consoles, intelligent lighting, truss setups, and wireless microphones for high-energy events.
              </p>
              <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                Pro Audio & Lights
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Enquiry Form Section */}
      <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Get In Touch</span>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
                Let's Plan Your Dream Event
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Call us directly or fill out the enquiry form — we will reach out with a personalized quotation within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Phone / WhatsApp</div>
                  <a href="tel:9810483544" className="text-sm font-semibold text-amber-600 hover:underline">
                    +91 98104 83544
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 text-orange-700 rounded-2xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Email Address</div>
                  <a href="mailto:vermasandeep124@gmail.com" className="text-sm font-semibold text-amber-600 hover:underline">
                    vermasandeep124@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Location</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Dwarka Sector 5, Madhu Vihar, New Delhi (Serving Delhi NCR)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
            <h3 className="font-serif font-bold text-2xl text-slate-900 mb-6">
              🎉 Request a Free Quote
            </h3>

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
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Event Type *
                  </label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Services Needed
                  </label>
                  <select
                    value={serviceNeeded}
                    onChange={(e) => setServiceNeeded(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select Service</option>
                    <option value="Catering Only">Catering Only</option>
                    <option value="Decoration Only">Decoration Only</option>
                    <option value="Sound Setup">Sound Setup</option>
                    <option value="Full Package">Full Package</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Expected Guests
                  </label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tell Us More
                </label>
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="font-serif font-bold text-white text-lg">Shree Balaji Caterers</div>
            <p className="text-xs text-slate-500 mt-1">
              Dwarka, Delhi NCR &bull; Owner & Director: Sandeep Verma
            </p>
          </div>
          <div className="text-xs text-slate-500">
            &copy; 2026 Shree Balaji Caterers. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
