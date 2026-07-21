import Link from "next/link";
import { ArrowRight, GitBranch } from "lucide-react";
import { BrandCard, BrandMark, BrandStatusBadge, inheritanceSummary } from "@/components/brands/brand-primitives";
import type { Brand } from "@/lib/types/brand";

export function BrandHierarchy({ brands }: { brands: Brand[] }) {
  const parent = brands.find((brand) => !brand.parentBrandId);
  if (!parent) return null;
  const children = brands.filter((brand) => brand.parentBrandId === parent.id);

  return (
    <div aria-label={`${parent.name} Brand Family`}>
      <Link href={`/brands/${parent.slug}`} className="group grid gap-4 border bg-panel/50 p-5 transition-colors hover:bg-elevated/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="flex min-w-0 items-start gap-4">
          <BrandMark brand={parent} className="size-12" />
          <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-medium">{parent.name}</h2><span className="text-[10px] uppercase tracking-[0.12em] text-muted">Parent Brand</span><BrandStatusBadge status={parent.status} /></div><p className="mt-1 text-xs leading-5 text-muted">{parent.description}</p><p className="mt-2 text-[10px] text-muted">Owned by {parent.owner.name} · {parent.assetCount} assets · {parent.collectionCount} collections</p></div>
        </div>
        <span className="flex items-center gap-1 text-[11px] text-muted group-hover:text-foreground">Open Brand <ArrowRight className="size-3" /></span>
      </Link>

      <div className="ml-5 border-l pl-4 pt-4 sm:ml-6 sm:pl-6">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted"><GitBranch className="size-3" />{children.length} related identities</div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {children.map((brand) => <BrandCard key={brand.id} brand={brand} parent={parent} />)}
        </div>
      </div>
      <p className="sr-only">{parent.name} is the Parent Brand. Its child Brands are {children.map((brand) => brand.name).join(", ")}. {inheritanceSummary(parent)}</p>
    </div>
  );
}
