"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Clock3, FileImage, Settings2, UserRound } from "lucide-react";
import { AssetLibrary } from "@/components/brands/asset-library";
import { BrandMark, BrandStatusBadge } from "@/components/brands/brand-primitives";
import { IdentityWorkspace } from "@/components/brands/identity-workspace";
import { useBrands } from "@/components/providers/brand-provider";
import { useVault } from "@/components/providers/vault-provider";
import { useAssets } from "@/components/providers/asset-provider";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type { GuideSection } from "@/lib/types/guide";

const displayDate = new Intl.DateTimeFormat("en-SG", { day: "numeric", month: "short", year: "numeric" });

export function BrandDetail({ brandSlug }: { brandSlug: string }) {
  const { brands } = useBrands();
  const { selectedVault } = useVault();
  const { assets } = useAssets();
  const router = useRouter();
  const [activeView, setActiveView] = useState<"identity" | "assets" | "guide">("identity");
  const brand = brands.find((candidate) => candidate.slug === brandSlug);
  const validForVault = brand?.vaultId === selectedVault.id;
  const parent = brand?.parentBrandId ? brands.find((candidate) => candidate.id === brand.parentBrandId) : undefined;

  useEffect(() => {
    setActiveView("identity");
    if (brand && brand.vaultId !== selectedVault.id) router.replace("/brands");
  }, [brand?.id, router, selectedVault.id]);

  if (!brand || !validForVault) {
    return <div className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6"><div className="border bg-panel/30"><EmptyState title={brand ? `This Brand is not in ${selectedVault.name}` : "Brand not found"} description={brand ? "The selected Vault does not contain this Brand. Return to Brands to continue in the current Vault." : "This Brand route does not match a Brand in the current session."} action={<Button asChild variant="outline"><Link href="/brands">Return to Brands</Link></Button>} /></div></div>;
  }

  const views = [
    { id: "identity" as const, label: "Identity" },
    { id: "assets" as const, label: "Assets" },
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
        <div className="flex flex-wrap items-center gap-2"><Button asChild variant="outline"><Link href={`/brands/${brand.slug}/configure`}><Settings2 className="size-3.5" />Configure Brand</Link></Button></div>
      </header>

      <nav className="flex gap-1 border-b" aria-label={`${brand.name} workspace`}>
        {views.map((view) => <button key={view.id} onClick={() => setActiveView(view.id)} aria-current={activeView === view.id ? "page" : undefined} className={cn("border-b-2 border-transparent px-3 py-3 text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", activeView === view.id && "border-accent text-foreground")}>{view.label}</button>)}
      </nav>

      {activeView === "identity" ? (
        <section className="mt-6" aria-labelledby="identity-system-title">
          <div className="mb-4"><h2 id="identity-system-title" className="text-lg font-medium">Identity</h2><p className="mt-1 max-w-2xl text-xs leading-5 text-muted">Define the logo, colours, and typography used by this Brand.</p></div>
          <IdentityWorkspace brand={brand} sourceName={parent?.name} />
        </section>
      ) : null}

      {activeView === "assets" ? <AssetLibrary brand={brand} /> : null}

      {activeView === "guide" ? (
        <section className="mt-6" aria-labelledby="guide-title">
          <GuideDocument brandName={brand.name} sourceName={parent?.name} assets={assets.filter((asset) => asset.vaultId === brand.vaultId && asset.brandId === brand.id)} inherited={brand.identityRules.some((rule) => rule.state === "Inherited")} />
        </section>
      ) : null}
    </div>
  );
}

function GuideDocument({ brandName, sourceName, assets, inherited }: { brandName: string; sourceName?: string; assets: ReturnType<typeof useAssets>["assets"]; inherited: boolean }) {
  const logos = assets.filter((asset) => asset.category === "Logos");
  const selectedAssets = Array.from(new Map(assets.filter((asset) => asset.pinned).concat(assets).map((asset) => [asset.id, asset])).values()).slice(0, 4);
  const sections: GuideSection[] = [
    { id: "introduction", type: "brand-introduction", source: "brand", tone: "visual", title: "Brand introduction", copy: `${brandName} is a living Brand system. This Guide brings its identity, Assets, and practical usage together in one place.` },
    { id: "logo", type: "logo-rationale", source: "assets", title: "Logo", copy: logos.length ? `${logos.length} connected logo Asset${logos.length === 1 ? "" : "s"} are available for use.` : "Connect approved logo Assets in Identity before publishing them." },
    { id: "colour", type: "colour-overview", source: "identity", tone: "colour-led", title: "Colour", copy: inherited && sourceName ? `Colour is inherited from ${sourceName}. Use the palette consistently across every touchpoint.` : "Use the primary palette for recognition and the supporting colours with restraint." },
    { id: "typography", type: "typography", source: "identity", title: "Typography", copy: inherited && sourceName ? `Typography is inherited from ${sourceName}. Preserve the established hierarchy and spacing.` : "Use the primary typeface for clear hierarchy and the secondary typeface selectively." },
    { id: "assets", type: "usage-examples", source: "assets", title: "Selected Assets", copy: selectedAssets.length ? "These referenced Assets remain connected to the Brand library." : "Pin useful Brand Assets to bring them into this section." },
    { id: "usage", type: "light-usage", source: "authored", title: "Usage guidance", copy: "Choose the simplest approved expression that suits the medium. Preserve clear space, contrast, and legibility." },
    { id: "dos", type: "dark-usage", source: "authored", title: "Do and Don’t", copy: "Do use connected Brand Assets. Don’t distort marks, invent colours, or substitute unapproved files." },
    { id: "notes", type: "notes", source: "authored", title: "Notes", copy: "This is a living Brand document. Authored editing will be introduced in a later milestone." },
  ];
  return <article className="border bg-panel/20"><header className="border-b px-5 py-8 sm:px-8"><p className="text-[10px] uppercase tracking-[0.14em] text-accent">{brandName}</p><h2 id="guide-title" className="mt-3 text-2xl font-medium">Brand Guide</h2><p className="mt-3 max-w-2xl text-xs leading-5 text-muted">A living reference for expressing this Brand with clarity and consistency.</p></header>{sections.map((section, index) => <section key={section.id} className={cn("grid gap-4 border-b px-5 py-7 last:border-b-0 sm:grid-cols-[180px_minmax(0,1fr)] sm:px-8", section.tone === "colour-led" && "bg-accent/[0.025]", section.tone === "visual" && "py-10")}><h3 className="text-sm font-medium">{section.title}</h3><div><p className="max-w-2xl text-xs leading-6 text-subtle">{section.copy}</p>{section.title === "Logo" && logos.length ? <div className="mt-4 grid gap-2 sm:grid-cols-3">{logos.slice(0, 3).map((asset) => <div key={asset.id} className="relative h-28 border bg-canvas">{asset.thumbnail ? asset.thumbnail.startsWith("blob:") ? <img src={asset.thumbnail} alt={asset.name} className="h-full w-full object-contain p-3" /> : <Image src={asset.thumbnail} alt={asset.name} fill sizes="240px" priority className="object-contain p-3" /> : <FileImage className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-muted" />}</div>)}</div> : null}{section.title === "Selected Assets" && selectedAssets.length ? <div className="mt-4 flex flex-wrap gap-2">{selectedAssets.map((asset) => <span key={`${index}-${asset.id}`} className="border px-2.5 py-2 text-[10px] text-muted">{asset.name} · {asset.extension}</span>)}</div> : null}</div></section>)}</article>;
}
