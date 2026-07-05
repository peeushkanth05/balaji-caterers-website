"use client";

import { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  FolderOpen,
  Tag,
  Copy,
  Plus,
  RefreshCw,
  Check,
  X,
  FileText,
  Loader2,
} from "lucide-react";

interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  folder: string;
  tags: string[];
  altText: string;
  mimeType: string;
  fileSize: number;
  createdAt: string;
}

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, altText?: string) => void;
  allowMultiple?: boolean;
  onSelectMultiple?: (assets: { url: string; altText: string }[]) => void;
  title?: string;
}

export function MediaLibraryModal({
  isOpen,
  onClose,
  onSelect,
  allowMultiple = false,
  onSelectMultiple,
  title = "Media Library Manager",
}: MediaLibraryModalProps) {
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [selectedTag, setSelectedTag] = useState("");

  // Upload States
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadFolder, setUploadFolder] = useState("general");
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadTags, setUploadTags] = useState("");
  const [uploading, setUploading] = useState(false);

  // Selected Asset Details
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [selectedAssetsList, setSelectedAssetsList] = useState<MediaAsset[]>([]);
  const [editFolder, setEditFolder] = useState("");
  const [editAlt, setEditAlt] = useState("");
  const [editTags, setEditTags] = useState("");
  const [savingMetadata, setSavingMetadata] = useState(false);
  const [replacing, setReplacing] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (searchTerm) query.append("search", searchTerm);
      if (selectedFolder) query.append("folder", selectedFolder);
      if (selectedTag) query.append("tag", selectedTag);

      const res = await fetch(`/api/admin/media?${query.toString()}`, { credentials: "include" });
      const data = await res.json();
      if (data.assets) {
        setAssets(data.assets);
      }
      if (data.folders) {
        setFolders(data.folders);
      }
    } catch (e) {
      console.error("Failed to load assets", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen, searchTerm, selectedFolder, selectedTag]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length > 0) {
      setUploadFiles((prev) => [...prev, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length > 0) {
      setUploadFiles((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveUploadFile = (index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadFiles.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    uploadFiles.forEach((file) => formData.append("files", file));
    formData.append("folder", uploadFolder);
    formData.append("altText", uploadAlt);

    // Tags list parsing
    const tagsArray = uploadTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    formData.append("tags", JSON.stringify(tagsArray));

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        setUploadFiles([]);
        setUploadAlt("");
        setUploadTags("");
        setActiveTab("library");
        fetchMedia();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to upload assets");
      }
    } catch (e) {
      alert("Error uploading media assets");
    } finally {
      setUploading(false);
    }
  };

  // Selection Handler
  const handleAssetClick = (asset: MediaAsset) => {
    if (allowMultiple) {
      const exists = selectedAssetsList.find((a) => a.id === asset.id);
      if (exists) {
        setSelectedAssetsList((prev) => prev.filter((a) => a.id !== asset.id));
      } else {
        setSelectedAssetsList((prev) => [...prev, asset]);
      }
    } else {
      setSelectedAsset(asset);
      setEditFolder(asset.folder || "general");
      setEditAlt(asset.altText || "");
      setEditTags(asset.tags ? asset.tags.join(", ") : "");
    }
  };

  const handleConfirmSelection = () => {
    if (allowMultiple && onSelectMultiple) {
      onSelectMultiple(selectedAssetsList.map((a) => ({ url: a.url, altText: a.altText })));
    } else if (selectedAsset) {
      onSelect(selectedAsset.url, selectedAsset.altText);
    }
    onClose();
  };

  // Copy to Clipboard
  const handleCopyLink = (url: string, id: string) => {
    const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Delete Asset
  const handleDeleteAsset = async (id: string, name: string) => {
    if (!confirm(`Permanently delete media file "${name}"?`)) return;

    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        credentials: "include",
      });

      if (res.ok) {
        setSelectedAsset(null);
        setSelectedAssetsList((prev) => prev.filter((a) => a.id !== id));
        fetchMedia();
      } else {
        alert("Failed to delete media asset");
      }
    } catch (e) {
      alert("Error deleting media");
    }
  };

  // Save Metadata Details
  const handleSaveMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;

    setSavingMetadata(true);
    const tagsArray = editTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const formData = new FormData();
    formData.append("id", selectedAsset.id);
    formData.append("folder", editFolder);
    formData.append("altText", editAlt);
    formData.append("tags", JSON.stringify(tagsArray));

    try {
      const res = await fetch("/api/admin/media", {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.asset) {
          const parsedAsset = {
            ...data.asset,
            tags: JSON.parse(data.asset.tags || "[]"),
          };
          setSelectedAsset(parsedAsset);
          setAssets((prev) => prev.map((a) => (a.id === parsedAsset.id ? parsedAsset : a)));
        }
        alert("Metadata updated successfully!");
      } else {
        alert("Failed to update media details");
      }
    } catch (e) {
      alert("Error saving metadata");
    } finally {
      setSavingMetadata(false);
    }
  };

  // Replace File
  const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedAsset) return;

    setReplacing(true);
    const formData = new FormData();
    formData.append("id", selectedAsset.id);
    formData.append("replacementFile", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.asset) {
          const parsedAsset = {
            ...data.asset,
            tags: JSON.parse(data.asset.tags || "[]"),
          };
          setSelectedAsset(parsedAsset);
          setAssets((prev) => prev.map((a) => (a.id === parsedAsset.id ? parsedAsset : a)));
          alert("Image file replaced successfully!");
        }
      } else {
        const err = await res.json();
        alert(err.error || "Replacement failed");
      }
    } catch (err) {
      alert("Error replacing file");
    } finally {
      setReplacing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header Tab Bar */}
        <div className="px-8 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
          <div>
            <h3 className="font-serif font-bold text-xl text-slate-900">{title}</h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Securely manage cloud media directory. Files are dynamically converted to WebP formats.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-200/60 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("library")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "library" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Media Library
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "upload" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Upload Files
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Inner Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {activeTab === "library" ? (
            <>
              {/* Main Library View */}
              <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-4">
                {/* Search / Filters Bar */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-5 relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search assets by filename..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="md:col-span-4 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Folder:</span>
                    <select
                      value={selectedFolder}
                      onChange={(e) => setSelectedFolder(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-amber-500 font-medium text-slate-700"
                    >
                      <option value="all">All Folders ({folders.length})</option>
                      {folders.map((f) => (
                        <option key={f} value={f}>
                          📁 {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tag:</span>
                    <input
                      type="text"
                      placeholder="e.g. wedding"
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Library Grid */}
                <div className="flex-1 overflow-y-auto min-h-[300px]">
                  {loading ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-2" />
                      <p className="text-xs">Loading media assets...</p>
                    </div>
                  ) : assets.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-200 rounded-2xl p-8">
                      <ImageIcon className="w-12 h-12 opacity-20 mb-3" />
                      <p className="text-sm font-semibold">No media items found</p>
                      <p className="text-xs text-slate-400 mt-1">Upload files under the upload tab to populate directory.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {assets.map((asset) => {
                        const isSelected = allowMultiple
                          ? !!selectedAssetsList.find((a) => a.id === asset.id)
                          : selectedAsset?.id === asset.id;

                        return (
                          <div
                            key={asset.id}
                            onClick={() => handleAssetClick(asset)}
                            className={`group relative rounded-2xl overflow-hidden aspect-video border cursor-pointer transition-all ${
                              isSelected
                                ? "border-amber-500 ring-2 ring-amber-500/30 scale-[0.98] shadow-inner"
                                : "border-slate-200 hover:border-slate-300 hover:scale-[1.01]"
                            }`}
                          >
                            <img
                              src={asset.url}
                              alt={asset.altText}
                              className="w-full h-full object-cover"
                            />

                            {/* Hover Overlay info */}
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white text-[10px]">
                              <div className="flex justify-end">
                                <span className="px-1.5 py-0.5 rounded bg-slate-950/80 font-bold uppercase">
                                  {asset.folder}
                                </span>
                              </div>
                              <p className="truncate font-semibold">{asset.filename}</p>
                            </div>

                            {/* Checkmark selected badge */}
                            {isSelected && (
                              <div className="absolute top-2 left-2 bg-amber-500 text-white rounded-full p-1 shadow">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer confirm selections bar */}
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between bg-white">
                  <div className="text-xs text-slate-500">
                    {allowMultiple
                      ? `Selected: ${selectedAssetsList.length} items`
                      : selectedAsset
                      ? `Selected: ${selectedAsset.filename}`
                      : "Click an image to select"}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={allowMultiple ? selectedAssetsList.length === 0 : !selectedAsset}
                      onClick={handleConfirmSelection}
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Confirm Selection
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Properties Inspector Panel (Single Select only) */}
              {!allowMultiple && selectedAsset && (
                <div className="w-80 border-l border-slate-200 p-6 overflow-y-auto space-y-6 bg-slate-50">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-500" /> Asset Properties
                    </h4>

                    {/* Preview Thumbnail */}
                    <div className="mt-4 rounded-xl overflow-hidden aspect-video relative border border-slate-200 bg-white">
                      <img src={selectedAsset.url} alt={selectedAsset.altText} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleCopyLink(selectedAsset.url, selectedAsset.id)}
                        className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-950 text-white hover:text-amber-400 flex items-center gap-1 text-[9px] font-bold"
                        title="Copy direct file link"
                      >
                        {copiedId === selectedAsset.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === selectedAsset.id ? "Copied" : "Copy URL"}
                      </button>
                    </div>

                    <div className="mt-3 text-[10px] text-slate-500 space-y-0.5">
                      <p className="truncate font-semibold text-slate-700">{selectedAsset.filename}</p>
                      <p>Size: {(selectedAsset.fileSize / 1024).toFixed(0)} KB &bull; Type: {selectedAsset.mimeType}</p>
                    </div>
                  </div>

                  {/* Metadata form */}
                  <form onSubmit={handleSaveMetadata} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Alt Text (SEO)</label>
                      <input
                        type="text"
                        value={editAlt}
                        onChange={(e) => setEditAlt(e.target.value)}
                        placeholder="Image description..."
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Folder</label>
                        <input
                          type="text"
                          value={editFolder}
                          onChange={(e) => setEditFolder(e.target.value)}
                          placeholder="general"
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 mt-1 font-semibold text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Tags</label>
                        <input
                          type="text"
                          value={editTags}
                          onChange={(e) => setEditTags(e.target.value)}
                          placeholder="e.g. food, event"
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={savingMetadata}
                        className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 disabled:opacity-50"
                      >
                        {savingMetadata ? "Saving..." : "Save Details"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAsset(selectedAsset.id, selectedAsset.filename)}
                        className="p-2 border border-red-200 hover:bg-red-50 rounded-xl text-red-600"
                        title="Delete asset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </form>

                  {/* Replace asset upload */}
                  <div className="border-t border-slate-200 pt-4">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Replace File</label>
                    <label className="w-full py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                      {replacing ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Replacing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3.5 h-3.5" /> Select Replacement File
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={replacing}
                        onChange={handleReplaceFile}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Upload View */
            <div className="flex-1 flex flex-col p-8 space-y-6 overflow-y-auto">
              <form onSubmit={handleUploadSubmit} className="max-w-3xl w-full mx-auto space-y-6">
                {/* Drag and Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center transition-all ${
                    isDragging
                      ? "border-amber-500 bg-amber-500/5 scale-[0.99] shadow-inner"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100/50"
                  }`}
                >
                  <Upload className="w-12 h-12 text-slate-400 mb-3" />
                  <p className="text-sm font-bold text-slate-700">Drag & drop image files here</p>
                  <p className="text-xs text-slate-400 mt-1 mb-4">PNG, JPG, WEBP, SVG up to 15MB</p>

                  <label className="px-5 py-2.5 bg-white border border-slate-200 shadow-sm rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer">
                    Choose files from device
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="sr-only"
                    />
                  </label>
                </div>

                {/* Queue Display */}
                {uploadFiles.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
                    <h4 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-2">
                      Upload Queue ({uploadFiles.length} files)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[160px] overflow-y-auto pr-2">
                      {uploadFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <ImageIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span className="truncate font-semibold text-slate-700 max-w-[150px]">
                              {file.name}
                            </span>
                            <span className="text-[10px] text-slate-400 flex-shrink-0">
                              ({(file.size / 1024).toFixed(0)} KB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveUploadFile(idx)}
                            className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Metadata defaults for batch upload */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Folder</label>
                        <input
                          type="text"
                          value={uploadFolder}
                          onChange={(e) => setUploadFolder(e.target.value)}
                          placeholder="general"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 mt-1 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Default Alt Text</label>
                        <input
                          type="text"
                          value={uploadAlt}
                          onChange={(e) => setUploadAlt(e.target.value)}
                          placeholder="Accessibility alt description..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Tags (comma-separated)</label>
                        <input
                          type="text"
                          value={uploadTags}
                          onChange={(e) => setUploadTags(e.target.value)}
                          placeholder="food, wedding, dj"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-amber-500 mt-1"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end border-t border-slate-100">
                      <button
                        type="submit"
                        disabled={uploading}
                        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 active:scale-95 flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {uploading && <Loader2 className="w-4 h-4 animate-spin" />} Start Upload
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
