"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Activity, Bell, ChevronDown, Clock3, FileImage, Menu, Search, X } from "lucide-react";
import { useVault } from "@/components/providers/vault-provider";
import { useBrands } from "@/components/providers/brand-provider";
import { Button } from "@/components/ui/button";
import { primaryNavigation, utilityNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type OpenPanel = "updates" | "notifications" | "profile" | null;

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const { selectedVault, shellData } = useVault();
  const { brands } = useBrands();
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [updatesView, setUpdatesView] = useState<"activity" | "assets">("activity");
  const item = [...primaryNavigation, ...utilityNavigation].find((entry) => entry.href === pathname);
  const detailSlug = pathname.startsWith("/brands/") ? pathname.split("/")[2] : undefined;
  const activeBrand = detailSlug ? brands.find((brand) => brand.slug === detailSlug) : undefined;
  const unreadCount = shellData.notifications.filter((notification) => notification.unread).length;

  const togglePanel = (panel: Exclude<OpenPanel, null>) => setOpenPanel((current) => current === panel ? null : panel);

  return (
    <header className="relative z-30 grid h-14 shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center border-b bg-canvas px-4 md:grid-cols-[minmax(180px,1fr)_minmax(180px,320px)_minmax(220px,1fr)] md:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <Button variant="ghost" size="icon" className="-ml-2 md:hidden" onClick={onMenuClick} aria-label="Open navigation">
          <Menu className="size-4" />
        </Button>
        <span className="truncate text-xs text-muted">{selectedVault.name}</span>
        <span className="text-muted/50">/</span>
        {detailSlug ? <><Link href="/brands" className="truncate text-xs text-muted hover:text-foreground">Brands</Link><span className="text-muted/50">/</span><span className="truncate text-xs font-medium text-subtle">{activeBrand?.name ?? "Brand not found"}</span></> : <span className="truncate text-xs font-medium text-subtle">{item?.label ?? "Luna Vault"}</span>}
      </div>

      <Button variant="outline" className="hidden h-8 w-full justify-start px-2.5 md:flex" aria-label="Search Vault">
        <Search className="size-3.5" />
        <span className="flex-1 text-left text-xs font-normal text-muted">Search Vault</span>
        <kbd className="text-[10px] text-muted">⌘K</kbd>
      </Button>

      <div className="relative flex items-center justify-end gap-1">
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search Vault"><Search className="size-4" /></Button>
        <Button variant="ghost" size="icon" onClick={() => togglePanel("updates")} aria-label="Updates" aria-expanded={openPanel === "updates"}>
          <Activity className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative" onClick={() => togglePanel("notifications")} aria-label={`Notifications, ${unreadCount} unread`} aria-expanded={openPanel === "notifications"}>
          <Bell className="size-4" />
          {unreadCount > 0 ? <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-accent" /> : null}
        </Button>
        <button onClick={() => togglePanel("profile")} className="ml-1 flex h-8 items-center gap-2 rounded-md px-1.5 text-left transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50" aria-label="User profile" aria-expanded={openPanel === "profile"}>
          <span className="flex size-6 items-center justify-center rounded-full border bg-elevated text-[10px] font-semibold text-subtle">{shellData.user.initials}</span>
          <span className="hidden text-xs font-medium text-subtle lg:inline">{shellData.user.name}</span>
          <ChevronDown className="hidden size-3 text-muted lg:block" />
        </button>

        {openPanel ? (
          <div className="absolute right-0 top-10 w-[min(360px,calc(100vw-24px))] border bg-panel shadow-2xl">
            <div className="flex h-11 items-center justify-between border-b px-4">
              <p className="text-xs font-medium text-foreground">
                {openPanel === "updates" ? "Updates" : openPanel === "notifications" ? "Notifications" : "Profile"}
              </p>
              <button onClick={() => setOpenPanel(null)} className="text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50" aria-label="Close panel"><X className="size-3.5" /></button>
            </div>

            {openPanel === "updates" ? (
              <div>
                <div className="flex border-b p-1">
                  {(["activity", "assets"] as const).map((view) => (
                    <button key={view} onClick={() => setUpdatesView(view)} className={cn("flex-1 rounded-sm px-3 py-1.5 text-xs capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", updatesView === view ? "bg-elevated text-foreground" : "text-muted hover:text-subtle")} aria-pressed={updatesView === view}>
                      {view === "activity" ? "Recent Changes" : "Recent assets"}
                    </button>
                  ))}
                </div>
                <div className="max-h-[420px] divide-y overflow-y-auto">
                  {updatesView === "activity" ? shellData.activity.slice(0, 5).map((update) => (
                    <div key={update.id} className="flex gap-3 px-4 py-3">
                      <Clock3 className="mt-0.5 size-3.5 shrink-0 text-muted" />
                      <div className="min-w-0"><p className="text-xs leading-5 text-subtle"><span className="font-medium">{update.actor.name}</span> {update.action} {update.subject}</p><p className="text-[10px] text-muted">{update.metadata}</p></div>
                    </div>
                  )) : shellData.recentAssets.slice(0, 5).map((asset) => (
                    <div key={asset.id} className="flex items-center gap-3 px-4 py-3">
                      <FileImage className="size-3.5 shrink-0 text-muted" />
                      <div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-subtle">{asset.name}</p><p className="text-[10px] text-muted">{asset.format} · {asset.version} · {asset.status.replace("-", " ")}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {openPanel === "notifications" ? (
              <div className="max-h-[420px] divide-y overflow-y-auto">
                {shellData.notifications.map((notification) => (
                  <div key={notification.id} className="flex gap-3 px-4 py-3">
                    <span className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", notification.unread ? "bg-accent" : "bg-muted/30")} />
                    <div><p className="text-xs font-medium text-subtle">{notification.title}</p><p className="mt-1 text-[11px] leading-4 text-muted">{notification.description}</p></div>
                  </div>
                ))}
              </div>
            ) : null}

            {openPanel === "profile" ? (
              <div className="p-4">
                <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full border bg-elevated text-xs font-semibold">{shellData.user.initials}</span><div><p className="text-sm font-medium">{shellData.user.name}</p><p className="text-[11px] text-muted">{shellData.user.role}</p></div></div>
                <p className="mt-4 border-t pt-3 text-[11px] leading-5 text-muted">Account settings are not available yet.</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
