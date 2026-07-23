"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useBrands } from "@/components/providers/brand-provider";
import { Button } from "@/components/ui/button";
import type { Brand } from "@/lib/types/brand";

export function ConfigureBrandPanel({ brand, onClose }: { brand: Brand; onClose: () => void }) {
  const { brands, canMoveBrand, moveBrand } = useBrands();
  const [parentId, setParentId] = useState(brand.parentBrandId ?? "");
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState("");
  const options = useMemo(() => brands.filter((candidate) => candidate.vaultId === brand.vaultId && candidate.id !== brand.id && canMoveBrand(brand.id, candidate.id).ok), [brand, brands, canMoveBrand]);
  const save = () => { const result = moveBrand(brand.id, parentId || undefined); if (result.ok) { setMessage("Brand hierarchy updated for this session."); setConfirming(false); } else setMessage(result.message ?? "This move is not available."); };
  return <div className="absolute right-0 top-full z-20 mt-2 w-[min(420px,calc(100vw-32px))] border bg-panel p-4 shadow-2xl"><div className="flex items-center justify-between"><p className="text-xs font-medium">Configure {brand.name}</p><button onClick={onClose} aria-label="Close Configure Brand"><X className="size-3.5" /></button></div><div className="mt-4"><label htmlFor="configure-parent" className="text-[10px] uppercase tracking-[0.1em] text-muted">Brand hierarchy</label><select id="configure-parent" value={parentId} onChange={(event) => { setParentId(event.target.value); setConfirming(false); setMessage(""); }} disabled={brand.type === "Parent Brand"} className="mt-1.5 h-9 w-full border bg-canvas px-2 text-xs"><option value="">Independent Brand</option>{options.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}</select><p className="mt-2 text-[10px] text-muted">Choose an eligible parent or keep this Brand independent. Three levels maximum.</p></div>{confirming ? <div className="mt-4 border border-accent/20 p-3"><p className="text-xs">Confirm this hierarchy change?</p><div className="mt-3 flex justify-end gap-2"><Button variant="ghost" onClick={() => setConfirming(false)}>Cancel</Button><Button onClick={save}>Confirm</Button></div></div> : <Button className="mt-4" onClick={() => setConfirming(true)} disabled={brand.type === "Parent Brand"}>Update hierarchy</Button>}{message ? <p className="mt-3 text-[11px] text-muted">{message}</p> : null}<div className="mt-4 border-t pt-3 text-[10px] text-muted">Identity inheritance, lifecycle, Brand appearance, and permissions will remain here as configuration expands.</div></div>;
}
