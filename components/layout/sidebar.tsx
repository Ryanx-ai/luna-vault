"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Check, Command, Database, Plus, X } from "lucide-react";
import { LunaVaultLogo } from "@/components/brand/luna-vault-logo";
import { useVault } from "@/components/providers/vault-provider";
import { primaryNavigation, utilityNavigation, type NavigationItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function NavLink({ item, onNavigate }: { item: NavigationItem; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = pathname === item.href;
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
  const [createVaultOpen, setCreateVaultOpen] = useState(false);

  return (
    <aside className="flex h-full w-full flex-col bg-panel">
      <div className="flex h-14 items-center border-b px-3">
        <LunaVaultLogo />
      </div>

      <div className="relative border-b px-3 py-3">
        <div className="mb-1 flex h-5 items-center justify-between px-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted/70">Vaults</p>
          <button
            onClick={() => setCreateVaultOpen((open) => !open)}
            aria-label="Create Vault"
            aria-expanded={createVaultOpen}
            className="flex size-5 items-center justify-center rounded-sm text-muted transition-colors hover:bg-elevated hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
        {createVaultOpen ? (
          <div className="absolute left-3 right-3 top-10 z-20 border bg-panel p-3 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-subtle">Create Vault</p>
              <button onClick={() => setCreateVaultOpen(false)} aria-label="Close Create Vault" className="text-muted hover:text-foreground"><X className="size-3.5" /></button>
            </div>
            <p className="mt-1.5 text-[11px] leading-4 text-muted">New Vault creation will be available in a later milestone.</p>
          </div>
        ) : null}
        <div className="space-y-0.5" role="list" aria-label="Vaults">
          {shellData.vaults.map((vault) => {
            const active = vault.id === selectedVault.id;
            return (
              <button
                key={vault.id}
                onClick={() => { selectVault(vault.id); onNavigate?.(); }}
                aria-pressed={active}
                className={cn(
                  "flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-left text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                  active ? "bg-elevated text-foreground shadow-hairline" : "text-muted hover:bg-elevated/70 hover:text-subtle",
                )}
              >
                <Database className="size-3.5" strokeWidth={1.6} />
                <span className="min-w-0 flex-1 truncate">{vault.name}</span>
                {active ? <Check className="size-3 text-accent" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
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
            <p className="truncate text-xs font-medium text-subtle">Luna workspace</p>
            <p className="text-[10px] text-muted">v0.0.1</p>
          </div>
          <Command className="size-3.5 text-muted" />
        </div>
      </nav>
    </aside>
  );
}
