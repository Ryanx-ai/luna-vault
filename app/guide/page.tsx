import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Guide" };
export default function GuidePage() {
  return (
    <PageScaffold
      eyebrow="Living documentation"
      title="Guide"
      description="Generated documentation that references each Brand’s authoritative Identity System."
      emptyTitle="Authored guidance is waiting"
      emptyDescription="Brand story, mission, vision, voice, usage guidance, examples, and additional documentation will live here without duplicating Logo, Colour, Typography, or Graphic Assets."
    />
  );
}
