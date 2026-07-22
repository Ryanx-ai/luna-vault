"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrands } from "@/components/providers/brand-provider";
import type { Brand } from "@/lib/types/brand";

export function CreateBrandDialog({ open, onClose, vaultId, availableParents }: { open: boolean; onClose: () => void; vaultId: string; availableParents: Brand[] }) {
  const { createBrand } = useBrands();
  const router = useRouter();
  const [name, setName] = useState("");
  const [parentBrandId, setParentBrandId] = useState(availableParents[0]?.id ?? "");
  const [mode, setMode] = useState<"sub-brand" | "independent">("sub-brand");
  const [inheritParentIdentity, setInheritParentIdentity] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setParentBrandId(availableParents[0]?.id ?? "");
    setMode(availableParents.length > 0 ? "sub-brand" : "independent");
    setInheritParentIdentity(true);
    setErrors({});
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, vaultId]);

  if (!open) return null;

  const resetAndClose = () => { setName(""); setParentBrandId(availableParents[0]?.id ?? ""); setMode("sub-brand"); setInheritParentIdentity(true); setErrors({}); onClose(); };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Enter a Brand name.";
    if (mode === "sub-brand" && !parentBrandId) nextErrors.parent = "Choose where this Brand belongs.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const createdBrand = createBrand({ vaultId, name, mode, parentBrandId: mode === "sub-brand" ? parentBrandId : undefined, inheritParentIdentity });
    resetAndClose();
    router.push(`/brands/${createdBrand.slug}`);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="presentation">
      <button className="absolute inset-0 bg-black/75" onClick={resetAndClose} aria-label="Close Create Brand" />
      <div role="dialog" aria-modal="true" aria-labelledby="create-brand-title" className="relative z-10 max-h-[calc(100dvh-32px)] w-full max-w-xl overflow-y-auto border bg-panel shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Brand Family</p>
            <h2 id="create-brand-title" className="mt-1 text-base font-medium">Create Brand</h2>
          </div>
          <button onClick={resetAndClose} aria-label="Close dialog" className="text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
            <X className="size-4" />
          </button>
        </div>

          <form onSubmit={submit} noValidate>
            <div className="space-y-4 p-5">
              <Field label="Brand name" id="brand-name" error={errors.name}><input id="brand-name" autoFocus value={name} onChange={(event) => setName(event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "brand-name-error" : undefined} className="h-9 w-full border bg-canvas px-3 text-sm outline-none focus:border-accent/60" /></Field>
              <div><p className="mb-1.5 text-xs font-medium text-subtle">Brand mode</p><div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Brand mode"><button type="button" role="radio" aria-checked={mode === "sub-brand"} onClick={() => setMode("sub-brand")} className={`border p-3 text-left text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${mode === "sub-brand" ? "border-accent/60 bg-accent/[0.08] text-foreground" : "text-muted"}`}><span className="block font-medium">Sub-brand</span><span className="mt-1 block text-[10px] leading-4">Part of an existing Brand family</span></button><button type="button" role="radio" aria-checked={mode === "independent"} onClick={() => setMode("independent")} className={`border p-3 text-left text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${mode === "independent" ? "border-accent/60 bg-accent/[0.08] text-foreground" : "text-muted"}`}><span className="block font-medium">Independent Brand</span><span className="mt-1 block text-[10px] leading-4">A separate top-level Brand</span></button></div></div>
              {mode === "sub-brand" ? <>
                <Field label="Parent Brand" id="parent-brand" error={errors.parent}><select id="parent-brand" value={parentBrandId} onChange={(event) => setParentBrandId(event.target.value)} aria-describedby={errors.parent ? "parent-brand-error" : undefined} className="h-9 w-full border bg-canvas px-3 text-xs outline-none focus:border-accent/60">{availableParents.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}</select><p className="mt-1.5 text-[10px] leading-4 text-muted">Nested Brands stop at three levels.</p></Field>
                <div className="flex items-start justify-between gap-4 border p-3"><div><label htmlFor="inherit-parent-identity" className="text-xs font-medium text-subtle">Inherit parent identity</label><p className="mt-1 text-[10px] leading-4 text-muted">Use the parent Brand’s colours and typography.</p></div><button id="inherit-parent-identity" type="button" role="switch" aria-checked={inheritParentIdentity} onClick={() => setInheritParentIdentity((current) => !current)} className={`relative mt-0.5 h-5 w-9 rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${inheritParentIdentity ? "border-accent/50 bg-accent/40" : "bg-elevated"}`}><span className={`absolute top-0.5 size-3.5 rounded-full bg-foreground transition-transform ${inheritParentIdentity ? "translate-x-[17px]" : "translate-x-0.5"}`} /></button></div>
              </> : null}
              <div className="border p-3"><p className="text-[10px] uppercase tracking-[0.1em] text-muted">Owner</p><p className="mt-1 text-xs text-subtle">Ryan Chin</p></div>
            </div>
            <div className="flex justify-end gap-2 border-t px-5 py-4"><Button type="button" variant="outline" onClick={resetAndClose}>Cancel</Button><Button type="submit">Create Brand</Button></div>
          </form>
      </div>
    </div>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return <div><label htmlFor={id} className="mb-1.5 block text-xs font-medium text-subtle">{label}</label>{children}{error ? <p id={`${id}-error`} className="mt-1.5 text-[11px] text-rose-300">{error}</p> : null}</div>;
}
