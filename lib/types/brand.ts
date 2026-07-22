import type { PersonSummary } from "@/lib/types/workspace";

export type BrandType = "Parent Brand" | "Independent Brand" | "Product" | "Sub-brand" | "Nested Sub-brand" | "Event" | "Campaign" | "Internal Initiative";
export type BrandLifecycleStatus = "Active" | "Draft" | "In Review" | "Archived";
export type InheritanceState = "Inherited" | "Overridden" | "Unique" | "Not Configured";
export type IdentityRuleName = "Logo" | "Colour" | "Typography";

export type BrandCollaborator = PersonSummary & {
  role?: string;
};

export type IdentityRule = {
  name: IdentityRuleName;
  state: InheritanceState;
  sourceBrandId?: string;
  note: string;
};

export type Brand = {
  id: string;
  vaultId: string;
  name: string;
  slug: string;
  description: string;
  type: BrandType;
  status: BrandLifecycleStatus;
  parentBrandId?: string;
  owner: PersonSummary;
  collaborators: BrandCollaborator[];
  createdAt: string;
  updatedAt: string;
  assetCount: number;
  approvedAssetCount: number;
  inReviewAssetCount: number;
  collectionCount: number;
  guideCompletion: number;
  mark: string;
  presentationToken: string;
  identityRules: IdentityRule[];
  childBrandIds: string[];
};

export type CreateBrandInput = {
  vaultId: string;
  name: string;
  mode: "sub-brand" | "independent";
  parentBrandId?: string;
  inheritParentIdentity: boolean;
};
