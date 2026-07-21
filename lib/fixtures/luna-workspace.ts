import type { NotificationSummary, UserProfile, VaultSummary, WorkspaceOverview } from "@/lib/types/workspace";

const ryan = { name: "Ryan Chin", initials: "RC" } as const;
const lunaTeam = { name: "Luna team", initials: "LT" } as const;
const mei = { name: "Mei Tan", initials: "MT" } as const;

export const lunaWorkspaceFixture: WorkspaceOverview = {
  workspace: {
    id: "workspace_luna",
    name: "Luna",
    description: "The working source of truth for the Luna brand family.",
    logo: "/brand/luna-logomark.png",
    plan: "Foundation",
    memberCount: 8,
    brandCount: 5,
    assetCount: 48,
    updatedAt: "2026-07-20T15:40:00+08:00",
  },
  metrics: [
    { label: "Total assets", value: 48, supportingText: "Across 5 brands", status: "neutral" },
    { label: "Approved", value: 32, supportingText: "67% of the library", status: "positive" },
    { label: "In review", value: 5, supportingText: "Awaiting a decision", status: "attention" },
    { label: "Brands", value: 5, supportingText: "1 parent · 4 sub-brands", status: "neutral" },
    { label: "Collections", value: 7, supportingText: "3 shared externally", status: "neutral" },
  ],
  brands: [
    { id: "brand_luna", name: "Luna", slug: "luna", description: "Parent identity system", mark: "/brand/luna-logomark.png", type: "parent", assetCount: 18, approvedAssetCount: 15, collectionCount: 3, updatedAt: "2026-07-20T14:20:00+08:00", owner: ryan, status: "active" },
    { id: "brand_studio", name: "Luna Studio", slug: "luna-studio", description: "Creative practice", mark: "/brand/luna-logomark.png", type: "sub-brand", parentBrandId: "brand_luna", assetCount: 9, approvedAssetCount: 7, collectionCount: 1, updatedAt: "2026-07-19T17:10:00+08:00", owner: ryan, status: "active" },
    { id: "brand_vault", name: "Luna Vault", slug: "luna-vault", description: "Brand infrastructure product", mark: "/brand/luna-logomark.png", type: "sub-brand", parentBrandId: "brand_luna", assetCount: 11, approvedAssetCount: 6, collectionCount: 2, updatedAt: "2026-07-20T15:40:00+08:00", owner: lunaTeam, status: "active" },
    { id: "brand_labs", name: "Luna Labs", slug: "luna-labs", description: "Experimental initiatives", mark: "/brand/luna-logomark.png", type: "sub-brand", parentBrandId: "brand_luna", assetCount: 6, approvedAssetCount: 3, collectionCount: 0, updatedAt: "2026-07-17T11:30:00+08:00", owner: mei, status: "draft" },
    { id: "brand_events", name: "Luna Events", slug: "luna-events", description: "Events and community", mark: "/brand/luna-logomark.png", type: "sub-brand", parentBrandId: "brand_luna", assetCount: 4, approvedAssetCount: 1, collectionCount: 1, updatedAt: "2026-07-18T09:15:00+08:00", owner: mei, status: "in-review" },
  ],
  recentAssets: [
    { id: "asset_vault_lockup", name: "Luna Vault Lockup", category: "Logo", format: "SVG", status: "in-review", version: "v1", brandId: "brand_vault", updatedAt: "2026-07-20T15:40:00+08:00", owner: ryan, previewType: "logo" },
    { id: "asset_primary_logo", name: "Primary Logo", category: "Logo", format: "SVG", status: "approved", version: "v3", brandId: "brand_luna", updatedAt: "2026-07-20T14:20:00+08:00", owner: ryan, previewType: "logo" },
    { id: "asset_logomark", name: "Luna Logomark", category: "Mark", format: "SVG", status: "approved", version: "v2", brandId: "brand_luna", updatedAt: "2026-07-19T16:45:00+08:00", owner: ryan, previewType: "mark" },
    { id: "asset_favicon", name: "Favicon", category: "Digital", format: "PNG", status: "approved", version: "v4", brandId: "brand_studio", updatedAt: "2026-07-19T11:05:00+08:00", owner: mei, previewType: "icon" },
    { id: "asset_app_icon", name: "App Icon", category: "Digital", format: "PNG", status: "in-review", version: "v2", brandId: "brand_vault", updatedAt: "2026-07-18T18:30:00+08:00", owner: lunaTeam, previewType: "icon" },
    { id: "asset_social", name: "Social Profile Image", category: "Social", format: "JPG", status: "approved", version: "v1", brandId: "brand_luna", updatedAt: "2026-07-18T13:20:00+08:00", owner: mei, previewType: "mark" },
    { id: "asset_pattern", name: "Brand Pattern", category: "Pattern", format: "SVG", status: "draft", version: "v1", brandId: "brand_labs", updatedAt: "2026-07-17T11:30:00+08:00", owner: mei, previewType: "pattern" },
    { id: "asset_presentation", name: "Presentation Cover", category: "Template", format: "PPTX", status: "draft", version: "v2", brandId: "brand_vault", updatedAt: "2026-07-16T14:10:00+08:00", owner: lunaTeam, previewType: "document" },
    { id: "asset_icons", name: "Product Icon Set", category: "Icons", format: "SVG", status: "in-review", version: "v1", brandId: "brand_vault", updatedAt: "2026-07-15T10:00:00+08:00", owner: ryan, previewType: "icon" },
    { id: "asset_press", name: "Press Logo Pack", category: "Press", format: "ZIP", status: "approved", version: "v2", brandId: "brand_luna", updatedAt: "2026-07-14T16:35:00+08:00", owner: ryan, previewType: "logo" },
  ],
  recentActivity: [
    { id: "activity_1", actor: ryan, action: "uploaded", subject: "Luna Vault Lockup v1", subjectType: "asset", timestamp: "2026-07-20T15:40:00+08:00", metadata: "Luna Vault" },
    { id: "activity_2", actor: mei, action: "approved", subject: "Primary Logo", subjectType: "asset", timestamp: "2026-07-20T14:20:00+08:00", metadata: "Luna" },
    { id: "activity_3", actor: ryan, action: "updated", subject: "Luna Studio favicon", subjectType: "asset", timestamp: "2026-07-19T11:05:00+08:00", metadata: "v4" },
    { id: "activity_4", actor: ryan, action: "shared", subject: "Core Logo Pack", subjectType: "collection", timestamp: "2026-07-18T16:25:00+08:00", metadata: "Client link" },
    { id: "activity_5", actor: mei, action: "created", subject: "Luna Events", subjectType: "brand", timestamp: "2026-07-18T09:15:00+08:00", metadata: "Sub-brand" },
    { id: "activity_6", actor: ryan, action: "archived", subject: "Outdated event lockup", subjectType: "asset", timestamp: "2026-07-17T15:50:00+08:00", metadata: "Superseded" },
  ],
  attentionItems: [
    { id: "attention_review", title: "5 assets awaiting review", description: "Three belong to Luna Vault and two to Luna Events.", kind: "review", href: "/assets" },
    { id: "attention_favicon", title: "Missing favicon format", description: "Luna Events has no approved 32 × 32 PNG.", kind: "missing", href: "/assets" },
    { id: "attention_template", title: "Presentation template is a draft", description: "The Luna Vault cover has not been approved.", kind: "draft", href: "/assets" },
    { id: "attention_lockup", title: "Outdated event lockup", description: "One archived lockup is still referenced by a collection.", kind: "outdated", href: "/collections" },
  ],
};

export const vaultFixtures: VaultSummary[] = [
  { id: "vault_luna", name: "Luna", description: "Luna brand family", collaboratorCount: 8, brandCount: 5, assetCount: 48, updatedAt: "2026-07-20T15:40:00+08:00", state: "active" },
  { id: "vault_kuro", name: "Kuro", description: "Early-stage brand environment", collaboratorCount: 3, brandCount: 0, assetCount: 0, updatedAt: "2026-07-12T10:00:00+08:00", state: "early-stage" },
  { id: "vault_pangea", name: "Pangea", description: "Early-stage brand environment", collaboratorCount: 4, brandCount: 0, assetCount: 0, updatedAt: "2026-07-08T14:30:00+08:00", state: "early-stage" },
  { id: "vault_tethr", name: "Tethr", description: "Early-stage brand environment", collaboratorCount: 2, brandCount: 0, assetCount: 0, updatedAt: "2026-07-03T09:15:00+08:00", state: "early-stage" },
];

export const notificationFixtures: NotificationSummary[] = [
  { id: "notification_approval", title: "Approval requested", description: "Mei Tan requested Ryan's approval for Luna Events Primary Logo.", timestamp: "2026-07-20T16:10:00+08:00", unread: true, kind: "approval" },
  { id: "notification_review", title: "Asset requires review", description: "Luna Vault App Icon v2 is waiting for review.", timestamp: "2026-07-20T13:30:00+08:00", unread: true, kind: "review" },
  { id: "notification_format", title: "Required format missing", description: "Luna Events has no approved 32 × 32 favicon.", timestamp: "2026-07-19T10:20:00+08:00", unread: true, kind: "missing" },
  { id: "notification_owner", title: "Owner decision pending", description: "Luna Labs Brand Pattern needs an assigned approver.", timestamp: "2026-07-18T15:05:00+08:00", unread: false, kind: "decision" },
];

export const userProfileFixture: UserProfile = {
  name: "Ryan Chin",
  initials: "RC",
  role: "Vault owner",
};
