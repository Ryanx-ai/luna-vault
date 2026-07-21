"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Clock3, GitBranch, Settings2, UserRound, Users, X } from "lucide-react";
import { BrandMark, BrandStatusBadge, InheritanceMatrix } from "@/components/brands/brand-primitives";
import { useBrands } from "@/components/providers/brand-provider";
import { useVault } from "@/components/providers/vault-provider";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

const displayDate = new Intl.DateTimeFormat("en-SG", { day: "numeric", month: "short", year: "numeric" });

export function BrandDetail({ brandSlug }: { brandSlug: string }) {
  const { brands } = useBrands();
  const { selectedVault } = useVault();
  const router = useRouter();
  const [manageOpen, setManageOpen] = useState(false);
  const brand = brands.find((candidate) => candidate.slug === brandSlug);
  const validForVault = brand?.vaultId === selectedVault.id;
  const parent = brand?.parentBrandId ? brands.find((candidate) => candidate.id === brand.parentBrandId) : undefined;
  const children = useMemo(() => brand ? brands.filter((candidate) => candidate.parentBrandId === brand.id) : [], [brand, brands]);
  const siblings = useMemo(() => brand?.parentBrandId ? brands.filter((candidate) => candidate.parentBrandId === brand.parentBrandId && candidate.id !== brand.id) : [], [brand, brands]);

  useEffect(() => {
    setManageOpen(false);
    if (brand && brand.vaultId !== selectedVault.id) router.replace("/brands");
  }, [brand, router, selectedVault.id]);

  if (!brand || !validForVault) {
    return <div className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6"><div className="border bg-panel/30"><EmptyState title={brand ? `This Brand is not in ${selectedVault.name}` : "Brand not found"} description={brand ? "The selected Vault does not contain this Brand. Return to Brands to continue in the current Vault." : "This Brand route does not match a Brand in the current session."} action={<Button asChild variant="outline"><Link href="/brands">Return to Brands</Link></Button>} /></div></div>;
  }

  const metrics = [
    { label: "Assets", value: brand.assetCount }, { label: "Approved", value: brand.approvedAssetCount }, { label: "In review", value: brand.inReviewAssetCount }, { label: "Collections", value: brand.collectionCount }, { label: "Guide", value: `${brand.guideCompletion}%` },
  ];

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
      <Link href="/brands" className="mb-5 inline-flex items-center gap-1.5 text-[11px] text-muted hover:text-foreground"><ArrowLeft className="size-3" />Brand Family</Link>
      <header className="relative flex flex-col gap-5 border-b pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 items-start gap-4"><BrandMark brand={brand} className="size-14" /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{brand.type}</p><BrandStatusBadge status={brand.status} /></div><h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">{brand.name}</h1><p className="mt-2 max-w-xl text-xs leading-5 text-muted">{brand.description}</p><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-muted">{parent ? <Link href={`/brands/${parent.slug}`} className="flex items-center gap-1.5 hover:text-foreground"><GitBranch className="size-3.5" />Child of {parent.name}</Link> : <span className="flex items-center gap-1.5"><GitBranch className="size-3.5" />Brand Family source</span>}<span className="flex items-center gap-1.5"><UserRound className="size-3.5" />{brand.owner.name}</span><span className="flex items-center gap-1.5"><Clock3 className="size-3.5" />Updated {displayDate.format(new Date(brand.updatedAt))}</span></div></div></div>
        <Button variant="outline" onClick={() => setManageOpen((open) => !open)} aria-expanded={manageOpen}><Settings2 className="size-3.5" />Manage Brand</Button>
        {manageOpen ? <div className="absolute right-0 top-full z-20 mt-2 w-[min(340px,calc(100vw-32px))] border bg-panel p-4 shadow-2xl"><div className="flex items-center justify-between"><p className="text-xs font-medium">Manage {brand.name}</p><button onClick={() => setManageOpen(false)} aria-label="Close Manage Brand" className="text-muted hover:text-foreground"><X className="size-3.5" /></button></div><p className="mt-2 text-[11px] leading-5 text-muted">Brand details, ownership, lifecycle, and archive controls will become editable in a later milestone.</p></div> : null}
      </header>

      <section className="mt-6" aria-labelledby="brand-summary-title"><h2 id="brand-summary-title" className="sr-only">Brand summary</h2><div className="grid grid-cols-2 border-l border-t sm:grid-cols-5">{metrics.map((metric) => <div key={metric.label} className="border-b border-r bg-panel/40 px-4 py-3.5"><p className="text-[11px] text-muted">{metric.label}</p><p className="mt-1 text-xl font-semibold tracking-[-0.02em]">{metric.value}</p></div>)}</div></section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
        <section aria-labelledby="inheritance-title"><div className="mb-3"><h2 id="inheritance-title" className="text-sm font-medium">Identity inheritance</h2><p className="mt-1 text-[11px] text-muted">Where each identity rule comes from and what this Brand defines for itself.</p></div><InheritanceMatrix rules={brand.identityRules} sourceName={parent?.name} /></section>
        <div className="space-y-6">
          <section className="border bg-panel/30" aria-labelledby="relationship-title"><div className="border-b px-4 py-3"><h2 id="relationship-title" className="text-sm font-medium">Brand relationship</h2></div><div className="p-4 text-xs">
            {parent ? <RelationshipGroup label="Parent Brand" brands={[parent]} /> : null}
            {children.length > 0 ? <RelationshipGroup label="Child Brands" brands={children} /> : null}
            {siblings.length > 0 ? <RelationshipGroup label="Sibling Brands" brands={siblings} /> : null}
            {!parent && children.length === 0 ? <p className="text-muted">No related Brands yet.</p> : null}
          </div></section>
          <section className="border bg-panel/30" aria-labelledby="ownership-title"><div className="border-b px-4 py-3"><h2 id="ownership-title" className="text-sm font-medium">Ownership</h2></div><div className="space-y-3 p-4"><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full border bg-elevated text-[10px] font-semibold">{brand.owner.initials}</span><div><p className="text-xs font-medium text-subtle">{brand.owner.name}</p><p className="text-[10px] text-muted">Brand owner</p></div></div>{brand.collaborators.length > 0 ? <div className="border-t pt-3"><p className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-muted"><Users className="size-3" />Collaborators</p>{brand.collaborators.map((person) => <p key={person.name} className="py-1 text-[11px] text-subtle">{person.name}<span className="ml-2 text-muted">{person.role}</span></p>)}</div> : null}</div></section>
        </div>
      </div>
    </div>
  );
}

function RelationshipGroup({ label, brands }: { label: string; brands: Array<{ id: string; name: string; slug: string; type: string }> }) {
  return <div className="mb-4 last:mb-0"><p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{label}</p><div className="space-y-1">{brands.map((brand) => <Link key={brand.id} href={`/brands/${brand.slug}`} className="flex items-center justify-between rounded-sm px-2 py-1.5 text-subtle hover:bg-elevated hover:text-foreground"><span>{brand.name}</span><span className="text-[10px] text-muted">{brand.type}</span></Link>)}</div></div>;
}
