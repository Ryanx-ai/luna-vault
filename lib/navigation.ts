import {
  Archive,
  Boxes,
  Cloud,
  Code2,
  FolderOpen,
  GitBranch,
  Package,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { SHOW_VISION_SURFACES } from "@/lib/config/features";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  beta?: boolean;
  quiet?: boolean;
};

const coreNavigation: NavigationItem[] = [
  { label: "Brands", href: "/brands", icon: Boxes },
  { label: "Collections", href: "/collections", icon: FolderOpen },
  { label: "Packages", href: "/packages", icon: Package },
  { label: "Timeline", href: "/timeline", icon: GitBranch },
];

const visionNavigation: NavigationItem[] = [
  { label: "Cloud", href: "/cloud", icon: Cloud, beta: true, quiet: true },
  { label: "API", href: "/api", icon: Code2, beta: true, quiet: true },
];

export const primaryNavigation: NavigationItem[] = SHOW_VISION_SURFACES ? [...coreNavigation, ...visionNavigation] : coreNavigation;

export const utilityNavigation: NavigationItem[] = [
  { label: "Archive", href: "/archive", icon: Archive },
  { label: "Settings", href: "/settings", icon: Settings },
];
