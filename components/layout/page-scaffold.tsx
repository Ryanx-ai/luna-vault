import { ArrowUpRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PageScaffoldProps = {
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
};

export function PageScaffold({ eyebrow, title, description, emptyTitle, emptyDescription }: PageScaffoldProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      <section className="flex flex-col gap-5 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{eyebrow}</p>
            <Badge>Foundation</Badge>
          </div>
          <h1 className="text-balance text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{description}</p>
        </div>
        <Button className="self-start sm:self-auto" disabled>
          <Plus className="size-4" />
          Create
        </Button>
      </section>

      <section className="py-6 sm:py-8">
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-dashed bg-panel/40 px-6 py-16 text-center sm:min-h-[400px]">
          <div className="mb-5 flex size-10 items-center justify-center rounded-lg border bg-elevated shadow-hairline">
            <ArrowUpRight className="size-4 text-subtle" />
          </div>
          <h2 className="text-sm font-medium text-foreground">{emptyTitle}</h2>
          <p className="mt-2 max-w-sm text-xs leading-5 text-muted">{emptyDescription}</p>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted/60">Coming in Phase 2</p>
        </div>
      </section>
    </div>
  );
}
