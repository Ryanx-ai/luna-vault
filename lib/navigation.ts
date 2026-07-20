import {
  Activity,
  Archive,
  BookOpen,
  Boxes,
  FolderOpen,
  Gauge,
  Image,
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
  { label: "Assets", href: "/assets", icon: Image },
  { label: "Brands", href: "/brands", icon: Boxes },
  { label: "Collections", href: "/collections", icon: FolderOpen },
  { label: "Guide", href: "/guide", icon: BookOpen },
  { label: "Activity", href: "/activity", icon: Activity },
];

export const utilityNavigation: NavigationItem[] = [
  { label: "Archive", href: "/archive", icon: Archive },
  { label: "Settings", href: "/settings", icon: Settings },
];
