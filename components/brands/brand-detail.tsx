"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock3, FileText, Image as ImageIcon, Settings2, Upload, UserRound, X } from "lucide-react";
import { BrandMark, BrandStatusBadge, IdentitySystemWorkspace } from "@/components/brands/brand-primitives";
import { useBrands } from "@/components/providers/brand-provider";
import { useVault } from "@/components/providers/vault-provider";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

const displayDate = new Intl.DateTimeFormat("en-SG", { day: "numeric", month: "short", year: "numeric" });
const guideSections = ["Brand Story", "Mission", "Vision", "Voice", "Usage Guidelines", "Do / Don’t", "Examples", "Additional documentation"];
const graphicAssetGroups = ["Illustrations", "Photography", "Campaign Graphics", "Social Assets", "Patterns", "Textures", "Icons", "Templates", "Custom Tags"];

export function BrandDetail({ brandSlug }: { brandSlug: string }) {
  const { brands } = useBrands();
  const { selectedVault } = useVault();
  const router = useRouter();
  const [activeView, setActiveView] = useState<"identity" | "graphic-assets" | "guide">("identity");
  const [headerPanel, setHeaderPanel] = useState<"manage" | "upload" | null>(null);
  const brand = brands.find((candidate) => candidate.slug === brandSlug);
  const validForVault = brand?.vaultId === selectedVault.id;
  const parent = brand?.parentBrandId ? brands.find((candidate) => candidate.id === brand.parentBrandId) : undefined;

  useEffect(() => {
    setHeaderPanel(null);
    setActiveView("identity");
    if (brand && brand.vaultId !== selectedVault.id) router.replace("/brands");
  }, [brand, router, selectedVault.id]);

  if (!brand || !validForVault) {
    return <div className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6"><div className="border bg-panel/30"><EmptyState title={brand ? `This Brand is not in ${selectedVault.name}` : "Brand not found"} description={brand ? "The selected Vault does not contain this Brand. Return to Brands to continue in the current Vault." : "This Brand route does not match a Brand in the current session."} action={<Button asChild variant="outline"><Link href="/brands">Return to Brands</Link></Button>} /></div></div>;
  }

  const views = [
    { id: "identity" as const, label: "Identity" },
    { id: "graphic-assets" as const, label: "Graphic Assets" },
    { id: "guide" as const, label: "Guide" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
      <Link href="/brands" className="mb-5 inline-flex items-center gap-1.5 text-[11px] text-muted hover:text-foreground"><ArrowLeft className="size-3" />Brand Family</Link>
      <header className="relative flex flex-col gap-5 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <BrandMark brand={brand} className="size-14" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{brand.type}</p><BrandStatusBadge status={brand.status} /></div>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">{brand.name}</h1>
            {brand.description ? <p className="mt-2 max-w-xl text-xs leading-5 text-muted">{brand.description}</p> : null}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-muted"><span className="flex items-center gap-1.5"><UserRound className="size-3.5" />{brand.owner.name}</span><span className="flex items-center gap-1.5"><Clock3 className="size-3.5" />Updated {displayDate.format(new Date(brand.updatedAt))}</span></div>
          </div>
        </div>
        <Button variant="outline" onClick={() => setHeaderPanel((panel) => panel === "manage" ? null : "manage")} aria-expanded={headerPanel === "manage"}><Settings2 className="size-3.5" />Manage Brand</Button>
        {headerPanel === "manage" ? <ActionPanel title={`Manage ${brand.name}`} onClose={() => setHeaderPanel(null)}>Brand details, ownership, lifecycle, and archive controls will become editable in a later milestone.</ActionPanel> : null}
      </header>

      <nav className="flex gap-1 border-b" aria-label={`${brand.name} workspace`}>
        {views.map((view) => <button key={view.id} onClick={() => { setActiveView(view.id); setHeaderPanel(null); }} aria-current={activeView === view.id ? "page" : undefined} className={cn("border-b-2 border-transparent px-3 py-3 text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", activeView === view.id && "border-accent text-foreground")}>{view.label}</button>)}
      </nav>

      {activeView === "identity" ? (
        <section className="mt-6" aria-labelledby="identity-system-title">
          <div className="mb-4"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">Single source of truth</p><h2 id="identity-system-title" className="mt-1 text-lg font-medium">Identity System</h2><p className="mt-1 max-w-2xl text-xs leading-5 text-muted">Configure the identity owned by {brand.name}. Guides, Collections, Packages, exports, and future tools reference these decisions.</p></div>
          <IdentitySystemWorkspace rules={brand.identityRules} sourceName={parent?.name} />
        </section>
      ) : null}

      {activeView === "graphic-assets" ? (
        <section className="relative mt-6" aria-labelledby="graphic-assets-title">
          <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">Identity workspace</p><h2 id="graphic-assets-title" className="mt-1 text-lg font-medium">Graphic Assets</h2><p className="mt-1 max-w-2xl text-xs leading-5 text-muted">The future visual asset gallery for {brand.name}. Files will remain attached to this Brand’s Identity System.</p></div><Button onClick={() => setHeaderPanel((panel) => panel === "upload" ? null : "upload")} aria-expanded={headerPanel === "upload"}><Upload className="size-3.5" />Upload Assets</Button></div>
          {headerPanel === "upload" ? <ActionPanel title={`Upload Assets to ${brand.name}`} onClose={() => setHeaderPanel(null)}>Uploads opened here will belong to {brand.name}. Uploads remain presentation-only; no files have been selected or stored.</ActionPanel> : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{graphicAssetGroups.map((group) => <div key={group} className="flex min-h-24 items-center gap-3 border bg-panel/30 p-4"><span className="flex size-8 items-center justify-center border bg-elevated text-muted"><ImageIcon className="size-4" /></span><div><h3 className="text-xs font-medium text-subtle">{group}</h3><p className="mt-1 text-[10px] text-muted">Ready for future Brand-owned assets</p></div></div>)}</div>
        </section>
      ) : null}

      {activeView === "guide" ? (
        <section className="mt-6" aria-labelledby="guide-title">
          <div className="border bg-panel/30 p-4 sm:p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">Generated from Identity</p><h2 id="guide-title" className="mt-1 text-lg font-medium">Guide</h2><p className="mt-2 max-w-2xl text-xs leading-5 text-muted">Logo, Colour, Typography, and Graphic Assets are referenced from {brand.name}’s Identity System. The Guide owns authored explanation only—never duplicated identity data.</p></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{guideSections.map((section) => <div key={section} className="flex min-h-24 items-start gap-3 border bg-panel/30 p-4"><FileText className="mt-0.5 size-4 text-muted" /><div><h3 className="text-xs font-medium text-subtle">{section}</h3><p className="mt-1 text-[10px] leading-4 text-muted">Authored documentation will live here.</p></div></div>)}</div>
        </section>
      ) : null}
    </div>
  );
}

function ActionPanel({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="absolute right-0 top-full z-20 mt-2 w-[min(380px,calc(100vw-32px))] border bg-panel p-4 shadow-2xl"><div className="flex items-center justify-between"><p className="text-xs font-medium">{title}</p><button onClick={onClose} aria-label="Close Brand action" className="text-muted hover:text-foreground"><X className="size-3.5" /></button></div><p className="mt-2 text-[11px] leading-5 text-muted">{children}</p></div>;
}
