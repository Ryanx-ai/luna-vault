import { Braces, Box, FileJson2, Images, Layers3, Package, ScrollText, Waypoints } from "lucide-react";

const capabilities = [
  ["Identity tokens", Braces], ["Asset references", Images], ["Guide content", ScrollText],
  ["Collection releases", Layers3], ["Package manifests", Package], ["Timeline history", Waypoints],
] as const;

const response = `{
  "brand": "KuroHotel",
  "identity": {
    "logo": "...",
    "colours": ["#2C3639", "#4E635E"],
    "typography": ["Helvetica Neue", "Garamond"]
  }
}`;

export default function ApiPage() {
  return <div className="mx-auto w-full max-w-[1080px] px-4 py-8 sm:px-6 lg:px-8"><header className="border-b pb-7"><div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-accent"><FileJson2 className="size-3.5" />Vision surface · Beta</div><h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">Luna API</h1><p className="mt-2 text-sm text-subtle">Brand infrastructure</p><p className="mt-4 max-w-xl text-xs leading-6 text-muted">Expose approved identity, Assets, Guides, and releases as structured Brand data.</p></header><section className="grid gap-5 py-7 lg:grid-cols-[minmax(0,1fr)_280px]"><div className="overflow-hidden border bg-[#09090a]"><div className="flex items-center justify-between border-b px-4 py-3"><code className="text-[11px] text-accent">GET /v1/brands/kurohotel</code><span className="text-[9px] uppercase tracking-[0.1em] text-muted">Conceptual response</span></div><pre className="overflow-x-auto p-5 text-[11px] leading-6 text-subtle"><code>{response}</code></pre></div><div className="border bg-panel/25 p-5"><Box className="size-4 text-muted" /><h2 className="mt-5 text-sm font-medium">Every application can read the Brand.</h2><p className="mt-3 text-[11px] leading-5 text-muted">This page describes a future interface. No endpoint, API key, external access, or backend handler exists.</p></div></section><section className="border-t py-7"><h2 className="text-sm font-medium">Future capabilities</h2><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{capabilities.map(([name,Icon])=><article key={name} className="border bg-panel/25 p-4"><Icon className="size-4 text-muted" /><h3 className="mt-4 text-xs font-medium">{name}</h3><p className="mt-1 text-[10px] text-muted">Not available</p></article>)}</div></section></div>;
}
