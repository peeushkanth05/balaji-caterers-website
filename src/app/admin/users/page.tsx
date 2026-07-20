"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Trash2, Edit2, Loader2, Key, CheckSquare, Square, Shield } from "lucide-react";

const MODULES = [
  { id: "dashboard", name: "Dashboard Stats" },
  { id: "enquiries", name: "Enquiries & Leads" },
  { id: "packages", name: "Catering Packages" },
  { id: "services", name: "Offered Services" },
  { id: "portfolio", name: "Grand Projects Portfolio" },
  { id: "gallery", name: "Photo Gallery" },
  { id: "videos", name: "Video Gallery" },
  { id: "testimonials", name: "Customer Testimonials" },
  { id: "contact", name: "Contact & Form Settings" },
  { id: "homepageSections", name: "Homepage Ordering" },
  { id: "blogs", name: "Blogs & Guides" },
  { id: "media", name: "Media Library" },
  { id: "settings", name: "Site Settings" },
];

const ACTIONS = [
  { id: "view", label: "View" },
  { id: "add", label: "Add" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
  { id: "publish", label: "Publish" },
];

export default function UsersAdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [permissions, setPermissions] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load users list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setRole("ADMIN");
    setPermissions({});
    setModalOpen(true);
  };

  const openEditModal = (u: any) => {
    setEditingId(u.id);
    setName(u.name);
    setEmail(u.email);
    setPassword("");
    setPhone(u.phone || "");
    setRole(u.role);
    setPermissions(u.permissions ? JSON.parse(u.permissions) : {});
    setModalOpen(true);
  };

  const handlePermissionToggle = (moduleId: string, actionId: string) => {
    setPermissions((prev) => {
      const copy = { ...prev };
      const current = copy[moduleId] || [];
      if (current.includes(actionId)) {
        copy[moduleId] = current.filter((a) => a !== actionId);
      } else {
        copy[moduleId] = [...current, actionId];
      }
      return copy;
    });
  };

  const handleSelectAllModule = (moduleId: string) => {
    setPermissions((prev) => {
      const copy = { ...prev };
      const current = copy[moduleId] || [];
      if (current.length === ACTIONS.length) {
        copy[moduleId] = []; // Clear all
      } else {
        copy[moduleId] = ACTIONS.map((a) => a.id); // Set all
      }
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/users", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          name,
          email,
          password: password || undefined,
          phone,
          role,
          permissions: JSON.stringify(permissions),
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        setSuccessMsg(editingId ? "User account updated successfully!" : "New user created successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchUsers();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to save user account");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving user account");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete user account "${name}"?`)) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setSuccessMsg(`User account "${name}" deleted.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || "Error deleting user");
      }
    } catch (e) {
      alert("Error deleting user account");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-500" /> Role & Permission Management
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Manage administrative staff logins, select roles, and toggle granular View, Add, Edit, Delete, or Publish actions across modules.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" /> Create User Account
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl">
          ✓ {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-bold rounded-2xl">
          ⚠ {errorMsg}
        </div>
      )}

      {/* Users table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{user.email}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{user.phone || "—"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.role === "SUPER_ADMIN"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      <Shield className="w-3 h-3" /> {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="p-2 border border-slate-100 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors bg-white inline-flex items-center"
                      title="Edit Account / Permissions"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      className="p-2 border border-red-100 hover:bg-red-50 text-red-500 rounded-xl transition-colors bg-white inline-flex items-center"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account / Permission Matrix Dialog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4">
              {editingId ? "Edit Account & Access Rights" : "Create Staff Admin Login"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Credentials details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" Peeyush Kanth"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@vermacaterers.in"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password {editingId ? "(Leave blank to keep current)" : "*"}
                  </label>
                  <input
                    type="password"
                    required={!editingId}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">User Authorization Role *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="ADMIN">STAFF ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER ADMIN (Full Access Bypass)</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Matrix checkboxes (Only configure if not Super Admin!) */}
              {role !== "SUPER_ADMIN" ? (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 border-b pb-1 border-slate-100 flex items-center justify-between">
                    <span>Granular Module Permissions matrix</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">View, Add, Edit, Delete, Publish</span>
                  </h3>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs bg-slate-50">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                          <th className="px-4 py-2.5">CMS Module / Component</th>
                          {ACTIONS.map((a) => (
                            <th key={a.id} className="px-2 py-2.5 text-center w-16">{a.label}</th>
                          ))}
                          <th className="px-2 py-2.5 text-center w-16">All</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {MODULES.map((m) => {
                          const activeActions = permissions[m.id] || [];
                          const isAllSelected = activeActions.length === ACTIONS.length;

                          return (
                            <tr key={m.id} className="hover:bg-slate-50/50">
                              <td className="px-4 py-2 font-semibold text-slate-800">{m.name}</td>
                              {ACTIONS.map((action) => {
                                const isChecked = activeActions.includes(action.id);
                                return (
                                  <td key={action.id} className="px-2 py-2 text-center">
                                    <button
                                      type="button"
                                      onClick={() => handlePermissionToggle(m.id, action.id)}
                                      className="inline-flex items-center justify-center p-1 text-slate-500 hover:text-slate-900"
                                    >
                                      {isChecked ? (
                                        <CheckSquare className="w-4 h-4 text-amber-500" />
                                      ) : (
                                        <Square className="w-4 h-4 text-slate-300" />
                                      )}
                                    </button>
                                  </td>
                                );
                              })}
                              <td className="px-2 py-2 text-center bg-slate-50/50">
                                <button
                                  type="button"
                                  onClick={() => handleSelectAllModule(m.id)}
                                  className="text-[10px] font-bold text-amber-600 hover:underline"
                                >
                                  {isAllSelected ? "Clear" : "All"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 text-xs font-medium">
                  💡 <strong>Super Admin Note:</strong> This user automatically bypasses all permissions checks and has full read, write, export, publish, and delete authorizations across all CMS components.
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
