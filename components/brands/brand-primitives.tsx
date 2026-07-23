"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { Brand, BrandLifecycleStatus, IdentityRule, InheritanceState } from "@/lib/types/brand";
import type { Asset } from "@/lib/types/asset";
import { cn } from "@/lib/utils";

const statusStyles: Record<BrandLifecycleStatus, string> = {
  Active: "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300",
  Draft: "border-white/10 bg-white/[0.03] text-muted",
  "In Review": "border-violet-400/20 bg-violet-400/[0.07] text-violet-300",
  Archived: "border-white/10 bg-transparent text-muted",
};

const inheritanceStyles: Record<InheritanceState, string> = {
  Inherited: "border-violet-400/20 bg-violet-400/[0.06] text-violet-300",
  Overridden: "border-amber-400/20 bg-amber-400/[0.06] text-amber-200",
  Unique: "border-sky-400/20 bg-sky-400/[0.06] text-sky-200",
  "Not Configured": "border-white/10 bg-transparent text-muted",
};

export function BrandMark({ brand, className }: { brand: Brand; className?: string }) {
  return <div className={cn("relative size-10 shrink-0 border bg-elevated", className)}><Image src={brand.mark} alt="" fill sizes="48px" priority className="object-contain" /></div>;
}

export function BrandStatusBadge({ status }: { status: BrandLifecycleStatus }) {
  return <Badge className={statusStyles[status]}>{status}</Badge>;
}

export function InheritanceBadge({ state }: { state: InheritanceState }) {
  return <Badge className={inheritanceStyles[state]}>{state}</Badge>;
}

export function inheritanceSummary(brand: Brand) {
  const inherited = brand.identityRules.filter((rule) => rule.state === "Inherited").length;
  const specific = brand.identityRules.filter((rule) => rule.state === "Overridden" || rule.state === "Unique").length;
  return brand.type === "Parent Brand" ? `${specific} rules defined here` : `${inherited} inherited · ${specific} Brand-specific`;
}

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link href={`/brands/${brand.slug}`} className="group flex min-h-40 flex-col border bg-panel/40 p-4 transition-colors hover:bg-elevated/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
      <div className="flex items-start justify-between gap-3"><BrandMark brand={brand} className="size-11" /><BrandStatusBadge status={brand.status} /></div>
      <div className="mt-4 min-w-0">
        <h3 className="text-sm font-medium text-foreground">{brand.name}</h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted">{brand.type}</p>
      </div>
      <p className="mt-auto border-t pt-3 text-[10px] text-muted">{inheritanceSummary(brand)}</p>
    </Link>
  );
}

const identityContents: Record<IdentityRule["name"], string[]> = {
  Logo: ["Primary Logo", "Wordmark", "Symbol", "Horizontal", "Vertical", "Favicon", "App Icon", "Custom tagged variants"],
  Colour: ["Name", "HEX", "RGB", "CMYK", "Pantone / print reference", "Role", "Contrast guidance", "Custom tag"],
  Typography: ["Typeface", "Role", "Weights and styles", "OTF", "TTF", "WOFF", "WOFF2", "Variable font", "Usage notes"],
};

export function IdentitySystemWorkspace({ rules, sourceName, logoAssets = [] }: { rules: IdentityRule[]; sourceName?: string; logoAssets?: Asset[] }) {
  const [openSection, setOpenSection] = useState<IdentityRule["name"] | null>("Logo");
  return (
    <div className="divide-y border" aria-label="Identity System sections">
      {rules.map((rule) => (
        <div key={rule.name} className="bg-panel/30">
          <button onClick={() => setOpenSection((current) => current === rule.name ? null : rule.name)} aria-expanded={openSection === rule.name} className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-elevated/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50 sm:px-5">
            <span className="min-w-0 flex-1"><span className="block text-sm font-medium text-subtle">{rule.name}</span>{rule.state === "Inherited" && sourceName ? <span className="mt-1 block text-[10px] text-muted">From {sourceName}</span> : null}</span>
            <InheritanceBadge state={rule.state} />
            <ChevronDown className={cn("size-4 shrink-0 text-muted transition-transform", openSection === rule.name && "rotate-180")} />
          </button>
          {openSection === rule.name ? <div className="border-t px-4 py-4 sm:px-5"><p className="text-[11px] leading-5 text-muted">{rule.note}</p>{rule.name === "Logo" && logoAssets.length > 0 ? <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{logoAssets.map((asset) => <div key={asset.id} className="border bg-canvas p-3"><div className="relative h-16"><Image src={asset.thumbnail ?? "/brand/luna-logomark.png"} alt="" fill sizes="160px" className="object-contain" /></div><p className="mt-2 truncate text-[10px] text-subtle">{asset.name}</p><p className="mt-1 text-[9px] text-muted">{asset.status}{asset.pinned ? " · Pinned" : ""}</p></div>)}</div> : <div className={cn("mt-3 grid gap-2", rule.name === "Logo" ? "grid-cols-2 sm:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3")}>{identityContents[rule.name].map((item) => <div key={item} className={cn("border bg-canvas p-3 text-[10px] text-subtle", rule.name === "Logo" && "flex min-h-20 items-end")}>{item}</div>)}</div>}</div> : null}
        </div>
      ))}
    </div>
  );
}
