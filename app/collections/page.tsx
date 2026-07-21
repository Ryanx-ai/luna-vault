import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Collections" };
export default function CollectionsPage() {
  return (
    <PageScaffold
      eyebrow="External handover"
      title="Collections"
      description="Curated groups of approved Brand assets for clients, vendors, press, campaigns, and partners."
      emptyTitle="No Collections prepared"
      emptyDescription="Collections will provide controlled access to the right approved assets without exposing the wider Brand system."
    />
  );
}
