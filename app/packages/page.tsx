import { PageScaffold } from "@/components/layout/page-scaffold";

export const metadata = { title: "Packages" };

export default function PackagesPage() {
  return <PageScaffold eyebrow="Development delivery" title="Packages" description="Prepared Brand asset bundles for technical teams and production handover." emptyTitle="No Packages prepared" emptyDescription="Packages bring together approved, consistently named files and notes for a specific delivery." />;
}
