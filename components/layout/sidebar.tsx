"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Command } from "lucide-react";
import { LunaVaultLogo } from "@/components/brand/luna-vault-logo";
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
  return (
    <aside className="flex h-full w-full flex-col bg-panel">
      <div className="flex h-14 items-center border-b px-3">
        <button className="flex w-full items-center gap-2 rounded-md p-1.5 text-left hover:bg-elevated" aria-label="Switch workspace">
          <LunaVaultLogo className="min-w-0 flex-1" />
          <ChevronDown className="size-3.5 text-muted" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4" aria-label="Primary navigation">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted/70">Workspace</p>
        {primaryNavigation.map((item) => <NavLink key={item.href} item={item} onNavigate={onNavigate} />)}
      </nav>

      <nav className="space-y-1 border-t px-3 py-3" aria-label="Utility navigation">
        {utilityNavigation.map((item) => <NavLink key={item.href} item={item} onNavigate={onNavigate} />)}
        <div className="mt-3 flex items-center gap-2 border-t px-2 pt-3">
          <div className="flex size-6 items-center justify-center rounded-full bg-elevated text-[10px] font-semibold text-subtle">LV</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-subtle">Luna workspace</p>
            <p className="text-[10px] text-muted">Foundation</p>
          </div>
          <Command className="size-3.5 text-muted" />
        </div>
      </nav>
    </aside>
  );
}
