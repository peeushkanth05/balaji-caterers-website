import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "Admin";
  const userRole = (session?.user as any)?.role || "ADMIN";

  // Fetch quick metrics from Prisma
  let totalLeads = 0;
  let newLeads = 0;
  let bookedLeads = 0;
  let recentLeads: any[] = [];

  try {
    totalLeads = await prisma.lead.count();
    newLeads = await prisma.lead.count({ where: { status: "NEW" } });
    bookedLeads = await prisma.lead.count({ where: { status: "BOOKED" } });
    recentLeads = await prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Database fetch error on dashboard:", e);
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-amber-500/10 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-amber-500 font-semibold text-sm">Control Center Overview</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            Welcome back, {userName}!
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Logged in as <span className="font-semibold text-slate-700">{userRole === "SUPER_ADMIN" ? "Super Admin (Owner)" : "Staff Admin"}</span>
          </p>
        </div>

        <Link
          href="/admin/leads"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-md shadow-amber-500/20 transition-all active:scale-95"
        >
          View All Enquiries <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-xl bg-amber-500/10 text-amber-600">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-0.5">{totalLeads}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-xl bg-blue-500/10 text-blue-600">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">New Enquiries</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-0.5">{newLeads}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Booked Events</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-0.5">{bookedLeads}</h3>
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-xl text-slate-900">Recent Customer Enquiries</h2>
            <p className="text-xs text-slate-500 mt-0.5">Latest 5 form submissions from website</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            View All ({totalLeads}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Clock className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">No customer enquiries submitted yet.</p>
            <p className="text-xs text-slate-400 mt-1">
              Submissions from the homepage contact form will appear here in real-time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Guests</th>
                  <th className="px-6 py-4">Date Submitted</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{lead.name}</div>
                      <div className="text-xs text-slate-500">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-800">{lead.eventType}</span>
                      {lead.service && (
                        <div className="text-xs text-slate-400">{lead.service}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">
                      {lead.guestCount || "—"}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          lead.status === "NEW"
                            ? "bg-blue-100 text-blue-700"
                            : lead.status === "BOOKED"
                            ? "bg-emerald-100 text-emerald-700"
                            : lead.status === "CONTACTED"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {lead.status}
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
