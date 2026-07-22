import {
  Archive,
  Boxes,
  FolderOpen,
  GitBranch,
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
  { label: "Brands", href: "/brands", icon: Boxes },
  { label: "Collections", href: "/collections", icon: FolderOpen },
  { label: "Packages", href: "/packages", icon: Package },
  { label: "Timeline", href: "/timeline", icon: GitBranch },
];

export const utilityNavigation: NavigationItem[] = [
  { label: "Archive", href: "/archive", icon: Archive },
  { label: "Settings", href: "/settings", icon: Settings },
];
