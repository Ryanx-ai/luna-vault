"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Command, Database, Plus } from "lucide-react";
import { LunaVaultLogo } from "@/components/brand/luna-vault-logo";
import { useVault } from "@/components/providers/vault-provider";
import { primaryNavigation, utilityNavigation, type NavigationItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function NavLink({ item, onNavigate }: { item: NavigationItem; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = pathname === item.href || (item.href === "/brands" && pathname.startsWith("/brands/"));
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] transition-colors",
        active ? "bg-elevated text-foreground shadow-hairline" : "text-muted hover:bg-elevated/70 hover:text-subtle",
      )}
    >
      <Icon className="size-4 shrink-0" strokeWidth={1.6} />
      <span>{item.label}</span>
    </Link>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { shellData, selectedVault, selectVault } = useVault();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [createNotice, setCreateNotice] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!switcherOpen) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) setSwitcherOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSwitcherOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [switcherOpen]);

  return (
    <aside className="flex h-full w-full flex-col bg-panel">
      <div className="flex h-14 items-center border-b px-3">
        <LunaVaultLogo />
      </div>

      <div ref={switcherRef} className="relative border-b px-3 py-3">
        <button onClick={() => { setSwitcherOpen((open) => !open); setCreateNotice(false); }} aria-label={`Switch Vault, ${selectedVault.name} selected`} aria-haspopup="menu" aria-expanded={switcherOpen} className="flex h-10 w-full items-center gap-2.5 rounded-md border bg-canvas px-2 text-left transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-elevated text-[10px] font-semibold text-subtle">{selectedVault.name.slice(0, 2).toUpperCase()}</span>
          <span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium text-foreground">{selectedVault.name}</span><span className="block text-[9px] uppercase tracking-[0.1em] text-muted">Active Vault</span></span>
          <ChevronDown className={cn("size-3.5 text-muted transition-transform", switcherOpen && "rotate-180")} />
        </button>

        {switcherOpen ? (
          <div className="absolute left-3 right-3 top-[58px] z-50 border bg-panel p-1 shadow-2xl" role="menu" aria-label="Select Vault">
            <p className="px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">Vaults</p>
            {shellData.vaults.map((vault) => {
              const active = vault.id === selectedVault.id;
              return <button key={vault.id} role="menuitemradio" aria-checked={active} onClick={() => { selectVault(vault.id); setSwitcherOpen(false); setCreateNotice(false); onNavigate?.(); }} className={cn("flex h-9 w-full items-center gap-2.5 rounded-sm px-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", active ? "bg-elevated text-foreground" : "text-muted hover:bg-elevated/70 hover:text-subtle")}><Database className="size-3.5" strokeWidth={1.6} /><span className="min-w-0 flex-1 truncate">{vault.name}</span>{active ? <Check className="size-3 text-accent" /> : null}</button>;
            })}
            <div className="mt-1 border-t pt-1"><button role="menuitem" onClick={() => setCreateNotice(true)} className="flex h-9 w-full items-center gap-2.5 rounded-sm px-2 text-left text-xs text-muted transition-colors hover:bg-elevated hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"><Plus className="size-3.5" />Create new Vault</button>{createNotice ? <p className="px-2 pb-2 text-[10px] leading-4 text-muted">Vault creation is not available yet.</p> : null}</div>
          </div>
        ) : null}
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-3" aria-label="Primary navigation">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted/70">Workspace</p>
        {primaryNavigation.map((item) => <NavLink key={item.href} item={item} onNavigate={onNavigate} />)}
      </nav>

      <nav className="space-y-1 border-t px-3 py-3" aria-label="Utility navigation">
        {utilityNavigation.map((item) => <NavLink key={item.href} item={item} onNavigate={onNavigate} />)}
        <div className="mt-3 flex items-center gap-2 border-t px-2 pt-3">
          <div className="flex size-6 items-center justify-center rounded-full bg-elevated text-[10px] font-semibold text-subtle">LV</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-subtle">{selectedVault.name} Vault</p>
            <p className="text-[10px] text-muted">v0.0.1</p>
          </div>
          <Command className="size-3.5 text-muted" />
        </div>
      </nav>
    </aside>
  );
}
