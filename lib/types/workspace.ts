export type BrandStatus = "active" | "in-review" | "draft";
export type AssetStatus = "approved" | "in-review" | "draft" | "archived";

export type PersonSummary = {
  name: string;
  initials: string;
};

export type Workspace = {
  id: string;
  name: string;
  description: string;
  logo: string;
  plan: string;
  memberCount: number;
  brandCount: number;
  assetCount: number;
  updatedAt: string;
};

export type BrandSummary = {
  id: string;
  name: string;
  slug: string;
  description: string;
  mark: string;
  type: "parent" | "sub-brand";
  parentBrandId?: string;
  assetCount: number;
  approvedAssetCount: number;
  collectionCount: number;
  updatedAt: string;
  owner: PersonSummary;
  status: BrandStatus;
};

export type AssetSummary = {
  id: string;
  name: string;
  category: string;
  format: string;
  status: AssetStatus;
  version: string;
  brandId: string;
  updatedAt: string;
  owner: PersonSummary;
  previewType: "logo" | "mark" | "icon" | "pattern" | "document";
};

export type ActivitySummary = {
  id: string;
  actor: PersonSummary;
  action: string;
  subject: string;
  subjectType: "asset" | "brand" | "collection";
  timestamp: string;
  metadata?: string;
};

export type WorkspaceMetric = {
  label: string;
  value: number;
  supportingText: string;
  status?: "neutral" | "positive" | "attention";
};

export type AttentionItem = {
  id: string;
  title: string;
  description: string;
  kind: "review" | "missing" | "draft" | "outdated";
  href: string;
};

export type WorkspaceOverview = {
  workspace: Workspace;
  metrics: WorkspaceMetric[];
  brands: BrandSummary[];
  recentAssets: AssetSummary[];
  recentActivity: ActivitySummary[];
  attentionItems: AttentionItem[];
};
