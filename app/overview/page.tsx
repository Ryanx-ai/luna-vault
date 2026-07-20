import { PageScaffold } from "@/components/layout/page-scaffold";

export const metadata = { title: "Overview" };

export default function OverviewPage() {
  return <PageScaffold eyebrow="Command centre" title="Your brand infrastructure, at a glance." description="A structured view of the brands, assets, guidance, and activity that make up your vault." emptyTitle="Your vault is ready for its first brand" emptyDescription="The overview will become the operational pulse of every identity managed in Luna Vault." />;
}
