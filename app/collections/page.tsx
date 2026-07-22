import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Collections" };
export default function CollectionsPage() {
  return (
    <PageScaffold
      eyebrow="External handover"
      title="Collections"
      description="Curated groups of approved Brand assets for clients, vendors, press, campaigns, and partners."
      emptyTitle="No Collections prepared"
      emptyDescription="Create a Collection when you are ready to share a focused set of approved assets."
    />
  );
}
