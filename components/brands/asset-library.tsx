"use client";

import { useState } from "react";
import { Folder, Plus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultAssetCategories, type AssetCategory } from "@/lib/types/asset";

export function AssetLibrary({ brandName }: { brandName: string }) {
  const [selected, setSelected] = useState<AssetCategory | null>(null);
  const [panel, setPanel] = useState<"upload" | "folder" | null>(null);
  return <section className="mt-6" aria-labelledby="assets-title">
    <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div><h2 id="assets-title" className="text-lg font-medium">Assets</h2><p className="mt-1 max-w-2xl text-xs leading-5 text-muted">Organise and find the approved files used by this Brand.</p></div>
      <div className="flex gap-2"><Button onClick={() => setPanel("upload")}><Upload className="size-3.5" />Upload Assets</Button><Button variant="outline" onClick={() => setPanel("folder")}><Plus className="size-3.5" />New Folder</Button></div>
    </div>
    {panel ? <div className="relative mt-4 border bg-panel/40 p-4"><button className="absolute right-3 top-3 text-muted hover:text-foreground" aria-label="Close action" onClick={() => setPanel(null)}><X className="size-4" /></button>{panel === "upload" ? <><h3 className="text-xs font-medium">Upload Assets to {brandName}</h3><div className="mt-3 border border-dashed p-6 text-center text-[11px] text-muted">File uploads are not available yet.</div></> : <><h3 className="text-xs font-medium">New Folder</h3><p className="mt-2 text-[11px] leading-5 text-muted">Folder creation is not available yet.</p></>}</div> : null}
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{defaultAssetCategories.map((category) => <button key={category} onClick={() => setSelected(category)} className="flex min-h-24 items-center gap-3 border bg-panel/30 p-4 text-left transition-colors hover:bg-elevated/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"><span className="flex size-8 items-center justify-center border bg-elevated text-muted"><Folder className="size-4" /></span><div><h3 className="text-xs font-medium text-subtle">{category}</h3><p className="mt-1 text-[10px] text-muted">No assets</p></div></button>)}</div>
    {selected ? <div className="mt-4 border bg-panel/30 p-4"><h3 className="text-xs font-medium">{selected}</h3><p className="mt-1 text-[11px] text-muted">No assets in this folder.</p></div> : null}
  </section>;
}
