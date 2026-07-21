import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Assets" };
export default function AssetsPage() {
  return (
    <PageScaffold
      eyebrow="Brand context"
      title="Assets"
      description="Assets belong to the Brand they document and support. This direct route is preserved while Brand-scoped asset workflows are developed."
      emptyTitle="Open a Brand to manage its assets"
      emptyDescription="Approved logos, marks, icons, templates, and campaign files will be organised within their Brand context."
    />
  );
}
