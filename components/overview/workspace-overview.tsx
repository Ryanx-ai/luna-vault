"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock3, GitBranch, Grid2X2, List, Settings2, Users, X } from "lucide-react";
import { BrandMark, BrandStatusBadge, inheritanceSummary } from "@/components/brands/brand-primitives";
import { useBrands } from "@/components/providers/brand-provider";
import { useVault } from "@/components/providers/vault-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Brand } from "@/lib/types/brand";
import type { WorkspaceOverview as WorkspaceOverviewData } from "@/lib/types/workspace";
import { cn } from "@/lib/utils";

const displayDateTime = new Intl.DateTimeFormat("en-SG", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

function Relationship({ brand }: { brand: Brand }) {
  return brand.type === "Parent Brand" ? (
    <span className="text-[9px] uppercase tracking-[0.1em] text-muted">Parent Brand</span>
  ) : (
    <span className="flex items-center gap-1 text-[10px] text-muted"><GitBranch className="size-3" />Sub-brand</span>
  );
}

function BrandList({ brands }: { brands: Brand[] }) {
  return (
    <div className="divide-y">
      {brands.map((brand) => (
        <Link key={brand.id} href={`/brands/${brand.slug}`} className="grid gap-3 px-4 py-3.5 transition-colors hover:bg-elevated/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <BrandMark brand={brand} className="size-8" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2"><p className="truncate text-sm font-medium text-subtle">{brand.name}</p><Relationship brand={brand} /></div>
              <p className="mt-1 truncate text-[10px] text-muted">{inheritanceSummary(brand)}</p>
            </div>
          </div>
          <BrandStatusBadge status={brand.status} />
        </Link>
      ))}
    </div>
  );
}

function BrandGrid({ brands }: { brands: Brand[] }) {
  return (
    <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      {brands.map((brand) => (
        <Link key={brand.id} href={`/brands/${brand.slug}`} className="min-w-0 bg-panel p-4 transition-colors hover:bg-elevated/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50">
          <div className="flex items-start justify-between gap-3"><BrandMark brand={brand} className="size-11" /><BrandStatusBadge status={brand.status} /></div>
          <h3 className="mt-4 truncate text-sm font-medium text-subtle">{brand.name}</h3>
          <div className="mt-1"><Relationship brand={brand} /></div>
          <p className="mt-4 border-t pt-3 text-[10px] text-muted">{inheritanceSummary(brand)}</p>
        </Link>
      ))}
    </div>
  );
}

export function WorkspaceOverview({ data }: { data: WorkspaceOverviewData }) {
  const { selectedVault } = useVault();
  const { brands } = useBrands();
  const [view, setView] = useState<"list" | "grid">("list");
  const [manageOpen, setManageOpen] = useState(false);
  const isLuna = selectedVault.id === "vault_luna";
  const familyBrands = brands.filter((brand) => brand.vaultId === selectedVault.id);
  const metrics = isLuna ? data.metrics : [
    { label: "Total assets", value: selectedVault.assetCount, supportingText: "No assets added" },
    { label: "Approved", value: 0, supportingText: "Nothing approved" },
    { label: "In review", value: 0, supportingText: "Nothing awaiting review" },
    { label: "Brands", value: familyBrands.length, supportingText: "1 Parent Brand" },
    { label: "Collections", value: 0, supportingText: "No collections" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
      <section className="relative flex flex-col gap-5 border-b pb-7 sm:flex-row sm:items-end sm:justify-between" aria-labelledby="vault-title">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[11px] text-muted"><span className="size-1.5 rounded-full bg-accent" /><span className="font-semibold uppercase tracking-[0.14em]">Vault overview</span>{selectedVault.state === "early-stage" ? <Badge>Early stage</Badge> : null}</div>
          <h1 id="vault-title" className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">{selectedVault.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted">
            <span className="flex items-center gap-1.5"><Clock3 className="size-3.5" />Updated {displayDateTime.format(new Date(selectedVault.updatedAt))}</span>
            <span className="flex items-center gap-1.5"><Users className="size-3.5" />{selectedVault.collaboratorCount} collaborators</span>
          </div>
        </div>
        <Button variant="outline" onClick={() => setManageOpen((open) => !open)} aria-expanded={manageOpen}><Settings2 className="size-3.5" />Manage Vault</Button>

        {manageOpen ? (
          <div className="absolute right-0 top-full z-20 mt-2 w-[min(340px,calc(100vw-32px))] border bg-panel p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">Manage {selectedVault.name}</p>
              <button onClick={() => setManageOpen(false)} aria-label="Close Manage Vault" className="text-muted hover:text-foreground"><X className="size-3.5" /></button>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-muted">Vault management is not available yet.</p>
          </div>
        ) : null}
      </section>

      <section className="mt-6" aria-labelledby="metrics-title">
        <h2 id="metrics-title" className="sr-only">Vault metrics</h2>
        <div className="grid grid-cols-2 border-l border-t sm:grid-cols-5">
          {metrics.map((metric) => (
            <div key={metric.label} className="border-b border-r bg-panel/40 px-4 py-3.5">
              <p className="text-[11px] text-muted">{metric.label}</p><p className="mt-1 text-xl font-semibold tracking-[-0.02em]">{metric.value}</p><p className="mt-1 truncate text-[10px] text-muted/80">{metric.supportingText}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 border bg-panel/30" aria-labelledby="brand-family-title">
        <div className="flex items-center justify-between gap-4 border-b px-4 py-3 sm:px-5">
          <div><h2 id="brand-family-title" className="text-sm font-medium">Brand Family</h2><p className="mt-0.5 text-xs text-muted">Parent and sub-brand relationships inside {selectedVault.name}.</p></div>
          <div className="flex shrink-0 rounded-md border p-0.5" aria-label="Brand Family presentation">
            <button onClick={() => setView("list")} aria-label="List view" aria-pressed={view === "list"} className={cn("flex size-7 items-center justify-center rounded-sm text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", view === "list" && "bg-elevated text-foreground")}><List className="size-3.5" /></button>
            <button onClick={() => setView("grid")} aria-label="Grid view" aria-pressed={view === "grid"} className={cn("flex size-7 items-center justify-center rounded-sm text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", view === "grid" && "bg-elevated text-foreground")}><Grid2X2 className="size-3.5" /></button>
          </div>
        </div>
        {view === "list" ? <BrandList brands={familyBrands} /> : <BrandGrid brands={familyBrands} />}
      </section>

      <div className="mt-4 flex justify-end"><Link href="/brands" className="text-[11px] text-muted hover:text-foreground">Open Brands</Link></div>
    </div>
  );
}
