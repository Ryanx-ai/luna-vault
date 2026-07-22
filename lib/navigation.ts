import {
  Activity,
  Archive,
  Boxes,
  FolderOpen,
  Gauge,
  Package,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Overview", href: "/overview", icon: Gauge },
  { label: "Brands", href: "/brands", icon: Boxes },
  { label: "Collections", href: "/collections", icon: FolderOpen },
  { label: "Packages", href: "/packages", icon: Package },
  { label: "Activity", href: "/activity", icon: Activity },
];

export const utilityNavigation: NavigationItem[] = [
  { label: "Archive", href: "/archive", icon: Archive },
  { label: "Settings", href: "/settings", icon: Settings },
];
