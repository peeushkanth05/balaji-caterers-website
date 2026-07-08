"use client";

import { useEffect, useState } from "react";
import { Database, Download, Plus, Loader2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export default function BackupPage() {
  const [backups, setBackups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchBackups = async () => {
    try {
      const res = await fetch("/api/admin/backup");
      const data = await res.json();
      if (data.backups) setBackups(data.backups);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to fetch backup history logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  const triggerBackup = async () => {
    setTriggering(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      // Direct user browser to download target
      window.open("/api/admin/backup?download=1", "_blank");
      
      setSuccessMsg("Database backup generated and download initiated!");
      setTimeout(() => setSuccessMsg(""), 5000);
      
      // Refresh list after brief timeout to let it write logs
      setTimeout(fetchBackups, 2000);
    } catch (err) {
      setErrorMsg("Failed to start backup");
    } finally {
      setTriggering(false);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-6 h-6 text-amber-500" /> Database Backup Manager
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Maintain complete data safety. Generate and download JSON backups of all catering packages, service pages, leads logs, and settings.
          </p>
        </div>

        <button
          onClick={triggerBackup}
          disabled={triggering}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-50"
        >
          {triggering ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Generate Full Backup
        </button>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 border border-emerald-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-800 text-xs font-bold rounded-2xl flex items-center gap-2 border border-red-100">
          <AlertCircle className="w-4 h-4 text-red-600" /> {errorMsg}
        </div>
      )}

      {/* Backup Log History */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-slate-900">Backup Logs History</h2>
          <button
            onClick={fetchBackups}
            className="p-2 hover:bg-slate-50 text-slate-500 rounded-xl transition-colors"
            title="Refresh history logs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          </div>
        ) : backups.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            No backup logs found. Click "Generate Full Backup" to run your first data dump.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider">
                  <th className="py-4 px-6">Timestamp</th>
                  <th className="py-4 px-6">Filename</th>
                  <th className="py-4 px-6">Backup Size</th>
                  <th className="py-4 px-6">Triggered By</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {backups.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-slate-400">
                      {new Date(b.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-800">{b.filename}</td>
                    <td className="py-4 px-6">{formatBytes(b.fileSize)}</td>
                    <td className="py-4 px-6 text-slate-500">{b.createdBy}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-100/50 uppercase">
                        {b.status}
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
