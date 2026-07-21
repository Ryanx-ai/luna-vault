import { PageScaffold } from "@/components/layout/page-scaffold";

export const metadata = { title: "Packages" };

export default function PackagesPage() {
  return <PageScaffold eyebrow="Development delivery" title="Packages" description="Prepared Brand asset bundles for technical teams and implementation handover." emptyTitle="No Packages prepared" emptyDescription="Future Packages will organise approved, consistently named files and implementation notes for a specific delivery." />;
}
