"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Loader2, RefreshCw } from "lucide-react";

export default function ConsentLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/admin/consent-logs");
      const data = await res.json();
      if (data.logs) setLogs(data.logs);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load consent logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-500" /> DPDP Consent Audit Trail
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Audit logs of client privacy agreements, cookie acceptances, WhatsApp update consents, and newsletter preferences.
          </p>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-slate-900">User Agreement Audits</h2>
          <button
            onClick={fetchLogs}
            className="p-2 hover:bg-slate-50 text-slate-500 rounded-xl transition-colors"
            title="Refresh logs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            No consent logs recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider">
                  <th className="py-4 px-6">Timestamp</th>
                  <th className="py-4 px-6">IP Address</th>
                  <th className="py-4 px-6">Device / User Agent</th>
                  <th className="py-4 px-6 text-center">Privacy policy</th>
                  <th className="py-4 px-6 text-center">WhatsApp Updates</th>
                  <th className="py-4 px-6 text-center">Newsletter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-slate-400">
                      {new Date(log.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-4 px-6 font-mono text-[10px] text-slate-600">{log.ipAddress}</td>
                    <td className="py-4 px-6 text-slate-500 max-w-[200px] truncate" title={log.userAgent}>
                      {log.userAgent}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        log.privacyConsent ? "bg-emerald-50 text-emerald-800 border border-emerald-100/50" : "bg-red-50 text-red-800"
                      }`}>
                        {log.privacyConsent ? "ACCEPTED" : "NO"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        log.whatsappConsent ? "bg-emerald-50 text-emerald-800 border border-emerald-100/50" : "bg-slate-100 text-slate-400"
                      }`}>
                        {log.whatsappConsent ? "GRANTED" : "NO"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        log.marketingConsent ? "bg-emerald-50 text-emerald-800 border border-emerald-100/50" : "bg-slate-100 text-slate-400"
                      }`}>
                        {log.marketingConsent ? "GRANTED" : "NO"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
