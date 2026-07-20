"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen bg-canvas">
      <div className="fixed inset-y-0 left-0 hidden w-60 border-r md:block">
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

      <div className="flex min-h-screen min-w-0 flex-1 flex-col md:pl-60">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
