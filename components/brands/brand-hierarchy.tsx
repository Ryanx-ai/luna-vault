import Link from "next/link";
import { ArrowRight, GitBranch } from "lucide-react";
import { BrandMark, BrandStatusBadge, inheritanceSummary } from "@/components/brands/brand-primitives";
import type { Brand } from "@/lib/types/brand";
import { cn } from "@/lib/utils";

export function BrandHierarchy({ brands }: { brands: Brand[] }) {
  const roots = brands.filter((brand) => !brand.parentBrandId);
  if (roots.length === 0) return null;

  return (
    <div className="space-y-4" aria-label="Brand Family hierarchy">
      {roots.map((root) => <BrandNode key={root.id} brand={root} brands={brands} level={1} />)}
      <p className="sr-only">This Brand Family supports three levels.</p>
    </div>
  );
}

function BrandNode({ brand, brands, level }: { brand: Brand; brands: Brand[]; level: 1 | 2 | 3 }) {
  const children = level < 3 ? brands.filter((candidate) => candidate.parentBrandId === brand.id) : [];
  const levelLabel = brand.type === "Independent Brand" ? "Independent Brand" : level === 1 ? "Parent Brand" : level === 2 ? "Sub-brand" : "Nested Sub-brand";

  return (
    <div className={cn(level > 1 && "ml-5 border-l pl-4 pt-3 sm:ml-6 sm:pl-6")}>
      <Link href={`/brands/${brand.slug}`} className="group flex items-center gap-4 border bg-panel/45 p-4 transition-colors hover:bg-elevated/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
        <BrandMark brand={brand} className={level === 1 ? "size-12" : "size-10"} />
        <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className={cn("font-medium", level === 1 ? "text-base" : "text-sm")}>{brand.name}</h2><span className="text-[9px] uppercase tracking-[0.12em] text-muted">{levelLabel}</span><BrandStatusBadge status={brand.status} /></div><p className="mt-1.5 text-[10px] text-muted">{inheritanceSummary(brand)}</p></div>
        <span className="hidden items-center gap-1 text-[11px] text-muted group-hover:text-foreground sm:flex">Open <ArrowRight className="size-3" /></span>
      </Link>
      {children.length > 0 ? <div><div className="ml-5 flex items-center gap-2 pt-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted"><GitBranch className="size-3" />Level {level + 1}</div>{children.map((child) => <BrandNode key={child.id} brand={child} brands={brands} level={(level + 1) as 2 | 3} />)}</div> : null}
    </div>
  );
}
