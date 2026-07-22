import { PageScaffold } from "@/components/layout/page-scaffold";

export const metadata = { title: "Timeline" };

export default function TimelinePage() {
  return (
    <PageScaffold
      eyebrow="Brand history"
      title="Timeline"
      description="The chronological history of this Vault and its Brand Family."
      emptyTitle="No major Brand changes yet"
      emptyDescription="Brand creation, identity updates, Asset approvals, releases, deliveries, and archive events will appear here."
    />
  );
}
