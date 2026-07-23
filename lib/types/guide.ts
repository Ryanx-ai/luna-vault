export type GuideSectionType = "cover" | "brand-introduction" | "logo-rationale" | "logo-variants" | "lockups" | "motifs-patterns" | "usage-examples" | "typography" | "typography-hierarchy" | "colour-overview" | "colour-hierarchy" | "light-usage" | "dark-usage" | "notes";

export type GuideSection = {
  id: string;
  type: GuideSectionType;
  title: string;
  copy: string;
  source: "brand" | "identity" | "assets" | "authored";
  tone?: "default" | "visual" | "colour-led";
};
