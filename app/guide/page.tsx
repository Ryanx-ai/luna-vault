import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Guide" };
export default function GuidePage() {
  return (
    <PageScaffold
      eyebrow="Living documentation"
      title="Guide"
      description="A living Brand document connected directly to approved assets and identity rules."
      emptyTitle="The Guide is waiting to be structured"
      emptyDescription="Future authorised editors will shape a polished, partially templated reference without duplicating Brand assets."
    />
  );
}
