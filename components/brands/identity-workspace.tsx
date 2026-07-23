"use client";

import Image from "next/image";
import { Check, FileImage, Plus, Trash2, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { useAssets } from "@/components/providers/asset-provider";
import { Button } from "@/components/ui/button";
import type { Asset, AssetCategory, AssetFileType } from "@/lib/types/asset";
import type { Brand } from "@/lib/types/brand";
import { moonlightBlackTheme } from "@/lib/types/brand-theme";

const coreRoles = ["Full Logo", "Wordmark", "Logomark"] as const;
const secondaryRoles = ["Horizontal", "Vertical", "Favicon", "App Icon", "Custom variants"];
const seededColours = [
  { id: "moonlight", name: "Moonlight", hex: "#0B0B0C", role: "Primary", required: true },
  { id: "luna-cyan", name: "Luna Cyan", hex: "#B7F4F2", role: "Secondary", required: true },
  { id: "slate", name: "Slate", hex: "#7B8494", role: "Other", required: true },
];

export function IdentityWorkspace({ brand, sourceName }: { brand: Brand; sourceName?: string }) {
  const { assets, addAssets } = useAssets();
  const logoAssets = assets.filter((asset) => asset.vaultId === brand.vaultId && asset.brandId === brand.id && asset.category === "Logos");
  const inherited = Object.fromEntries(brand.identityRules.map((rule) => [rule.name, rule.state === "Inherited"]));
  return <div className="space-y-5">
    <LogoIdentity brand={brand} logoAssets={logoAssets} addAssets={addAssets} />
    <ColourIdentity inheritedFrom={inherited.Colour ? sourceName : undefined} />
    <TypographyIdentity inheritedFrom={inherited.Typography ? sourceName : undefined} />
    <AppearancePreview brandName={brand.name} />
  </div>;
}

function LogoIdentity({ brand, logoAssets, addAssets }: { brand: Brand; logoAssets: Asset[]; addAssets: ReturnType<typeof useAssets>["addAssets"] }) {
  const initial = (role: string) => logoAssets.find((asset) => asset.name.toLowerCase().includes(role === "Full Logo" ? "primary" : role === "Logomark" ? "symbol" : role.toLowerCase()))?.id ?? "";
  const [selected, setSelected] = useState<Record<string, string>>(() => Object.fromEntries(coreRoles.map((role) => [role, initial(role)])));
  const upload = (role: string, file?: File) => {
    if (!file) return;
    const previewable = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(file.type);
    const [asset] = addAssets([{ vaultId: brand.vaultId, brandId: brand.id, name: `${role} · ${file.name.replace(/\.[^.]+$/, "")}`, originalFilename: file.name, fileType: "Image" as AssetFileType, mimeType: file.type || "application/octet-stream", extension: file.name.split(".").pop()?.toUpperCase() ?? "FILE", category: "Logos" as AssetCategory, tags: ["identity", role.toLowerCase().replace(" ", "-")], status: "Draft", sizeBytes: file.size, thumbnail: previewable ? URL.createObjectURL(file) : undefined }]);
    setSelected((value) => ({ ...value, [role]: asset.id }));
  };
  return <section className="border bg-panel/25 p-4 sm:p-5"><div><h3 className="text-sm font-medium">Logo</h3><p className="mt-1 text-[11px] text-muted">Connect the three logo Assets people reach for most.</p></div><div className="mt-4 grid gap-3 md:grid-cols-3">{coreRoles.map((role) => { const asset = logoAssets.find((item) => item.id === selected[role]); return <div key={role} className="flex min-h-56 flex-col border bg-canvas"><div className="relative flex h-32 items-center justify-center overflow-hidden border-b p-4">{asset?.thumbnail ? asset.thumbnail.startsWith("blob:") ? <img src={asset.thumbnail} alt={`${role} preview`} className="h-full w-full object-contain" /> : <Image src={asset.thumbnail} alt={`${role} preview`} fill sizes="300px" className="object-contain p-4" /> : <FileImage className="size-6 text-muted" />}</div><div className="flex flex-1 flex-col p-3"><h4 className="text-xs font-medium">{role}</h4><select aria-label={`Select existing Asset for ${role}`} value={selected[role]} onChange={(event) => setSelected((value) => ({ ...value, [role]: event.target.value }))} className="mt-2 h-8 w-full border bg-panel px-2 text-[10px]"><option value="">No Asset selected</option>{logoAssets.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><label className="mt-2 inline-flex cursor-pointer items-center gap-1.5 text-[10px] text-accent"><Upload className="size-3" />Choose local file<input type="file" accept=".png,.jpg,.jpeg,.webp,.svg,image/*" className="sr-only" onChange={(event) => upload(role, event.target.files?.[0])} /></label></div></div>; })}</div><div className="mt-4 flex flex-wrap gap-2">{secondaryRoles.map((role) => <span key={role} className="border px-2.5 py-2 text-[10px] text-muted">{role} · Not connected</span>)}</div></section>;
}

function ColourIdentity({ inheritedFrom }: { inheritedFrom?: string }) {
  const [colours, setColours] = useState(seededColours);
  const [selectedId, setSelectedId] = useState(colours[0].id);
  const selected = colours.find((colour) => colour.id === selectedId) ?? colours[0];
  const rgb = useMemo(() => hexToRgb(selected.hex), [selected.hex]);
  const update = (changes: Partial<typeof selected>) => setColours((items) => items.map((item) => item.id === selected.id ? { ...item, ...changes } : item));
  const add = () => { const colour = { id: `custom-${Date.now()}`, name: "Custom colour", hex: "#FFFFFF", role: "Other", required: false }; setColours((items) => [...items, colour]); setSelectedId(colour.id); };
  return <section className="border bg-panel/25 p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-medium">Colour</h3><p className="mt-1 text-[11px] text-muted">{inheritedFrom ? `Inherited from ${inheritedFrom}.` : "Build a practical palette for screen and print."}</p></div><Button variant="outline" onClick={add}><Plus className="size-3" />Add colour</Button></div><div className="mt-4 flex gap-2 overflow-x-auto pb-2">{colours.map((colour) => <button key={colour.id} onClick={() => setSelectedId(colour.id)} aria-pressed={selectedId === colour.id} className={`min-w-32 border p-2 text-left ${selectedId === colour.id ? "border-accent/60" : ""}`}><span className="block h-14 border" style={{ background: colour.hex }} /><span className="mt-2 block text-[11px] font-medium">{colour.name}</span><span className="text-[10px] text-muted">{colour.hex} · {colour.role}</span></button>)}</div><div className="mt-3 grid gap-3 border bg-canvas p-4 sm:grid-cols-2 lg:grid-cols-3"><Field label="HEX"><input aria-label="HEX" value={selected.hex} onChange={(event) => /^#[0-9a-fA-F]{0,6}$/.test(event.target.value) && update({ hex: event.target.value.toUpperCase() })} className="h-8 w-full border bg-panel px-2 text-xs" /></Field><Field label="RGB"><p>{rgb}</p></Field><Field label="CMYK"><p>Manual verification</p></Field><Field label="Print reference / Pantone"><p>Not set</p></Field><Field label="Role"><select aria-label="Colour role" value={selected.role} onChange={(event) => update({ role: event.target.value })} className="h-8 w-full border bg-panel px-2 text-xs"><option>Primary</option><option>Secondary</option><option>Other</option></select></Field><Field label="Accessibility contrast"><p>Review against its intended background.</p></Field><Field label="Custom tag"><input aria-label="Custom colour tag" placeholder="e.g. Digital" className="h-8 w-full border bg-panel px-2 text-xs" /></Field>{!selected.required ? <Button variant="outline" onClick={() => { setColours((items) => items.filter((item) => item.id !== selected.id)); setSelectedId(colours[0].id); }}><Trash2 className="size-3" />Remove custom colour</Button> : null}</div></section>;
}

function TypographyIdentity({ inheritedFrom }: { inheritedFrom?: string }) {
  const [size, setSize] = useState(36);
  const [localFont, setLocalFont] = useState("");
  return <section className="border bg-panel/25 p-4 sm:p-5"><h3 className="text-sm font-medium">Typography</h3><p className="mt-1 text-[11px] text-muted">{inheritedFrom ? `Inherited from ${inheritedFrom}.` : "Define readable type roles and review the specimen."}</p><div className="mt-4 grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)]"><div className="space-y-2"><Typeface label="Primary Typeface" family="Inter" detail="Regular, Medium, Semibold · Normal, Italic" /><Typeface label="Secondary Typeface" family="Georgia" detail="Regular, Bold · Normal, Italic" /><div className="border p-3"><p className="text-[10px] text-muted">Other Typefaces</p><label className="mt-2 flex cursor-pointer items-center gap-1.5 text-[10px] text-accent"><Upload className="size-3" />Select font file<input type="file" accept=".otf,.ttf,.woff,.woff2" className="sr-only" onChange={(event) => setLocalFont(event.target.files?.[0]?.name ?? "")} /></label>{localFont ? <p className="mt-2 break-all text-[10px] text-subtle">{localFont}</p> : null}</div></div><div className="border bg-canvas p-4"><label className="flex items-center gap-3 text-[10px] text-muted">Preview size<input aria-label="Typography preview size" type="range" min="16" max="72" value={size} onChange={(event) => setSize(Number(event.target.value))} className="flex-1" /><span>{size}px</span></label><p className="mt-6 break-words leading-tight" style={{ fontSize: `${size}px` }}>Aa Bb Cc — Luna Vault</p><p className="mt-5 text-xs leading-6 text-subtle">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 · &amp; @ # % ? !</p></div></div></section>;
}

function AppearancePreview({ brandName }: { brandName: string }) {
  const [brandMode, setBrandMode] = useState(false);
  return <section className="border bg-panel/25 p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-sm font-medium">Workspace appearance</h3><p className="mt-1 text-[11px] text-muted">Moonlight Black remains the accessible system default.</p></div><button role="switch" aria-checked={brandMode} onClick={() => setBrandMode((value) => !value)} className="inline-flex h-8 items-center gap-2 border px-3 text-[10px]">{brandMode ? <Check className="size-3 text-accent" /> : null}{brandMode ? "Preview Brand appearance" : "Use Luna system appearance"}</button></div><div className="mt-4 border p-4" style={{ background: brandMode ? "#10191a" : moonlightBlackTheme.canvas, color: moonlightBlackTheme.foreground }}><p className="text-[10px]" style={{ color: brandMode ? "#B7F4F2" : moonlightBlackTheme.muted }}>{brandName} workspace preview</p><p className="mt-2 text-sm">Brand identity can shape a contained workspace without changing Luna’s navigation or core interface.</p></div></section>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <div><p className="mb-1 text-[9px] uppercase tracking-[0.1em] text-muted">{label}</p><div className="text-[11px] text-subtle">{children}</div></div>; }
function Typeface({ label, family, detail }: { label: string; family: string; detail: string }) { return <div className="border p-3"><p className="text-[9px] uppercase tracking-[0.1em] text-muted">{label}</p><p className="mt-2 text-sm">{family}</p><p className="mt-1 text-[10px] leading-4 text-muted">{detail}</p></div>; }
function hexToRgb(hex: string) { const value = hex.replace("#", ""); if (value.length !== 6) return "Enter a six-digit HEX value"; const number = Number.parseInt(value, 16); return `${(number >> 16) & 255}, ${(number >> 8) & 255}, ${number & 255}`; }
