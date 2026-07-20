"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  MessageSquare,
  Phone,
  Calendar,
  Clock,
  Filter,
  CheckCircle,
  XCircle,
  Edit3,
  Loader2,
  ExternalLink,
  Save,
  Download,
} from "lucide-react";

export default function LeadManagementPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [noteText, setNoteText] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notesSuccess, setNotesSuccess] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads", { credentials: "include" });
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.error("Failed to fetch leads", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
        credentials: "include",
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
      }
    } catch (e) {
      console.error("Failed to update status", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    setUpdatingId(leadId);
    setNotesSuccess(false);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, notes: noteText }),
        credentials: "include",
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, notes: noteText } : l))
        );
        setNotesSuccess(true);
        setTimeout(() => {
          setNotesSuccess(false);
          setSelectedLead(null);
        }, 1200);
      } else {
        alert("Failed to save notes");
      }
    } catch (e) {
      console.error("Failed to save notes", e);
      alert("Error saving notes");
    } finally {
      setUpdatingId(null);
    }
  };

  const openWhatsApp = (lead: any) => {
    const text = `Hello ${lead.name}! Thank you for contacting Verma Caterers regarding your ${lead.eventType} enquiry. We would love to discuss your menu & requirements!`;
    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleExport = (format: "csv" | "xlsx") => {
    const query = new URLSearchParams({
      format,
      status: statusFilter,
      search,
      startDate,
      endDate,
    });
    window.open(`/api/admin/leads/export?${query.toString()}`, "_blank");
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");

      const doc = new jsPDF({ orientation: "landscape" });

      doc.setFontSize(18);
      doc.text("Verma Caterers - Lead Enquiry Report", 14, 15);
      
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString("en-IN")} | Status Filter: ${statusFilter}`, 14, 22);

      const tableData = filteredLeads.map((lead) => [
        lead.name,
        lead.phone,
        lead.email || "N/A",
        lead.eventType,
        lead.service || "General",
        lead.guestCount ? String(lead.guestCount) : "N/A",
        lead.eventDate ? new Date(lead.eventDate).toLocaleDateString("en-IN") : "N/A",
        lead.status,
        lead.notes || "",
        new Date(lead.createdAt).toLocaleDateString("en-IN"),
      ]);

      (doc as any).autoTable({
        head: [[
          "Name", "Phone", "Email", "Event Type", "Service", "Guests", "Event Date", "Status", "Notes", "Created"
        ]],
        body: tableData,
        startY: 28,
        theme: "striped",
        headStyles: { fillColor: [245, 158, 11] }, // Amber 500
        styles: { fontSize: 8, cellPadding: 2 },
        columnStyles: {
          8: { cellWidth: 40 }, // Notes column wrap
        }
      });

      doc.save(`leads_report_${Date.now()}.pdf`);
    } catch (e) {
      console.error("PDF export error", e);
      alert("Failed to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      (lead.email && lead.email.toLowerCase().includes(search.toLowerCase())) ||
      lead.eventType.toLowerCase().includes(search.toLowerCase()) ||
      (lead.service && lead.service.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;

    let matchesDate = true;
    if (startDate || endDate) {
      if (lead.eventDate) {
        const eventD = new Date(lead.eventDate);
        if (startDate) {
          const start = new Date(startDate);
          if (eventD < start) matchesDate = false;
        }
        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          if (eventD > end) matchesDate = false;
        }
      } else {
        matchesDate = false;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            Enquiry & Lead Management
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Track customer quote requests, update statuses, add internal notes, and connect via WhatsApp.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">
            Total Records: <strong className="text-slate-900">{filteredLeads.length}</strong>
          </span>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search name, phone, or event..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
            {["ALL", "NEW", "CONTACTED", "BOOKED", "COMPLETED", "CANCELLED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === status
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Date Filter & Export Group */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Event Date:
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
              />
              <span className="text-xs text-slate-400 font-bold">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
              />
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="text-xs font-bold text-red-500 hover:text-red-700 ml-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => handleExport("xlsx")}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Excel
            </button>
            <button
              onClick={() => handleExport("csv")}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" /> CSV
            </button>
            <button
              disabled={isExporting}
              onClick={handleExportPDF}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Exporting...
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" /> PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-500" />
          <p className="text-sm">Loading enquiries...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-semibold">No enquiries match your search filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Client Details</th>
                  <th className="px-6 py-4">Event & Guests</th>
                  <th className="px-6 py-4">Event Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{lead.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" /> {lead.phone}
                      </div>
                      {lead.email && (
                        <div className="text-xs text-slate-400 mt-0.5">{lead.email}</div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{lead.eventType}</div>
                      <div className="text-xs text-amber-600 font-medium">
                        {lead.service || "General Package"} &bull; {lead.guestCount ? `${lead.guestCount} Guests` : "Guests unspecified"}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-600">
                      {lead.eventDate ? (
                        <div className="flex items-center gap-1 font-medium text-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(lead.eventDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      ) : (
                        <span className="text-slate-400">Not set</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border focus:outline-none cursor-pointer ${
                          lead.status === "NEW"
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : lead.status === "BOOKED"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : lead.status === "CONTACTED"
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : lead.status === "COMPLETED"
                            ? "bg-purple-50 border-purple-200 text-purple-700"
                            : "bg-slate-100 border-slate-200 text-slate-600"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUOTATION_SENT">QUOTATION_SENT</option>
                        <option value="BOOKED">BOOKED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openWhatsApp(lead)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                      </button>
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setNoteText(lead.notes || "");
                          setNotesSuccess(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Notes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
              Internal Notes — {selectedLead.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {selectedLead.eventType} &bull; {selectedLead.phone}
            </p>

            {notesSuccess && (
              <div className="mb-4 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                ✓ Notes saved successfully! Auto-closing...
              </div>
            )}

            {selectedLead.message && (
              <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Customer Message:</strong> "{selectedLead.message}"
              </div>
            )}

            <textarea
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add staff notes (e.g. Quoted ₹750/plate on call, waiting for confirmation)..."
              className="w-full text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4"
            />

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                disabled={updatingId === selectedLead.id}
                onClick={() => handleSaveNotes(selectedLead.id)}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <Save className="w-3.5 h-3.5" /> Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
