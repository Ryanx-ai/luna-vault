export const brandCapabilities = [
  "view Brand",
  "upload Assets",
  "download Assets",
  "delete Assets",
  "configure Brand",
  "manage hierarchy",
  "manage collaborators",
  "manage permissions",
  "save Identity",
  "archive Brand",
] as const;

export type BrandCapability = (typeof brandCapabilities)[number];
export type BrandRole = "Owner" | "Co-owner" | "Editor" | "Contributor" | "Viewer";

export const futureBrandRoleCapabilities: Record<BrandRole, readonly BrandCapability[]> = {
  Owner: brandCapabilities,
  "Co-owner": brandCapabilities,
  Editor: ["view Brand", "upload Assets", "download Assets", "delete Assets", "configure Brand", "save Identity"],
  Contributor: ["view Brand", "upload Assets", "download Assets"],
  Viewer: ["view Brand", "download Assets"],
};
