"use client";

import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { primaryNavigation, utilityNavigation } from "@/lib/navigation";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const item = [...primaryNavigation, ...utilityNavigation].find((entry) => entry.href === pathname);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-canvas/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="-ml-2 md:hidden" onClick={onMenuClick} aria-label="Open navigation">
          <Menu className="size-4" />
        </Button>
        <span className="text-xs text-muted">Workspace</span>
        <span className="text-muted/50">/</span>
        <span className="text-xs font-medium text-subtle">{item?.label ?? "Luna Vault"}</span>
      </div>
      <Button variant="outline" className="h-8 w-8 px-0 sm:w-48 sm:justify-start sm:px-2.5" aria-label="Search">
        <Search className="size-3.5" />
        <span className="hidden flex-1 text-left text-xs font-normal text-muted sm:inline">Search vault</span>
        <kbd className="hidden text-[10px] text-muted sm:inline">⌘K</kbd>
      </Button>
    </header>
  );
}
