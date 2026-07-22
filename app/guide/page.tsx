import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Guide" };
export default function GuidePage() {
  return (
    <PageScaffold
      eyebrow="Brand documentation"
      title="Brand Guides"
      description="Each Brand Guide brings together identity, usage guidance, examples, and documentation."
      emptyTitle="Open a Brand to view its Guide"
      emptyDescription="Choose a Brand from the Brands page to open its Guide."
    />
  );
}
