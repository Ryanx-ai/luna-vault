import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Assets" };
export default function AssetsPage() {
  return (
    <PageScaffold
      eyebrow="Brand assets"
      title="Assets"
      description="Find approved logos, marks, icons, templates, and campaign files within each Brand."
      emptyTitle="Open a Brand to manage its assets"
      emptyDescription="Choose a Brand from the Brands page to view its asset library."
    />
  );
}
