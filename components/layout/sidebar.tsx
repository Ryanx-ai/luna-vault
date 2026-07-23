"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Command, Database, PanelLeftClose, PanelLeftOpen, Plus } from "lucide-react";
import { LunaVaultLogo } from "@/components/brand/luna-vault-logo";
import { useVault } from "@/components/providers/vault-provider";
import { primaryNavigation, utilityNavigation, type NavigationItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function NavLink({ item, onNavigate, collapsed = false }: { item: NavigationItem; onNavigate?: () => void; collapsed?: boolean }) {
  const pathname = usePathname();
  const active = pathname === item.href || (item.href === "/brands" && pathname.startsWith("/brands/"));
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      aria-label={collapsed ? `${item.label}${item.beta ? " · Beta" : ""}` : undefined}
      title={collapsed ? `${item.label}${item.beta ? " · Beta" : ""}` : undefined}
      className={cn(
        "group flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] transition-colors",
        collapsed && "justify-center",
        active ? "bg-elevated text-foreground shadow-hairline" : item.quiet ? "text-muted/75 hover:bg-elevated/70 hover:text-subtle" : "text-muted hover:bg-elevated/70 hover:text-subtle",
      )}
    >
      <Icon className="size-4 shrink-0" strokeWidth={1.6} />
      {!collapsed ? <><span>{item.label}</span>{item.beta ? <span className="ml-auto border border-accent/15 px-1 py-0.5 text-[8px] uppercase tracking-[0.08em] text-accent/70">Beta</span> : null}</> : null}
    </Link>
  );
}

export function Sidebar({ onNavigate, collapsed = false, onToggleCollapsed }: { onNavigate?: () => void; collapsed?: boolean; onToggleCollapsed?: () => void }) {
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
      <div className={cn("flex items-center border-b px-3", collapsed ? "h-24 flex-col justify-center gap-2" : "h-14 justify-between")}>
        {collapsed ? <span className="flex size-10 items-center justify-center overflow-hidden" aria-label="Luna Vault"><Image src="/brand/luna-logomark.svg" alt="" width={34} height={34} priority className="size-[34px] object-contain" /></span> : <LunaVaultLogo />}
        {onToggleCollapsed ? <button onClick={onToggleCollapsed} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} title={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted hover:bg-elevated hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">{collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-3.5" />}</button> : null}
      </div>

      <div ref={switcherRef} className={cn("relative border-b py-3", collapsed ? "px-2" : "px-3")}>
        <button onClick={() => { setSwitcherOpen((open) => !open); setCreateNotice(false); }} aria-label={`Switch Vault, ${selectedVault.name} selected`} aria-haspopup="menu" aria-expanded={switcherOpen} className="flex h-10 w-full items-center gap-2.5 rounded-md border bg-canvas px-2 text-left transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-elevated text-[10px] font-semibold text-subtle">{selectedVault.name.slice(0, 2).toUpperCase()}</span>
          {!collapsed ? <span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium text-foreground">{selectedVault.name}</span><span className="block text-[9px] uppercase tracking-[0.1em] text-muted">Active Vault</span></span> : null}
          {!collapsed ? <ChevronDown className={cn("size-3.5 text-muted transition-transform", switcherOpen && "rotate-180")} /> : null}
        </button>

        {switcherOpen ? (
          <div className={cn("absolute top-[58px] z-50 border bg-panel p-1 shadow-2xl", collapsed ? "left-2 w-56" : "left-3 right-3")} role="menu" aria-label="Select Vault">
            <p className="px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">Vaults</p>
            {shellData.vaults.map((vault) => {
              const active = vault.id === selectedVault.id;
              return <button key={vault.id} role="menuitemradio" aria-checked={active} onClick={() => { selectVault(vault.id); setSwitcherOpen(false); setCreateNotice(false); onNavigate?.(); }} className={cn("flex h-9 w-full items-center gap-2.5 rounded-sm px-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", active ? "bg-elevated text-foreground" : "text-muted hover:bg-elevated/70 hover:text-subtle")}><Database className="size-3.5" strokeWidth={1.6} /><span className="min-w-0 flex-1 truncate">{vault.name}</span>{active ? <Check className="size-3 text-accent" /> : null}</button>;
            })}
            <div className="mt-1 border-t pt-1"><button role="menuitem" onClick={() => setCreateNotice(true)} className="flex h-9 w-full items-center gap-2.5 rounded-sm px-2 text-left text-xs text-muted transition-colors hover:bg-elevated hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"><Plus className="size-3.5" />Create new Vault</button>{createNotice ? <p className="px-2 pb-2 text-[10px] leading-4 text-muted">Vault creation is not available yet.</p> : null}</div>
          </div>
        ) : null}
      </div>

      <nav className={cn("flex flex-1 flex-col gap-1 overflow-y-auto py-3", collapsed ? "px-2" : "px-3")} aria-label="Primary navigation">
        {!collapsed ? <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted/70">Workspace</p> : null}
        {primaryNavigation.map((item) => <NavLink key={item.href} item={item} onNavigate={onNavigate} collapsed={collapsed} />)}
      </nav>

      <nav className={cn("space-y-1 border-t py-3", collapsed ? "px-2" : "px-3")} aria-label="Utility navigation">
        {utilityNavigation.map((item) => <NavLink key={item.href} item={item} onNavigate={onNavigate} collapsed={collapsed} />)}
        <div className="mt-3 flex items-center gap-2 border-t px-2 pt-3">
          <div className="flex size-6 items-center justify-center rounded-full bg-elevated text-[10px] font-semibold text-subtle">LV</div>
          {!collapsed ? <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-subtle">{selectedVault.name} Vault</p>
            <p className="text-[10px] text-muted">v0.0.1</p>
          </div> : null}
          {!collapsed ? <Command className="size-3.5 text-muted" /> : null}
        </div>
      </nav>
    </aside>
  );
}
