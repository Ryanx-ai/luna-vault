import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Guide" };
export default function GuidePage() {
  return (
    <PageScaffold
      eyebrow="Compatibility route"
      title="Brand Guides"
      description="Guides now live inside each Brand workspace, where they can reference that Brand’s authoritative Identity and Assets."
      emptyTitle="Open a Brand to view its Guide"
      emptyDescription="This route remains available for compatibility, but Guide is no longer a workspace-level destination."
    />
  );
}
