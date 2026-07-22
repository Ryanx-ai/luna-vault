"use client";

import { useMemo, useState } from "react";
import { GitBranch, Grid2X2, Plus } from "lucide-react";
import { BrandCard } from "@/components/brands/brand-primitives";
import { BrandHierarchy } from "@/components/brands/brand-hierarchy";
import { CreateBrandDialog } from "@/components/brands/create-brand-dialog";
import { useBrands } from "@/components/providers/brand-provider";
import { useVault } from "@/components/providers/vault-provider";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

export function BrandsIndex() {
  const { brands } = useBrands();
  const { selectedVault } = useVault();
  const [view, setView] = useState<"hierarchy" | "grid">("hierarchy");
  const [createOpen, setCreateOpen] = useState(false);
  const vaultBrands = useMemo(() => brands.filter((brand) => brand.vaultId === selectedVault.id), [brands, selectedVault.id]);
  const parentBrands = vaultBrands.filter((brand) => !brand.parentBrandId);
  const eligibleParents = vaultBrands.filter((brand) => hierarchyDepth(brand, vaultBrands) < 3);

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
      <header className="flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">{selectedVault.name} Vault</p><h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">Brands</h1><p className="mt-2 max-w-xl text-xs leading-5 text-muted">Explore the Brand Family and open a Brand to view its identity, assets, and Guide.</p></div>
        <Button onClick={() => setCreateOpen(true)}><Plus className="size-3.5" />Create Brand</Button>
      </header>

      {vaultBrands.length === 0 ? (
        <section className="mt-6 border bg-panel/30"><EmptyState title={`No Brands in ${selectedVault.name}`} description="Create a Brand to begin building this Brand Family." action={<Button onClick={() => setCreateOpen(true)}><Plus className="size-3.5" />Create Brand</Button>} /></section>
      ) : (
        <section className="mt-6" aria-labelledby="brand-family-heading">
          <div className="mb-4 flex items-end justify-between gap-4"><div><h2 id="brand-family-heading" className="text-sm font-medium">Brand Family</h2><p className="mt-1 text-[11px] text-muted">{vaultBrands.length} Brands · {parentBrands.length} Parent Brand</p></div><div className="flex shrink-0 rounded-md border p-0.5" aria-label="Brand Family view"><button onClick={() => setView("hierarchy")} aria-label="Hierarchy view" aria-pressed={view === "hierarchy"} className={cn("flex h-7 items-center gap-1.5 rounded-sm px-2 text-[11px] text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", view === "hierarchy" && "bg-elevated text-foreground")}><GitBranch className="size-3.5" />Hierarchy</button><button onClick={() => setView("grid")} aria-label="Grid view" aria-pressed={view === "grid"} className={cn("flex h-7 items-center gap-1.5 rounded-sm px-2 text-[11px] text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", view === "grid" && "bg-elevated text-foreground")}><Grid2X2 className="size-3.5" />Grid</button></div></div>
          {view === "hierarchy" ? <BrandHierarchy brands={vaultBrands} /> : <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{vaultBrands.map((brand) => <BrandCard key={brand.id} brand={brand} />)}</div>}
        </section>
      )}

      <CreateBrandDialog open={createOpen} onClose={() => setCreateOpen(false)} vaultId={selectedVault.id} availableParents={eligibleParents} />
    </div>
  );
}

function hierarchyDepth(brand: { parentBrandId?: string }, brands: Array<{ id: string; parentBrandId?: string }>) {
  let depth = 1;
  let parentId = brand.parentBrandId;
  while (parentId && depth < 3) {
    depth += 1;
    parentId = brands.find((candidate) => candidate.id === parentId)?.parentBrandId;
  }
  return depth;
}
