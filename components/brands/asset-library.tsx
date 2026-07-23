"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Check, File, Folder, Grid2X2, List, Pin, Plus, Search, Upload, X } from "lucide-react";
import { useAssets } from "@/components/providers/asset-provider";
import { Button } from "@/components/ui/button";
import type { Brand } from "@/lib/types/brand";
import { defaultAssetCategories, type Asset, type AssetCategory, type AssetFileType, type AssetStatus } from "@/lib/types/asset";
import { cn } from "@/lib/utils";

type CategoryView = "All Assets" | AssetCategory;
type SortMode = "newest" | "oldest" | "name" | "updated";
const categoryViews: CategoryView[] = ["All Assets", ...defaultAssetCategories];
const statusOptions: Array<"All statuses" | AssetStatus> = ["All statuses", "Draft", "In Review", "Approved", "Archived"];
const fileTypeOptions: Array<"All types" | AssetFileType> = ["All types", "Image", "Video", "Audio", "Font", "Document", "Archive", "3D", "Other"];
const dateFormat = new Intl.DateTimeFormat("en-SG", { day: "numeric", month: "short", year: "numeric" });

export function AssetLibrary({ brand }: { brand: Brand }) {
  const { assets, addAssets, togglePinned, updateAssets } = useAssets();
  const brandAssets = assets.filter((asset) => asset.vaultId === brand.vaultId && asset.brandId === brand.id);
  const [category, setCategory] = useState<CategoryView>("All Assets");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All statuses" | AssetStatus>("All statuses");
  const [fileType, setFileType] = useState<"All types" | AssetFileType>("All types");
  const [sort, setSort] = useState<SortMode>("newest");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [folderNotice, setFolderNotice] = useState(false);

  const visible = useMemo(() => brandAssets.filter((asset) => {
    const needle = query.trim().toLowerCase();
    const matchesQuery = !needle || [asset.name, asset.originalFilename, asset.category, ...asset.tags].some((value) => value.toLowerCase().includes(needle));
    return matchesQuery && (category === "All Assets" || asset.category === category) && (status === "All statuses" || asset.status === status) && (fileType === "All types" || asset.fileType === fileType);
  }).sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return new Date(sort === "updated" ? b.updatedAt : b.createdAt).getTime() - new Date(sort === "updated" ? a.updatedAt : a.createdAt).getTime();
  }), [brandAssets, category, fileType, query, sort, status]);

  const detail = brandAssets.find((asset) => asset.id === detailId);
  const setSelection = (id: string, checked: boolean) => setSelectedIds((current) => checked ? [...new Set([...current, id])] : current.filter((item) => item !== id));
  const categoryCount = (viewName: CategoryView) => viewName === "All Assets" ? brandAssets.length : brandAssets.filter((asset) => asset.category === viewName).length;

  return <section className="mt-6" aria-labelledby="assets-title">
    <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div><h2 id="assets-title" className="text-lg font-medium">{brand.name} Assets</h2><p className="mt-1 text-xs text-muted">{brandAssets.length} Assets · {category}</p></div>
      <div className="flex flex-wrap gap-2"><Button onClick={() => setUploadOpen(true)}><Upload className="size-3.5" />Upload Assets</Button><Button variant="outline" onClick={() => setFolderNotice(true)}><Plus className="size-3.5" />New Folder</Button></div>
    </div>

    {folderNotice ? <div className="relative mt-3 border bg-panel/40 p-3 text-[11px] text-muted">Folder creation is not available yet.<button onClick={() => setFolderNotice(false)} className="absolute right-3 top-3" aria-label="Close folder notice"><X className="size-3.5" /></button></div> : null}

    <div className="mt-4 grid gap-4 lg:grid-cols-[190px_minmax(0,1fr)]">
      <nav className="border bg-panel/25 p-2" aria-label="Asset categories">{categoryViews.map((item) => <button key={item} onClick={() => { setCategory(item); setSelectedIds([]); }} aria-current={category === item ? "page" : undefined} className={cn("flex w-full items-center gap-2 px-2.5 py-2 text-left text-[11px] text-muted hover:bg-elevated hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", category === item && "bg-elevated text-foreground")}><Folder className="size-3.5" /><span className="min-w-0 flex-1 truncate">{item}</span><span>{categoryCount(item)}</span></button>)}</nav>

      <div className="min-w-0">
        <div className="grid gap-2 border bg-panel/25 p-2 sm:grid-cols-[minmax(160px,1fr)_auto_auto_auto_auto]">
          <label className="flex h-8 items-center gap-2 border bg-canvas px-2"><Search className="size-3.5 text-muted" /><span className="sr-only">Search Assets</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Assets" className="min-w-0 flex-1 bg-transparent text-xs outline-none" /></label>
          <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value as typeof status)} className="sr-only">{statusOptions.map((item) => <option key={item}>{item}</option>)}</select>
          <select aria-label="Filter by file type" value={fileType} onChange={(event) => setFileType(event.target.value as typeof fileType)} className="h-8 border bg-canvas px-2 text-[11px]">{fileTypeOptions.map((item) => <option key={item}>{item}</option>)}</select>
          <select aria-label="Sort Assets" value={sort} onChange={(event) => setSort(event.target.value as SortMode)} className="h-8 border bg-canvas px-2 text-[11px]"><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="name">Name A–Z</option><option value="updated">Recently updated</option></select>
          <div className="flex border p-0.5" aria-label="Asset view"><button aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")} className={cn("flex size-7 items-center justify-center text-muted", view === "grid" && "bg-elevated text-foreground")}><Grid2X2 className="size-3.5" /></button><button aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")} className={cn("flex size-7 items-center justify-center text-muted", view === "list" && "bg-elevated text-foreground")}><List className="size-3.5" /></button></div>
        </div>

        {selectedIds.length > 0 ? <BulkBar count={selectedIds.length} onCategory={(next) => updateAssets(selectedIds, { category: next })} onStatus={(next) => updateAssets(selectedIds, { status: next })} onTag={(tag) => updateAssets(selectedIds, { tags: [...new Set(selectedIds.flatMap((id) => brandAssets.find((asset) => asset.id === id)?.tags ?? []).concat(tag))] })} onPin={() => updateAssets(selectedIds, { pinned: true })} onClear={() => setSelectedIds([])} /> : null}

        {visible.length === 0 ? <div className="mt-3 flex min-h-64 flex-col items-center justify-center border border-dashed bg-panel/25 p-8 text-center"><File className="size-5 text-muted" /><h3 className="mt-3 text-sm font-medium">No assets found</h3><p className="mt-1 text-xs text-muted">Adjust the filters or upload Assets to {category}.</p></div> : view === "grid" ? <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{visible.map((asset) => <AssetCard key={asset.id} asset={asset} selected={selectedIds.includes(asset.id)} onSelect={setSelection} onOpen={() => setDetailId(asset.id)} onPin={() => togglePinned(asset.id)} />)}</div> : <div className="mt-3 divide-y border">{visible.map((asset) => <AssetRow key={asset.id} asset={asset} selected={selectedIds.includes(asset.id)} onSelect={setSelection} onOpen={() => setDetailId(asset.id)} onPin={() => togglePinned(asset.id)} />)}</div>}
      </div>
    </div>
    {uploadOpen ? <UploadDialog brand={brand} initialCategory={category === "All Assets" ? "Custom" : category} onClose={() => setUploadOpen(false)} onUpload={addAssets} /> : null}
    {detail ? <AssetDetail asset={detail} onClose={() => setDetailId(null)} onPin={() => togglePinned(detail.id)} onStatus={(next) => updateAssets([detail.id], { status: next })} /> : null}
  </section>;
}

function Preview({ asset, compact = false }: { asset: Asset; compact?: boolean }) {
  return <div className={cn("relative flex items-center justify-center overflow-hidden bg-elevated", compact ? "size-9 border" : "h-36 border-b")}>
    {asset.thumbnail ? asset.thumbnail.startsWith("blob:") ? <img src={asset.thumbnail} alt={`${asset.name} preview`} className="h-full w-full object-contain p-3" /> : <Image src={asset.thumbnail} alt="" fill sizes={compact ? "36px" : "320px"} priority className="object-contain p-3" /> : <div className="text-center"><File className="mx-auto size-6 text-muted" /><span className="mt-1 block text-[9px] text-muted">{asset.extension}</span></div>}
  </div>;
}

function AssetCard({ asset, selected, onSelect, onOpen, onPin }: { asset: Asset; selected: boolean; onSelect: (id: string, checked: boolean) => void; onOpen: () => void; onPin: () => void }) {
  return <article className={cn("relative border bg-panel/35", selected && "ring-2 ring-accent/60")}><label className="absolute left-2 top-2 z-10 flex size-6 items-center justify-center border bg-canvas"><span className="sr-only">Select {asset.name}</span><input type="checkbox" checked={selected} onChange={(event) => onSelect(asset.id, event.target.checked)} /></label><button onClick={onPin} aria-label={`${asset.pinned ? "Unpin" : "Pin"} ${asset.name}`} className="absolute right-2 top-2 z-10 flex size-6 items-center justify-center border bg-canvas"><Pin className={cn("size-3", asset.pinned && "fill-current text-accent")} /></button><button onClick={onOpen} className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50"><Preview asset={asset} /><div className="p-3"><h3 className="truncate text-xs font-medium">{asset.name}</h3><p className="mt-2 text-[10px] text-muted">{asset.category} · {asset.extension}</p><p className="mt-1 text-[10px] text-muted">Updated {dateFormat.format(new Date(asset.updatedAt))}</p></div></button></article>;
}

function AssetRow({ asset, selected, onSelect, onOpen, onPin }: { asset: Asset; selected: boolean; onSelect: (id: string, checked: boolean) => void; onOpen: () => void; onPin: () => void }) {
  return <div className={cn("grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 bg-panel/30 p-3 sm:grid-cols-[auto_auto_minmax(0,1fr)_120px_90px_auto]", selected && "bg-accent/[0.06]")}><label><span className="sr-only">Select {asset.name}</span><input type="checkbox" checked={selected} onChange={(event) => onSelect(asset.id, event.target.checked)} /></label><Preview asset={asset} compact /><button onClick={onOpen} className="min-w-0 text-left"><span className="block truncate text-xs font-medium">{asset.name}</span><span className="block text-[10px] text-muted sm:hidden">{asset.category} · {asset.extension}</span></button><span className="hidden text-[10px] text-muted sm:block">{asset.category}</span><span className="hidden text-[10px] text-muted sm:block">{asset.width && asset.height ? `${asset.width}×${asset.height}` : formatBytes(asset.sizeBytes)}</span><button onClick={onPin} aria-label={`${asset.pinned ? "Unpin" : "Pin"} ${asset.name}`}><Pin className={cn("size-3.5 text-muted", asset.pinned && "fill-current text-accent")} /></button></div>;
}

function StatusBadge({ status }: { status: AssetStatus }) { return <span className="text-[10px] text-muted">{status}</span>; }

function BulkBar({ count, onCategory, onStatus, onTag, onPin, onClear }: { count: number; onCategory: (value: AssetCategory) => void; onStatus: (value: AssetStatus) => void; onTag: (value: string) => void; onPin: () => void; onClear: () => void }) {
  const [tag, setTag] = useState("");
  return <div className="mt-3 flex flex-wrap items-center gap-2 border bg-elevated/60 p-2"><span className="mr-auto text-xs">{count} selected</span><select aria-label="Assign category" defaultValue="" onChange={(event) => { if (event.target.value) onCategory(event.target.value as AssetCategory); }} className="h-8 border bg-canvas px-2 text-[11px]"><option value="" disabled>Assign category</option>{defaultAssetCategories.map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Change status" defaultValue="" onChange={(event) => { if (event.target.value) onStatus(event.target.value as AssetStatus); }} className="h-8 border bg-canvas px-2 text-[11px]"><option value="" disabled>Change status</option>{statusOptions.slice(1).map((item) => <option key={item}>{item}</option>)}</select><label className="flex h-8 border bg-canvas"><span className="sr-only">Tag selected Assets</span><input value={tag} onChange={(event) => setTag(event.target.value)} placeholder="Add tag" className="w-24 bg-transparent px-2 text-[11px] outline-none" /><button onClick={() => { if (tag.trim()) { onTag(tag.trim()); setTag(""); } }} className="border-l px-2 text-[10px]">Add</button></label><Button variant="outline" onClick={onPin}><Pin className="size-3" />Pin</Button><Button variant="ghost" onClick={onClear}>Clear</Button></div>;
}

function UploadDialog({ brand, initialCategory, onClose, onUpload }: { brand: Brand; initialCategory: AssetCategory; onClose: () => void; onUpload: ReturnType<typeof useAssets>["addAssets"] }) {
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<AssetCategory>(initialCategory);
  const [tags, setTags] = useState("");
  const suggestion = files[0] ? suggestCategory(files[0]) : null;
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (files.length === 0) return; onUpload(files.map((file) => ({ vaultId: brand.vaultId, brandId: brand.id, name: file.name.replace(/\.[^.]+$/, "").replaceAll("-", " "), originalFilename: file.name, fileType: fileTypeFor(file), mimeType: file.type || "application/octet-stream", extension: file.name.split(".").pop()?.toUpperCase() ?? "FILE", category, tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean), status: "Draft", sizeBytes: file.size, thumbnail: ["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(file.type) ? URL.createObjectURL(file) : undefined }))); onClose(); };
  return <div className="fixed inset-0 z-[80] flex items-center justify-center p-4"><button className="absolute inset-0 bg-black/75" onClick={onClose} aria-label="Close Upload Assets" /><form onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="upload-title" className="relative z-10 max-h-[calc(100dvh-32px)] w-full max-w-xl overflow-y-auto border bg-panel"><div className="flex items-center justify-between border-b p-4"><div><h3 id="upload-title" className="text-sm font-medium">Upload Assets</h3><p className="mt-1 text-[10px] text-muted">Upload → Organise → Done · {brand.name}</p></div><button type="button" onClick={onClose} aria-label="Close upload dialog"><X className="size-4" /></button></div><div className="space-y-4 p-5"><div className="flex min-h-32 flex-col items-center justify-center border border-dashed bg-canvas p-5 text-center"><Upload className="size-5 text-muted" /><label htmlFor="asset-files" className="mt-2 text-xs">Choose files</label><span className="mt-1 text-[10px] text-muted">Multiple files supported</span><input id="asset-files" aria-label="Choose Asset files" type="file" multiple className="mt-3 max-w-full text-[10px] text-muted file:mr-3 file:border file:bg-elevated file:px-3 file:py-1.5 file:text-[10px] file:text-foreground" onChange={(event) => setFiles(Array.from(event.target.files ?? []))} /></div>{files.length > 0 ? <div className="divide-y border">{files.map((file) => <div key={`${file.name}-${file.size}`} className="flex justify-between gap-3 p-2 text-[10px]"><span className="truncate">{file.name}</span><span className="shrink-0 text-muted">{file.type || "Unknown type"} · {formatBytes(file.size)}</span></div>)}</div> : null}{suggestion ? <div className="border border-accent/20 bg-accent/[0.05] p-3 text-[11px]"><p>Suggested category: <strong>{suggestion.category}</strong></p><p className="mt-1 text-[10px] text-muted">{suggestion.reason}</p><button type="button" onClick={() => setCategory(suggestion.category)} className="mt-2 text-accent">Use suggestion</button></div> : null}<label className="block text-xs">Category<select value={category} onChange={(event) => setCategory(event.target.value as AssetCategory)} className="mt-1.5 h-9 w-full border bg-canvas px-2 text-xs">{defaultAssetCategories.map((item) => <option key={item}>{item}</option>)}</select></label><label className="block text-xs">Tags<input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="logo, launch, digital" className="mt-1.5 h-9 w-full border bg-canvas px-3 text-xs" /></label></div><div className="flex justify-end gap-2 border-t p-4"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit" disabled={files.length === 0}>Add {files.length || ""} Asset{files.length === 1 ? "" : "s"}</Button></div></form></div>;
}

function AssetDetail({ asset, onClose, onPin, onStatus }: { asset: Asset; onClose: () => void; onPin: () => void; onStatus: (status: AssetStatus) => void }) {
  return <div className="fixed inset-0 z-[80] flex justify-end"><button className="absolute inset-0 bg-black/65" onClick={onClose} aria-label="Close Asset preview" /><aside role="dialog" aria-modal="true" aria-labelledby="asset-detail-title" className="relative z-10 h-full w-full max-w-md overflow-y-auto border-l bg-panel"><div className="flex items-center justify-between border-b p-4"><h3 id="asset-detail-title" className="text-sm font-medium">Asset details</h3><button onClick={onClose} aria-label="Close Asset details"><X className="size-4" /></button></div><Preview asset={asset} /><div className="space-y-5 p-5"><div><div className="flex items-start justify-between gap-3"><h4 className="text-base font-medium">{asset.name}</h4><StatusBadge status={asset.status} /></div><p className="mt-1 text-xs text-muted">{asset.originalFilename}</p></div><dl className="grid grid-cols-2 gap-3 text-[11px]"><Meta label="Format" value={asset.extension} /><Meta label="Category" value={asset.category} /><Meta label="Dimensions" value={asset.width && asset.height ? `${asset.width} × ${asset.height}` : "—"} /><Meta label="Size" value={formatBytes(asset.sizeBytes)} /><Meta label="Version" value={asset.version ?? "—"} /><Meta label="Uploaded by" value={asset.uploadedBy.name} /><Meta label="Updated" value={dateFormat.format(new Date(asset.updatedAt))} /><Meta label="Tags" value={asset.tags.join(", ") || "—"} /></dl>{asset.description ? <div><p className="text-[10px] uppercase tracking-[0.1em] text-muted">Description</p><p className="mt-1 text-xs leading-5 text-subtle">{asset.description}</p></div> : null}{asset.usageNotes ? <div><p className="text-[10px] uppercase tracking-[0.1em] text-muted">Usage notes</p><p className="mt-1 text-xs leading-5 text-subtle">{asset.usageNotes}</p></div> : null}<div className="flex flex-wrap gap-2"><Button onClick={onPin}><Pin className="size-3.5" />{asset.pinned ? "Unpin" : "Pin"}</Button><select aria-label="Change Asset status" value={asset.status} onChange={(event) => onStatus(event.target.value as AssetStatus)} className="h-9 border bg-canvas px-2 text-xs">{statusOptions.slice(1).map((item) => <option key={item}>{item}</option>)}</select><Button variant="outline" onClick={() => {}}>Download unavailable</Button></div></div></aside></div>;
}

function Meta({ label, value }: { label: string; value: string }) { return <div><dt className="text-[10px] text-muted">{label}</dt><dd className="mt-1 text-subtle">{value}</dd></div>; }
function formatBytes(value?: number) { if (!value) return "—"; if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} MB`; if (value >= 1_000) return `${Math.round(value / 1_000)} KB`; return `${value} B`; }
function fileTypeFor(file: File): AssetFileType { if (file.type.startsWith("image/")) return "Image"; if (file.type.startsWith("video/")) return "Video"; if (file.type.startsWith("audio/")) return "Audio"; if (/font|woff|ttf|otf/.test(file.type + file.name)) return "Font"; if (/zip|archive/.test(file.type)) return "Archive"; if (/pdf|document|text/.test(file.type)) return "Document"; return "Other"; }
function suggestCategory(file: File): { category: AssetCategory; reason: string } | null { const name = file.name.toLowerCase(); if (name.includes("logo") || name.endsWith(".svg")) return { category: "Logos", reason: "Suggested from the filename or SVG format. Confirm or choose another category." }; if (name.includes("campaign")) return { category: "Campaign Graphics", reason: "Suggested from the filename. Confirm or choose another category." }; if (file.type.startsWith("video/") || /\.(mp4|mov)$/i.test(name)) return { category: "Motion", reason: "Suggested from the video format. Confirm or choose another category." }; return null; }
