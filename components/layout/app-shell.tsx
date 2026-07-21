"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VaultProvider } from "@/components/providers/vault-provider";
import type { ShellData } from "@/lib/types/workspace";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children, shellData }: { children: React.ReactNode; shellData: ShellData }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <VaultProvider shellData={shellData}>
      <div className="relative h-dvh overflow-hidden bg-canvas">
        <div className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r md:block">
          <Sidebar />
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

        <div className="flex h-dvh min-w-0 flex-col md:ml-60">
          <Topbar onMenuClick={() => setMobileOpen(true)} />
          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
        </div>
      </div>
    </VaultProvider>
  );
}
