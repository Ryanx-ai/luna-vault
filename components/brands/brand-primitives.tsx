import Image from "next/image";
import Link from "next/link";
import { GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Brand, BrandLifecycleStatus, IdentityRule, InheritanceState } from "@/lib/types/brand";
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
  "Not configured": "border-white/10 bg-transparent text-muted",
};

export function BrandMark({ brand, className }: { brand: Brand; className?: string }) {
  return <div className={cn("relative size-10 shrink-0 border bg-elevated", className)}><Image src={brand.mark} alt="" fill sizes="48px" className="object-contain" /></div>;
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

export function BrandCard({ brand, parent }: { brand: Brand; parent?: Brand }) {
  return (
    <Link href={`/brands/${brand.slug}`} className="group flex min-h-52 flex-col border bg-panel/40 p-4 transition-colors hover:bg-elevated/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
      <div className="flex items-start justify-between gap-3"><BrandMark brand={brand} className="size-11" /><BrandStatusBadge status={brand.status} /></div>
      <div className="mt-4 min-w-0">
        <div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-medium text-foreground">{brand.name}</h3><span className="text-[10px] text-muted">{brand.type}</span></div>
        <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-muted">{brand.description}</p>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-[10px] text-muted"><GitBranch className="size-3" />{parent ? `Child of ${parent.name}` : "Family source"}</div>
      <div className="mt-auto grid grid-cols-3 gap-2 border-t pt-3 text-[10px] text-muted">
        <p><span className="block text-sm font-medium text-subtle">{brand.assetCount}</span>Assets</p>
        <p><span className="block text-sm font-medium text-subtle">{brand.approvedAssetCount}</span>Approved</p>
        <p><span className="block text-sm font-medium text-subtle">{brand.collectionCount}</span>Collections</p>
      </div>
      <p className="mt-3 text-[10px] text-muted">{inheritanceSummary(brand)}</p>
    </Link>
  );
}

export function InheritanceMatrix({ rules, sourceName }: { rules: IdentityRule[]; sourceName?: string }) {
  return (
    <div className="divide-y border" role="list" aria-label="Identity inheritance rules">
      {rules.map((rule) => (
        <div key={rule.name} role="listitem" className="grid gap-3 bg-panel/30 px-4 py-3.5 sm:grid-cols-[150px_130px_minmax(0,1fr)] sm:items-center sm:px-5">
          <p className="text-xs font-medium text-subtle">{rule.name}</p>
          <InheritanceBadge state={rule.state} />
          <p className="text-[11px] leading-5 text-muted">{rule.state === "Inherited" && sourceName ? `Inherited from ${sourceName}. ` : ""}{rule.note}</p>
        </div>
      ))}
    </div>
  );
}
