"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandProvider } from "@/components/providers/brand-provider";
import { AssetProvider } from "@/components/providers/asset-provider";
import type { Asset } from "@/lib/types/asset";
import { VaultProvider } from "@/components/providers/vault-provider";
import type { Brand } from "@/lib/types/brand";
import type { ShellData } from "@/lib/types/workspace";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children, shellData, brands, assets }: { children: React.ReactNode; shellData: ShellData; brands: Brand[]; assets: Asset[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <VaultProvider shellData={shellData}>
      <BrandProvider initialBrands={brands}>
        <AssetProvider initialAssets={assets}>
        <div className="relative h-dvh overflow-hidden bg-canvas">
          <div className={`fixed inset-y-0 left-0 z-40 hidden border-r transition-[width] md:block ${sidebarCollapsed ? "w-16" : "w-60"}`}>
            <Sidebar collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed((value) => !value)} />
          </div>

          {mobileOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <button className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
              <div className="relative h-full w-[min(88vw,280px)] border-r shadow-2xl">
                <Sidebar onNavigate={() => setMobileOpen(false)} />
                <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
                  <X className="size-4" />
                </Button>
              </div>
            </div>
          )}

          <div className={`grid h-dvh min-w-0 grid-rows-[3.5rem_minmax(0,1fr)] overflow-hidden transition-[margin] ${sidebarCollapsed ? "md:ml-16" : "md:ml-60"}`}>
            <Topbar onMenuClick={() => setMobileOpen(true)} />
            <main className="min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain">{children}</main>
          </div>
        </div>
        </AssetProvider>
      </BrandProvider>
    </VaultProvider>
  );
}
