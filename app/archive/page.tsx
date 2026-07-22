import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Archive" };
export default function ArchivePage() {
  return (
    <PageScaffold
      eyebrow="Shelved identities"
      title="Archive"
      description="Discontinued Sub-brands, retired campaigns, and superseded Brand systems preserved with context."
      emptyTitle="No Brands are archived"
      emptyDescription="Archived Brands and campaigns will appear here with their history and context."
    />
  );
}
