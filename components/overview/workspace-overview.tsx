"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Boxes,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  FileImage,
  FolderPlus,
  GitBranch,
  Plus,
  Upload,
  Users,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import type {
  ActivitySummary,
  AssetStatus,
  AssetSummary,
  AttentionItem,
  BrandSummary,
  WorkspaceOverview as WorkspaceOverviewData,
} from "@/lib/types/workspace";

const displayDate = new Intl.DateTimeFormat("en-SG", { day: "numeric", month: "short" });
const displayDateTime = new Intl.DateTimeFormat("en-SG", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

const assetStatusStyles: Record<AssetStatus, string> = {
  approved: "border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-300",
  "in-review": "border-violet-400/20 bg-violet-400/[0.07] text-violet-300",
  draft: "border-white/10 bg-white/[0.03] text-muted",
  archived: "border-white/10 bg-transparent text-muted line-through",
};

function StatusBadge({ status }: { status: AssetStatus }) {
  return <Badge className={assetStatusStyles[status]}>{status.replace("-", " ")}</Badge>;
}

function SectionHeader({ id, title, description, href, linkLabel }: { id: string; title: string; description: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b px-4 py-3 sm:px-5">
      <div>
        <h2 id={id} className="text-sm font-medium text-foreground">{title}</h2>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
      {href && linkLabel ? (
        <Link href={href} className="flex shrink-0 items-center gap-1 text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
          {linkLabel}<ChevronRight className="size-3.5" />
        </Link>
      ) : null}
    </div>
  );
}

function AssetPreview({ asset }: { asset: AssetSummary }) {
  const usesMark = asset.previewType === "mark" || asset.previewType === "icon";

  return (
    <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden border bg-elevated">
      {usesMark ? (
        <Image src="/brand/luna-logomark.png" alt="" fill sizes="40px" className="object-contain" />
      ) : (
        <FileImage className="size-4 text-muted" strokeWidth={1.5} aria-hidden="true" />
      )}
    </div>
  );
}

function RecentAssets({ assets, brands }: { assets: AssetSummary[]; brands: BrandSummary[] }) {
  const brandNames = new Map(brands.map((brand) => [brand.id, brand.name]));

  if (assets.length === 0) {
    return <EmptyState title="No recent assets" description="Recently updated brand assets will appear here." />;
  }

  return (
    <div className="divide-y">
      {assets.slice(0, 6).map((asset) => (
        <div key={asset.id} className="grid gap-3 px-4 py-3 transition-colors hover:bg-elevated/40 sm:grid-cols-[minmax(0,1fr)_120px_94px] sm:items-center sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <AssetPreview asset={asset} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-subtle">{asset.name}</p>
              <p className="mt-0.5 truncate text-[11px] text-muted">{brandNames.get(asset.brandId)} · {asset.category} · {asset.format} · {asset.version}</p>
            </div>
          </div>
          <div className="flex items-center sm:justify-start"><StatusBadge status={asset.status} /></div>
          <div className="flex items-center justify-between gap-2 text-[11px] text-muted sm:block sm:text-right">
            <span>{asset.owner.initials}</span>
            <span className="sm:ml-2">{displayDate.format(new Date(asset.updatedAt))}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BrandFamily({ brands }: { brands: BrandSummary[] }) {
  return (
    <div className="divide-y">
      {brands.map((brand) => (
        <div key={brand.id} className="grid gap-3 px-4 py-3 transition-colors hover:bg-elevated/40 sm:grid-cols-[minmax(0,1fr)_100px_100px] sm:items-center sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex size-8 shrink-0 items-center justify-center border bg-elevated">
              <Image src={brand.mark} alt="" fill sizes="32px" className="object-contain" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-subtle">{brand.name}</p>
                {brand.type === "parent" ? <Badge>Parent</Badge> : <GitBranch className="size-3 text-muted" aria-label="Inherits from Luna" />}
              </div>
              <p className="mt-0.5 truncate text-[11px] text-muted">{brand.type === "sub-brand" ? "Inherits from Luna" : "Parent identity system"} · {brand.owner.name}</p>
            </div>
          </div>
          <p className="text-xs text-muted"><span className="text-subtle">{brand.approvedAssetCount}</span> / {brand.assetCount} approved</p>
          <p className="text-[11px] text-muted sm:text-right">Updated {displayDate.format(new Date(brand.updatedAt))}</p>
        </div>
      ))}
    </div>
  );
}

function ActivityList({ activity }: { activity: ActivitySummary[] }) {
  if (activity.length === 0) {
    return <EmptyState title="No recent activity" description="Meaningful changes across the workspace will be recorded here." />;
  }

  return (
    <ol className="divide-y">
      {activity.map((item) => (
        <li key={item.id} className="flex gap-3 px-4 py-3 sm:px-5">
          <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border bg-elevated text-[10px] font-medium text-subtle">{item.actor.initials}</div>
          <div className="min-w-0 flex-1">
            <p className="text-xs leading-5 text-muted"><span className="font-medium text-subtle">{item.actor.name}</span> {item.action} <span className="text-subtle">{item.subject}</span></p>
            <p className="mt-0.5 text-[11px] text-muted/80">{item.metadata} · {displayDateTime.format(new Date(item.timestamp))}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function AttentionList({ items }: { items: AttentionItem[] }) {
  if (items.length === 0) {
    return <EmptyState title="Everything is in order" description="There are no review, format, or version issues requiring attention." icon={Check} />;
  }

  return (
    <div className="divide-y">
      {items.map((item) => {
        return (
          <Link key={item.id} href={item.href} className="flex gap-3 px-4 py-3 transition-colors hover:bg-elevated/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50 sm:px-5">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium text-subtle">{item.title}</span>
              <span className="mt-0.5 block text-[11px] leading-4 text-muted">{item.description}</span>
            </span>
            <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-muted" aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}

export function WorkspaceOverview({ data }: { data: WorkspaceOverviewData }) {
  const [notice, setNotice] = useState<string | null>(null);
  const showDeferredNotice = (label: string) => setNotice(`${label} will be available in a later milestone.`);

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
      <section className="flex flex-col gap-5 border-b pb-7 sm:flex-row sm:items-end sm:justify-between" aria-labelledby="workspace-title">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-[11px] text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="font-semibold uppercase tracking-[0.14em]">Workspace overview</span>
            <Badge>{data.workspace.plan}</Badge>
          </div>
          <h1 id="workspace-title" className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">{data.workspace.name}</h1>
          <p className="mt-2 text-sm leading-6 text-muted">{data.workspace.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted">
            <span className="flex items-center gap-1.5"><Clock3 className="size-3.5" />Updated {displayDateTime.format(new Date(data.workspace.updatedAt))}</span>
            <span className="flex items-center gap-1.5"><Users className="size-3.5" />{data.workspace.memberCount} members</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => showDeferredNotice("Brand creation")}><Plus className="size-4" />Create brand</Button>
          <Button onClick={() => showDeferredNotice("Asset upload")}><Upload className="size-4" />Upload assets</Button>
        </div>
      </section>

      {notice ? (
        <div className="mt-4 flex items-center gap-3 border bg-panel px-3 py-2 text-xs text-subtle" role="status" aria-live="polite">
          <CircleDot className="size-3.5 text-accent" />
          <span className="flex-1">{notice}</span>
          <button onClick={() => setNotice(null)} className="text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50" aria-label="Dismiss message"><X className="size-3.5" /></button>
        </div>
      ) : null}

      <section className="mt-6" aria-labelledby="metrics-title">
        <h2 id="metrics-title" className="sr-only">Workspace metrics</h2>
        <div className="grid grid-cols-2 border-l border-t sm:grid-cols-5">
          {data.metrics.map((metric) => (
            <div key={metric.label} className="border-b border-r bg-panel/40 px-4 py-3.5">
              <p className="text-[11px] text-muted">{metric.label}</p>
              <p className="mt-1 text-xl font-semibold tracking-[-0.02em] text-foreground">{metric.value}</p>
              <p className="mt-1 truncate text-[10px] text-muted/80">{metric.supportingText}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <div className="space-y-6">
          <section className="border bg-panel/30" aria-labelledby="assets-title">
            <SectionHeader id="assets-title" title="Recently updated assets" description="The latest changes across your brand library." href="/assets" linkLabel="View assets" />
            <RecentAssets assets={data.recentAssets} brands={data.brands} />
          </section>

          <section className="border bg-panel/30" aria-labelledby="brands-title">
            <SectionHeader id="brands-title" title="Brand family" description="The Luna parent identity and its related brands." href="/brands" linkLabel="View brands" />
            <BrandFamily brands={data.brands} />
          </section>
        </div>

        <div className="space-y-6">
          <section className="border bg-panel/30" aria-labelledby="attention-title">
            <SectionHeader id="attention-title" title="Needs attention" description="Items that may affect brand certainty." />
            <AttentionList items={data.attentionItems} />
          </section>

          <section className="border bg-panel/30" aria-labelledby="activity-title">
            <SectionHeader id="activity-title" title="Recent activity" description="Meaningful changes across the workspace." href="/activity" linkLabel="View all" />
            <ActivityList activity={data.recentActivity} />
          </section>

          <section className="border bg-panel/30" aria-labelledby="actions-title">
            <SectionHeader id="actions-title" title="Quick actions" description="Common ways to move the workspace forward." />
            <div className="grid grid-cols-2 gap-px bg-border">
              <button onClick={() => showDeferredNotice("Asset upload")} className="flex items-center gap-2 bg-panel px-4 py-3 text-left text-xs text-subtle transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50"><Upload className="size-3.5 text-muted" />Upload assets</button>
              <button onClick={() => showDeferredNotice("Brand creation")} className="flex items-center gap-2 bg-panel px-4 py-3 text-left text-xs text-subtle transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50"><Boxes className="size-3.5 text-muted" />Create brand</button>
              <Link href="/collections" className="flex items-center gap-2 bg-panel px-4 py-3 text-xs text-subtle transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50"><FolderPlus className="size-3.5 text-muted" />Create collection</Link>
              <Link href="/guide" className="flex items-center gap-2 bg-panel px-4 py-3 text-xs text-subtle transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50"><BookOpen className="size-3.5 text-muted" />Open brand guide</Link>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4 text-[11px] text-muted">
        <span>Workspace data is local and deterministic for Milestone 1.</span>
        <Link href="/activity" className="flex items-center gap-1 hover:text-foreground">Review activity <ArrowRight className="size-3" /></Link>
      </div>
    </div>
  );
}
