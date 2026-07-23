import { ArrowRight, Cloud, Globe2, Mail, Monitor, PackageOpen, Share2, Youtube } from "lucide-react";
import { notFound } from "next/navigation";
import { SHOW_VISION_SURFACES } from "@/lib/config/features";

const destinations = [
  { name: "Website", icon: Globe2, state: "Not connected" },
  { name: "LinkedIn", icon: Share2, state: "Concept" },
  { name: "YouTube", icon: Youtube, state: "Concept" },
  { name: "Email signatures", icon: Mail, state: "Coming later" },
  { name: "Press kits", icon: PackageOpen, state: "Coming later" },
  { name: "Shared Collections", icon: Monitor, state: "Concept" },
];

export default function CloudPage() {
  if (!SHOW_VISION_SURFACES) notFound();
  return <div className="mx-auto w-full max-w-[1080px] px-4 py-8 sm:px-6 lg:px-8"><header className="border-b pb-7"><div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-accent"><Cloud className="size-3.5" />Vision surface · Beta</div><h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">Luna Cloud</h1><p className="mt-2 text-sm text-subtle">Brand distribution</p><p className="mt-4 max-w-xl text-xs leading-6 text-muted">Publish approved Brand changes to every connected destination.</p></header><section className="py-7"><p className="text-[10px] uppercase tracking-[0.12em] text-muted">Conceptual pipeline</p><div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"><Step label="Brand source" /><ArrowRight className="mx-auto size-4 text-muted sm:mx-0" /><Step label="Approved release" /><ArrowRight className="mx-auto size-4 text-muted sm:mx-0" /><Step label="Connected destinations" /></div></section><section className="border-t py-7"><h2 className="text-sm font-medium">Destinations</h2><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{destinations.map(({ name, icon: Icon, state }) => <article key={name} className="border bg-panel/25 p-4"><Icon className="size-4 text-muted" /><h3 className="mt-4 text-xs font-medium">{name}</h3><p className="mt-1 text-[10px] text-muted">{state}</p></article>)}</div></section><section className="border-t py-7"><h2 className="text-sm font-medium">Future workflow</h2><ol className="mt-4 grid gap-px border bg-border sm:grid-cols-5">{["Review Brand change","Review affected destinations","Approve release","Publish or schedule","Preserve history"].map((item,index)=><li key={item} className="bg-canvas p-4 text-[11px] leading-5"><span className="mb-3 block text-[9px] text-accent">0{index+1}</span>{item}</li>)}</ol><p className="mt-4 text-[10px] text-muted">Internal vision only. No connectors, publishing, scheduling, or background sync are active.</p></section></div>;
}

function Step({ label }: { label: string }) { return <div className="flex-1 border bg-panel/30 px-4 py-5 text-center text-xs">{label}</div>; }
