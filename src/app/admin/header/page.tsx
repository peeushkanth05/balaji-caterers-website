"use client";

import { useEffect, useState } from "react";
import {
  Navigation,
  Save,
  Loader2,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Submenu {
  id: string;
  menuId: string;
  label: string;
  link: string;
  displayOrder: number;
  isActive: boolean;
}

interface Menu {
  id: string;
  label: string;
  link: string;
  displayOrder: number;
  isServicesDropdown: boolean;
  isActive: boolean;
  submenus: Submenu[];
}

interface HeaderAction {
  id: string;
  label: string;
  link: string;
  style: string;
  displayOrder: number;
  active: boolean;
}

interface HeaderSettings {
  stickyHeader: boolean;
  topBarActive: boolean;
  topBarText: string;
  showSocials: boolean;
  showContact: boolean;
}

export default function AdminHeaderManagerPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [settings, setSettings] = useState<HeaderSettings>({
    stickyHeader: true,
    topBarActive: true,
    topBarText: "",
    showSocials: true,
    showContact: true,
  });

  const [menus, setMenus] = useState<Menu[]>([]);
  const [actions, setActions] = useState<HeaderAction[]>([]);

  // Modal / Form States
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null); // For submenus toggle
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [submenuModalOpen, setSubmenuModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);

  // Form Fields
  const [menuForm, setMenuForm] = useState({ id: "", label: "", link: "", displayOrder: 0, isServicesDropdown: false, isActive: true });
  const [submenuForm, setSubmenuForm] = useState({ id: "", menuId: "", label: "", link: "", displayOrder: 0, isActive: true });
  const [actionForm, setActionForm] = useState({ id: "", label: "", link: "", style: "primary", displayOrder: 0, active: true });

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/header");
      const data = await res.json();
      if (data.settings) setSettings(data.settings);
      if (data.menus) setMenus(data.menus);
      if (data.actions) setActions(data.actions);
    } catch (e) {
      setErrorMsg("Failed to load header configurations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // 1. Save Settings
  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/header", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "settings", payload: settings }),
      });
      if (res.ok) {
        showToast("General header settings updated successfully!");
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  // 2. Add / Edit Menu Submit
  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/header", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "menu", payload: menuForm }),
      });
      if (res.ok) {
        setMenuModalOpen(false);
        showToast(menuForm.id ? "Menu updated successfully!" : "Menu created successfully!");
        fetchData();
      } else {
        throw new Error("Failed to save menu");
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  // 3. Add / Edit Submenu Submit
  const handleSubmenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/header", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "submenu", payload: submenuForm }),
      });
      if (res.ok) {
        setSubmenuModalOpen(false);
        showToast(submenuForm.id ? "Submenu updated successfully!" : "Submenu created successfully!");
        fetchData();
      } else {
        throw new Error("Failed to save submenu");
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  // 4. Add / Edit Action Submit
  const handleActionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/header", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "action", payload: actionForm }),
      });
      if (res.ok) {
        setActionModalOpen(false);
        showToast(actionForm.id ? "Action button updated successfully!" : "Action button created successfully!");
        fetchData();
      } else {
        throw new Error("Failed to save action button");
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  // 5. Delete handlers
  const handleDeleteMenu = async (id: string, name: string) => {
    if (!confirm(`Permanently delete navigation menu "${name}"? This deletes all submenus.`)) return;
    try {
      await fetch("/api/admin/header", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "delete-menu", payload: { id } }),
      });
      showToast("Menu deleted!");
      fetchData();
    } catch (e) {
      setErrorMsg("Failed to delete menu");
    }
  };

  const handleDeleteSubmenu = async (id: string, name: string) => {
    if (!confirm(`Delete submenu "${name}"?`)) return;
    try {
      await fetch("/api/admin/header", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "delete-submenu", payload: { id } }),
      });
      showToast("Submenu deleted!");
      fetchData();
    } catch (e) {
      setErrorMsg("Failed to delete submenu");
    }
  };

  const handleDeleteAction = async (id: string, name: string) => {
    if (!confirm(`Delete button "${name}"?`)) return;
    try {
      await fetch("/api/admin/header", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "delete-action", payload: { id } }),
      });
      showToast("Action button deleted!");
      fetchData();
    } catch (e) {
      setErrorMsg("Failed to delete button");
    }
  };

  // 6. Sorting Order Actions
  const handleMoveMenu = async (index: number, direction: "up" | "down") => {
    const updated = [...menus];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;

    // Swap displayOrder values
    const tempOrder = updated[index].displayOrder;
    updated[index].displayOrder = updated[targetIdx].displayOrder;
    updated[targetIdx].displayOrder = tempOrder;

    // Save orders in database
    const items = [
      { id: updated[index].id, displayOrder: updated[index].displayOrder },
      { id: updated[targetIdx].id, displayOrder: updated[targetIdx].displayOrder },
    ];

    try {
      await fetch("/api/admin/header", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "reorder-menus", payload: { items } }),
      });
      fetchData();
    } catch (e) {
      setErrorMsg("Reordering failed");
    }
  };

  const openNewMenuModal = () => {
    setMenuForm({ id: "", label: "", link: "", displayOrder: menus.length, isServicesDropdown: false, isActive: true });
    setMenuModalOpen(true);
  };

  const openEditMenuModal = (menu: Menu) => {
    setMenuForm({
      id: menu.id,
      label: menu.label,
      link: menu.link,
      displayOrder: menu.displayOrder,
      isServicesDropdown: menu.isServicesDropdown ?? false,
      isActive: menu.isActive ?? true,
    });
    setMenuModalOpen(true);
  };

  const openNewSubmenuModal = (menuId: string, subLength: number) => {
    setSubmenuForm({ id: "", menuId, label: "", link: "", displayOrder: subLength, isActive: true });
    setSubmenuModalOpen(true);
  };

  const openEditSubmenuModal = (sub: Submenu) => {
    setSubmenuForm({
      id: sub.id,
      menuId: sub.menuId,
      label: sub.label,
      link: sub.link,
      displayOrder: sub.displayOrder,
      isActive: sub.isActive ?? true,
    });
    setSubmenuModalOpen(true);
  };

  const openNewActionModal = () => {
    setActionForm({ id: "", label: "", link: "", style: "primary", displayOrder: actions.length, active: true });
    setActionModalOpen(true);
  };

  const openEditActionModal = (act: HeaderAction) => {
    setActionForm({ id: act.id, label: act.label, link: act.link, style: act.style, displayOrder: act.displayOrder, active: act.active });
    setActionModalOpen(true);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200 max-w-4xl">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-amber-500" />
        <p className="text-sm">Loading dynamic header data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl pb-12">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Navigation className="w-6 h-6 text-amber-500" /> Dynamic Header Management
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Configure header logo settings, sticky navigation behaviors, top bar text highlights, active menu links, and submenus.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold">
          {errorMsg}
        </div>
      )}

      {/* Grid: Global Settings & Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Header Settings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Sticky & Announcement Settings
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Sticky Navbar</p>
                <p className="text-[10px] text-slate-400">Main header floats on screen during scroll</p>
              </div>
              <button
                onClick={() => setSettings((prev) => ({ ...prev, stickyHeader: !prev.stickyHeader }))}
                className="text-slate-500"
              >
                {settings.stickyHeader ? (
                  <ToggleRight className="w-8 h-8 text-amber-500" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-300" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Enable Top Announcement Bar</p>
                <p className="text-[10px] text-slate-400">Banner strip displayed above header</p>
              </div>
              <button
                onClick={() => setSettings((prev) => ({ ...prev, topBarActive: !prev.topBarActive }))}
                className="text-slate-500"
              >
                {settings.topBarActive ? (
                  <ToggleRight className="w-8 h-8 text-amber-500" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-300" />
                )}
              </button>
            </div>

            {settings.topBarActive && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Announcement Message / Text
                </label>
                <input
                  type="text"
                  value={settings.topBarText}
                  onChange={(e) => setSettings((prev) => ({ ...prev, topBarText: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <p className="text-[10px] font-bold text-slate-700">Show Social Icons</p>
                </div>
                <button
                  onClick={() => setSettings((prev) => ({ ...prev, showSocials: !prev.showSocials }))}
                  className="text-slate-500"
                >
                  {settings.showSocials ? (
                    <ToggleRight className="w-6 h-6 text-amber-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-slate-300" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <p className="text-[10px] font-bold text-slate-700">Show Contacts</p>
                </div>
                <button
                  onClick={() => setSettings((prev) => ({ ...prev, showContact: !prev.showContact }))}
                  className="text-slate-500"
                >
                  {settings.showContact ? (
                    <ToggleRight className="w-6 h-6 text-amber-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-slate-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center gap-1 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save Settings
            </button>
          </div>
        </div>

        {/* Action Button Manager */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Header CTAs / Action Buttons</h3>
              <button
                onClick={openNewActionModal}
                className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 flex items-center gap-0.5 text-[10px] font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {actions.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">{act.label}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{act.link}</p>
                    <span className="text-[9px] bg-slate-200 text-slate-600 px-1 py-0.5 rounded uppercase font-bold tracking-wider mt-1 inline-block">
                      {act.style} style
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditActionModal(act)}
                      className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteAction(act.id, act.label)}
                      className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg text-slate-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Menus & Submenus Panel */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Main Navigation Menu Structure</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Order menus and manage submenus dropdowns.</p>
          </div>
          <button
            onClick={openNewMenuModal}
            className="px-3 py-1.5 bg-amber-500 text-white rounded-xl hover:bg-amber-600 text-xs font-bold shadow-sm flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add New Menu
          </button>
        </div>

        <div className="space-y-4 pt-2">
          {menus.length === 0 ? (
            <p className="text-center text-slate-400 text-xs py-8 border border-dashed border-slate-200 rounded-2xl">
              No navigation menus found. Add one above.
            </p>
          ) : (
            menus.map((menu, index) => {
              const isSubOpen = activeMenuId === menu.id;
              return (
                <div key={menu.id} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  {/* Menu row */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleMoveMenu(index, "up")}
                          disabled={index === 0}
                          className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleMoveMenu(index, "down")}
                          disabled={index === menus.length - 1}
                          className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-slate-900">{menu.label}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({menu.link})</span>
                        {menu.isServicesDropdown && (
                          <span className="bg-blue-50 border border-blue-100 text-blue-700 text-[9px] font-extrabold px-1.5 py-0.25 rounded-md uppercase">Services dropdown</span>
                        )}
                        {!menu.isActive && (
                          <span className="bg-red-50 border border-red-100 text-red-700 text-[9px] font-extrabold px-1.5 py-0.25 rounded-md uppercase">Inactive</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setActiveMenuId(isSubOpen ? null : menu.id)}
                        className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 flex items-center gap-1 text-[10px] font-semibold"
                      >
                        Dropdowns ({menu.submenus.length}){" "}
                        {isSubOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      <button
                        onClick={() => openEditMenuModal(menu)}
                        className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteMenu(menu.id, menu.label)}
                        className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg text-slate-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Submenu Area */}
                  {isSubOpen && (
                    <div className="p-4 bg-white space-y-3 divide-y divide-slate-100">
                      <div className="flex justify-between items-center pb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Dropdown Submenus
                        </span>
                        <button
                          onClick={() => openNewSubmenuModal(menu.id, menu.submenus.length)}
                          className="text-[9px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-0.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Dropdown Submenu
                        </button>
                      </div>

                      {menu.submenus.length === 0 ? (
                        <p className="text-[11px] text-slate-400 py-3 text-center">
                          No dropdown submenus configured for this link.
                        </p>
                      ) : (
                        menu.submenus.map((sub) => (
                          <div key={sub.id} className="flex items-center justify-between pt-3 text-[11px]">
                             <div className="font-medium text-slate-700 flex items-center gap-1.5">
                               {sub.label}{" "}
                               <span className="text-[9px] font-mono text-slate-400">({sub.link})</span>
                               {!sub.isActive && (
                                 <span className="bg-red-50 border border-red-100 text-red-700 text-[8px] font-bold px-1 py-0.25 rounded">Inactive</span>
                               )}
                             </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openEditSubmenuModal(sub)}
                                className="p-1 text-slate-500 hover:bg-slate-100 rounded"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteSubmenu(sub.id, sub.label)}
                                className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* MODAL 1: Main Menu Creator/Editor */}
      {menuModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleMenuSubmit}
            className="bg-white rounded-3xl p-6 w-full max-w-md border border-slate-200 shadow-xl space-y-4"
          >
            <h3 className="font-serif font-bold text-lg text-slate-900">
              {menuForm.id ? "Edit Navigation Link" : "Add Navigation Link"}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Link Label *</label>
                <input
                  type="text"
                  required
                  value={menuForm.label}
                  onChange={(e) => setMenuForm((prev) => ({ ...prev, label: e.target.value }))}
                  placeholder="e.g. Services"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Link Address *</label>
                <input
                  type="text"
                  required
                  value={menuForm.link}
                  onChange={(e) => setMenuForm((prev) => ({ ...prev, link: e.target.value }))}
                  placeholder="e.g. /packages or /#services"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <label className="flex items-start gap-2 mt-2 p-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={menuForm.isServicesDropdown}
                  onChange={(e) => setMenuForm((prev) => ({ ...prev, isServicesDropdown: e.target.checked }))}
                  className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500 mt-0.5"
                />
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-700">Services Dynamic Dropdown</span>
                  <span className="block text-[9px] text-slate-400">Automatically populate submenus from active services list.</span>
                </div>
              </label>

              <label className="flex items-center gap-2 mt-2 p-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={menuForm.isActive}
                  onChange={(e) => setMenuForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                />
                <span className="text-xs font-bold text-slate-700">Menu Link is Active</span>
              </label>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setMenuModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 shadow-sm"
              >
                {saving ? "Saving..." : "Save Link"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: Submenu Creator/Editor */}
      {submenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmenuSubmit}
            className="bg-white rounded-3xl p-6 w-full max-w-md border border-slate-200 shadow-xl space-y-4"
          >
            <h3 className="font-serif font-bold text-lg text-slate-900">
              {submenuForm.id ? "Edit Dropdown Link" : "Add Dropdown Link"}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Submenu Label *</label>
                <input
                  type="text"
                  required
                  value={submenuForm.label}
                  onChange={(e) => setSubmenuForm((prev) => ({ ...prev, label: e.target.value }))}
                  placeholder="e.g. Stage Decor"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Link Address *</label>
                <input
                  type="text"
                  required
                  value={submenuForm.link}
                  onChange={(e) => setSubmenuForm((prev) => ({ ...prev, link: e.target.value }))}
                  placeholder="e.g. /#decor"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <label className="flex items-center gap-2 mt-2 p-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={submenuForm.isActive}
                  onChange={(e) => setSubmenuForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                />
                <span className="text-xs font-bold text-slate-700">Submenu Link is Active</span>
              </label>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setSubmenuModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 shadow-sm"
              >
                {saving ? "Saving..." : "Save Dropdown"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: Action Button Creator/Editor */}
      {actionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleActionSubmit}
            className="bg-white rounded-3xl p-6 w-full max-w-md border border-slate-200 shadow-xl space-y-4"
          >
            <h3 className="font-serif font-bold text-lg text-slate-900">
              {actionForm.id ? "Edit Action Button" : "Add Action Button"}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Button Label *</label>
                <input
                  type="text"
                  required
                  value={actionForm.label}
                  onChange={(e) => setActionForm((prev) => ({ ...prev, label: e.target.value }))}
                  placeholder="e.g. Get Quote"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Address *</label>
                <input
                  type="text"
                  required
                  value={actionForm.link}
                  onChange={(e) => setActionForm((prev) => ({ ...prev, link: e.target.value }))}
                  placeholder="e.g. /#contact"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Visual Style *</label>
                <select
                  value={actionForm.style}
                  onChange={(e) => setActionForm((prev) => ({ ...prev, style: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 font-semibold text-slate-700"
                >
                  <option value="primary">Primary (Gradient Gold)</option>
                  <option value="secondary">Secondary (Slate Fill)</option>
                  <option value="outline">Outline (Gold Border)</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-700">Display Active</span>
                <button
                  type="button"
                  onClick={() => setActionForm((prev) => ({ ...prev, active: !prev.active }))}
                  className="text-slate-500"
                >
                  {actionForm.active ? (
                    <ToggleRight className="w-7 h-7 text-amber-500" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-slate-300" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setActionModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 shadow-sm"
              >
                {saving ? "Saving..." : "Save Button"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
