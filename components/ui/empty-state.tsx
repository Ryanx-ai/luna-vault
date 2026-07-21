import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  className,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-40 flex-col items-center justify-center border border-dashed px-6 py-10 text-center", className)}>
      <Icon className="mb-3 size-4 text-muted" aria-hidden="true" />
      <p className="text-sm font-medium text-subtle">{title}</p>
      <p className="mt-1 max-w-sm text-xs leading-5 text-muted">{description}</p>
    </div>
  );
}
