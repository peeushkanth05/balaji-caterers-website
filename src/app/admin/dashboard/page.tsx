import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Coins,
  Activity,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "Admin";
  const userRole = (session?.user as any)?.role || "ADMIN";

  // Fetch metrics from Prisma
  let totalLeads = 0;
  let newLeads = 0;
  let contactedLeads = 0;
  let bookedLeads = 0;
  let completedLeads = 0;
  let cancelledLeads = 0;
  let recentLeads: any[] = [];
  let recentLogs: any[] = [];
  let packages: any[] = [];
  let projectedRevenue = 0;

  try {
    // 1. Leads counts
    totalLeads = await prisma.lead.count();
    newLeads = await prisma.lead.count({ where: { status: "NEW" } });
    contactedLeads = await prisma.lead.count({ where: { status: "CONTACTED" } });
    bookedLeads = await prisma.lead.count({ where: { status: "BOOKED" } });
    completedLeads = await prisma.lead.count({ where: { status: "COMPLETED" } });
    cancelledLeads = await prisma.lead.count({ where: { status: "CANCELLED" } });

    // 2. Fetch packages for pricing calculation
    packages = await prisma.package.findMany({
      select: { name: true, pricePerPerson: true },
    });

    // 3. Calculate Projected Revenue from BOOKED leads
    const bookedEvents = await prisma.lead.findMany({
      where: { status: "BOOKED" },
      select: { guestCount: true, service: true },
    });

    bookedEvents.forEach((lead) => {
      const guests = lead.guestCount || 0;
      const matchedPkg = packages.find((p) => p.name === lead.service);
      const price = matchedPkg ? matchedPkg.pricePerPerson : 750; // default ₹750/plate
      projectedRevenue += guests * price;
    });

    // 4. Recent lead activities
    recentLeads = await prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    // 5. Recent audit logs
    recentLogs = await prisma.auditLog.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });
  } catch (e) {
    console.error("Database fetch error on dashboard:", e);
  }

  // Calculated Metrics
  const conversionRate = totalLeads > 0 ? ((bookedLeads + completedLeads) / totalLeads) * 100 : 0;

  // Aggregate Event Types for distribution indicator
  const eventTypeCounts: Record<string, number> = {};
  let validLeadsForEvents = 0;
  recentLeads.forEach((l) => {
    if (l.eventType) {
      eventTypeCounts[l.eventType] = (eventTypeCounts[l.eventType] || 0) + 1;
      validLeadsForEvents++;
    }
  });

  return (
    <div className="space-y-8">
      {/* Dynamic Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-amber-500/10 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-amber-500 font-bold text-xs uppercase tracking-wider">Control Center Overview</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Welcome back, {userName}!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Logged in as <span className="font-semibold text-slate-700 dark:text-slate-300">{userRole === "SUPER_ADMIN" ? "Super Admin (Owner)" : "Staff Admin"}</span>
          </p>
        </div>

        <Link
          href="/admin/leads"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-md shadow-amber-500/20 transition-all active:scale-95 text-sm"
        >
          View CRM Pipeline <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Leads */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Enquiries</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{totalLeads}</h3>
          </div>
          <span className="absolute bottom-0 right-0 w-16 h-16 bg-amber-500/5 rounded-tl-full translate-x-4 translate-y-4 group-hover:scale-110 transition-transform" />
        </div>

        {/* Conversion Rate */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Conversion Rate</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {conversionRate.toFixed(1)}%
            </h3>
          </div>
          <span className="absolute bottom-0 right-0 w-16 h-16 bg-blue-500/5 rounded-tl-full translate-x-4 translate-y-4 group-hover:scale-110 transition-transform" />
        </div>

        {/* Projected Revenue */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-600">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Projected Revenue</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              ₹{projectedRevenue.toLocaleString("en-IN")}
            </h3>
          </div>
          <span className="absolute bottom-0 right-0 w-16 h-16 bg-emerald-50/5 rounded-tl-full translate-x-4 translate-y-4 group-hover:scale-110 transition-transform" />
        </div>

        {/* Pending Action */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Pending Action</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {newLeads} <span className="text-xs font-normal text-slate-450 dark:text-slate-400">new / {contactedLeads} contacted</span>
            </h3>
          </div>
          <span className="absolute bottom-0 right-0 w-16 h-16 bg-rose-500/5 rounded-tl-full translate-x-4 translate-y-4 group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Projections & Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dynamic Category Proportions */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" /> Event Distribution
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Breakdown of recent inquiries by event type</p>
          </div>

          <div className="space-y-4">
            {Object.keys(eventTypeCounts).length === 0 ? (
              <p className="text-slate-400 dark:text-slate-500 text-xs py-4 text-center">No recent data to plot.</p>
            ) : (
              Object.entries(eventTypeCounts).map(([type, count]) => {
                const percentage = validLeadsForEvents > 0 ? (count / validLeadsForEvents) * 100 : 0;
                return (
                  <div key={type} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-350">
                      <span>{type}</span>
                      <span>
                        {count} {count === 1 ? "lead" : "leads"} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-950 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Lead Pipeline Funnel */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" /> CRM Pipeline Stage
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Active conversion funnel breakdown</p>
          </div>

          <div className="space-y-3.5">
            {[
              { label: "New Leads", count: newLeads, color: "bg-blue-500" },
              { label: "Contacted", count: contactedLeads, color: "bg-amber-500" },
              { label: "Booked", count: bookedLeads, color: "bg-emerald-500" },
              { label: "Completed", count: completedLeads, color: "bg-purple-500" },
              { label: "Cancelled", count: cancelledLeads, color: "bg-slate-400" },
            ].map((stage) => {
              const maxVal = Math.max(totalLeads, 1);
              const barWidth = (stage.count / maxVal) * 100;
              return (
                <div key={stage.label} className="flex items-center justify-between gap-4 text-xs">
                  <span className="w-24 font-bold text-slate-600 dark:text-slate-400">{stage.label}</span>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-950 h-4 rounded-md overflow-hidden relative">
                    <div
                      className={`${stage.color} h-full transition-all duration-500`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-bold text-slate-900 dark:text-white">{stage.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Recent Enquiries & Audit Logs Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">Recent Customer Enquiries</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Latest form submissions from website</p>
              </div>
              <Link
                href="/admin/leads"
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-0.5"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {recentLeads.length === 0 ? (
              <div className="p-12 text-center text-slate-400 dark:text-slate-500">
                <Clock className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-medium">No customer enquiries submitted yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-450 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Client</th>
                      <th className="px-6 py-3.5">Event</th>
                      <th className="px-6 py-3.5">Guests</th>
                      <th className="px-6 py-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-850/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 dark:text-white">{lead.name}</div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500">{lead.phone}</div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">
                          {lead.eventType}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-350">
                          {lead.guestCount || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              lead.status === "NEW"
                                ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40 text-blue-700 dark:text-blue-400"
                                : lead.status === "BOOKED"
                                ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-450"
                                : lead.status === "CONTACTED"
                                ? "bg-amber-50 dark:bg-amber-955/20 border-amber-200 dark:border-amber-900/40 text-amber-700 dark:text-amber-450"
                                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
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

        {/* Audit Logs Timeline */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-500" /> Recent Actions Log
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Timeline of recent site modification actions</p>
          </div>

          <div className="space-y-4 flex-1 mt-4">
            {recentLogs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500 py-8">
                <Activity className="w-8 h-8 opacity-20 mb-2" />
                <p className="text-xs font-semibold">No recent activity logged</p>
                <p className="text-[10px]">Changes made across CMS will appear here.</p>
              </div>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 border-l-2 border-slate-200 dark:border-slate-800 pl-4 relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute -left-[6px] top-1" />
                  <div className="text-xs">
                    <p className="font-bold text-slate-800 dark:text-white">
                      {log.user.name} <span className="font-normal text-slate-500 dark:text-slate-400">({log.action})</span>
                    </p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">{log.details}</p>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(log.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
