import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Activity" };
export default function ActivityPage() {
  return (
    <PageScaffold
      eyebrow="Brand history"
      title="Activity"
      description="A chronological record of meaningful changes across Brands and their descendants."
      emptyTitle="No major Brand changes yet"
      emptyDescription="Future history will place the newest Brand creation, rebrand, rule change, approval, or archive event first."
    />
  );
}
