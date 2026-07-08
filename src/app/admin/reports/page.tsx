"use client";

import { useEffect, useState } from "react";
import { BarChart3, Download, Users, UtensilsCrossed, HelpCircle, BookOpen, Layers, Image as ImageIcon, Loader2 } from "lucide-react";

export default function ReportsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/reports")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const triggerCsvDownload = (type: "leads" | "packages") => {
    window.open(`/api/admin/reports?export=${type}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-amber-500" /> Analytics & Reports
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Analyze leads flow, check package options, and download business exports for Excel or CRM import.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : !stats ? (
        <div className="text-center py-10 bg-white border border-slate-200 rounded-3xl text-slate-400">
          Failed to load analytics statistics.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Counters Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Leads</span>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{stats.totalLeads}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Catering Pkgs</span>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{stats.totalPackages}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Blog Guides</span>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{stats.totalBlogs}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Media Files</span>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{stats.totalMedia}</p>
              </div>
            </div>
          </div>

          {/* Lead Status Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-serif font-bold text-slate-900">Enquiries Status Breakdown</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">New Requests</span>
                  <p className="text-lg font-bold text-blue-600 mt-0.5">{stats.statusCounts.NEW || 0}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Booked Events</span>
                  <p className="text-lg font-bold text-emerald-600 mt-0.5">{stats.statusCounts.BOOKED || 0}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Contacted</span>
                  <p className="text-lg font-bold text-amber-600 mt-0.5">{stats.statusCounts.CONTACTED || 0}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Quotes Sent</span>
                  <p className="text-lg font-bold text-indigo-600 mt-0.5">{stats.statusCounts.QUOTATION_SENT || 0}</p>
                </div>
              </div>
            </div>

            {/* Quick Export Panel */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-slate-900">Export Raw Databases</h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Download database sheets instantly to generate corporate reports or back up information offline.
                </p>
              </div>

              <div className="space-y-3 mt-6">
                <button
                  onClick={() => triggerCsvDownload("leads")}
                  className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 py-3.5 px-4 rounded-xl text-slate-700 font-bold text-xs transition-colors"
                >
                  <span className="flex items-center gap-2">📥 Leads & Enquiries Sheet (CSV)</span>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => triggerCsvDownload("packages")}
                  className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 py-3.5 px-4 rounded-xl text-slate-700 font-bold text-xs transition-colors"
                >
                  <span className="flex items-center gap-2">📥 Catering Packages Sheet (CSV)</span>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
