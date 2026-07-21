"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrands } from "@/components/providers/brand-provider";
import type { Brand, BrandType } from "@/lib/types/brand";

const brandTypes: BrandType[] = ["Parent Brand", "Product", "Sub-brand", "Event", "Campaign", "Internal Initiative"];
const owners = [{ name: "Ryan Chin", initials: "RC" }, { name: "Mei Tan", initials: "MT" }, { name: "Luna team", initials: "LT" }];

export function CreateBrandDialog({ open, onClose, vaultId, availableParents }: { open: boolean; onClose: () => void; vaultId: string; availableParents: Brand[] }) {
  const { createBrand } = useBrands();
  const [name, setName] = useState("");
  const [type, setType] = useState<BrandType>("Product");
  const [parentBrandId, setParentBrandId] = useState(availableParents[0]?.id ?? "");
  const [description, setDescription] = useState("");
  const [ownerName, setOwnerName] = useState(owners[0].name);
  const [startingPoint, setStartingPoint] = useState<"inherit" | "independent">("inherit");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createdBrand, setCreatedBrand] = useState<Brand | null>(null);

  useEffect(() => {
    if (!open) return;
    setParentBrandId(availableParents[0]?.id ?? "");
    setStartingPoint(availableParents.length > 0 ? "inherit" : "independent");
    setCreatedBrand(null);
    setErrors({});
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, vaultId]);

  if (!open) return null;

  const resetAndClose = () => { setName(""); setType("Product"); setParentBrandId(availableParents[0]?.id ?? ""); setDescription(""); setOwnerName(owners[0].name); setStartingPoint(availableParents.length > 0 ? "inherit" : "independent"); setCreatedBrand(null); setErrors({}); onClose(); };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Enter a Brand name.";
    if (!description.trim()) nextErrors.description = "Describe what this Brand represents.";
    if (startingPoint === "inherit" && !parentBrandId) nextErrors.parent = "Choose a Parent Brand or start independently.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const owner = owners.find((candidate) => candidate.name === ownerName) ?? owners[0];
    setCreatedBrand(createBrand({ vaultId, name, type, parentBrandId: type === "Parent Brand" ? undefined : parentBrandId || undefined, description, owner, inheritanceStartingPoint: type === "Parent Brand" ? "independent" : startingPoint }));
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="presentation">
      <button className="absolute inset-0 bg-black/75" onClick={resetAndClose} aria-label="Close Create Brand" />
      <div role="dialog" aria-modal="true" aria-labelledby="create-brand-title" className="relative z-10 max-h-[calc(100dvh-32px)] w-full max-w-xl overflow-y-auto border bg-panel shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Brand Architecture</p><h2 id="create-brand-title" className="mt-1 text-base font-medium">Create Brand</h2></div><button onClick={resetAndClose} aria-label="Close dialog" className="text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"><X className="size-4" /></button></div>

        {createdBrand ? (
          <div className="p-6 text-center"><span className="mx-auto flex size-10 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300"><Check className="size-4" /></span><h3 className="mt-4 text-base font-medium">{createdBrand.name} created for this session</h3><p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-muted">The draft Brand and its starting identity rules are available until the page is refreshed. Persistent creation remains deferred.</p><div className="mt-5 flex justify-center gap-2"><Button variant="outline" onClick={resetAndClose}>Done</Button><Button asChild><Link href={`/brands/${createdBrand.slug}`} onClick={resetAndClose}>Open Brand</Link></Button></div></div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="space-y-4 p-5">
              <Field label="Brand name" id="brand-name" error={errors.name}><input id="brand-name" autoFocus value={name} onChange={(event) => setName(event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "brand-name-error" : undefined} className="h-9 w-full border bg-canvas px-3 text-sm outline-none focus:border-accent/60" /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Brand type" id="brand-type"><select id="brand-type" value={type} onChange={(event) => { const nextType = event.target.value as BrandType; setType(nextType); if (nextType === "Parent Brand") { setParentBrandId(""); setStartingPoint("independent"); } }} className="h-9 w-full border bg-canvas px-3 text-xs outline-none focus:border-accent/60">{brandTypes.map((option) => <option key={option}>{option}</option>)}</select></Field>
                <Field label="Parent Brand" id="parent-brand" error={errors.parent}><select id="parent-brand" value={parentBrandId} disabled={type === "Parent Brand"} onChange={(event) => setParentBrandId(event.target.value)} aria-describedby={errors.parent ? "parent-brand-error" : undefined} className="h-9 w-full border bg-canvas px-3 text-xs outline-none focus:border-accent/60 disabled:opacity-50"><option value="">No Parent Brand</option>{availableParents.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}</select></Field>
              </div>
              <Field label="Description" id="brand-description" error={errors.description}><textarea id="brand-description" rows={3} value={description} onChange={(event) => setDescription(event.target.value)} aria-invalid={!!errors.description} aria-describedby={errors.description ? "brand-description-error" : undefined} className="w-full resize-none border bg-canvas px-3 py-2 text-sm outline-none focus:border-accent/60" /></Field>
              <Field label="Owner" id="brand-owner"><select id="brand-owner" value={ownerName} onChange={(event) => setOwnerName(event.target.value)} className="h-9 w-full border bg-canvas px-3 text-xs outline-none focus:border-accent/60">{owners.map((owner) => <option key={owner.name}>{owner.name}</option>)}</select></Field>
              <fieldset><legend className="text-xs font-medium text-subtle">Inheritance starting point</legend><div className="mt-2 grid gap-2 sm:grid-cols-2">{([{ value: "inherit", label: "Inherit from parent", description: "Begin with the Parent Brand rules." }, { value: "independent", label: "Start independently", description: "Configure identity rules later." }] as const).map((option) => { const disabled = option.value === "inherit" && (type === "Parent Brand" || availableParents.length === 0); return <label key={option.value} className="flex cursor-pointer gap-3 border bg-canvas p-3 text-left has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50"><input type="radio" name="starting-point" value={option.value} checked={startingPoint === option.value} disabled={disabled} onChange={() => setStartingPoint(option.value)} className="mt-0.5 accent-violet-400" /><span><span className="block text-xs font-medium text-subtle">{option.label}</span><span className="mt-1 block text-[10px] leading-4 text-muted">{option.description}</span></span></label>; })}</div></fieldset>
            </div>
            <div className="flex justify-end gap-2 border-t px-5 py-4"><Button type="button" variant="outline" onClick={resetAndClose}>Cancel</Button><Button type="submit">Create Brand</Button></div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return <div><label htmlFor={id} className="mb-1.5 block text-xs font-medium text-subtle">{label}</label>{children}{error ? <p id={`${id}-error`} className="mt-1.5 text-[11px] text-rose-300">{error}</p> : null}</div>;
}
