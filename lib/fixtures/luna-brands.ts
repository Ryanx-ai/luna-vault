import type { Brand, IdentityRule, IdentityRuleName, InheritanceState } from "@/lib/types/brand";

const ryan = { name: "Ryan Chin", initials: "RC" } as const;
const lunaTeam = { name: "Luna team", initials: "LT" } as const;
const mei = { name: "Mei Tan", initials: "MT" } as const;

const ruleNames: IdentityRuleName[] = ["Logo", "Colour", "Typography"];

function rules(states: Record<IdentityRuleName, InheritanceState>, notes: Partial<Record<IdentityRuleName, string>> = {}): IdentityRule[] {
  return ruleNames.map((name) => ({
    name,
    state: states[name],
    sourceBrandId: states[name] === "Inherited" ? "brand_luna" : undefined,
    note: notes[name] ?? (states[name] === "Inherited" ? "Uses the parent Brand settings." : states[name] === "Overridden" ? "Uses settings created for this Brand." : states[name] === "Unique" ? "Defined specifically for this Brand." : name === "Logo" ? "No logos added yet." : name === "Colour" ? "No colours added yet." : "No typefaces added yet."),
  }));
}

const inherited: Record<IdentityRuleName, InheritanceState> = {
  Logo: "Overridden",
  Colour: "Inherited",
  Typography: "Inherited",
};

export const lunaBrandFixtures: Brand[] = [
  {
    id: "brand_luna", vaultId: "vault_luna", name: "Luna", slug: "luna", description: "Primary identity and shared system for the Luna family.", type: "Parent Brand", status: "Active", owner: ryan,
    collaborators: [{ ...mei, role: "Brand operator" }, { ...lunaTeam, role: "Design team" }], createdAt: "2024-01-12T10:00:00+08:00", updatedAt: "2026-07-20T14:20:00+08:00",
    assetCount: 18, approvedAssetCount: 15, inReviewAssetCount: 2, collectionCount: 3, guideCompletion: 92, mark: "/brand/luna-logomark.png", presentationToken: "violet",
    identityRules: rules({ Logo: "Unique", Colour: "Unique", Typography: "Unique" }, { Logo: "Primary Luna logo.", Colour: "Defines the shared Luna palette.", Typography: "Defines the family typography system." }),
    childBrandIds: ["brand_vault", "brand_cloud", "brand_studio", "brand_ai", "brand_api", "brand_runtime"],
  },
  {
    id: "brand_studio", vaultId: "vault_luna", name: "Luna Studio", slug: "luna-studio", description: "Brand creation", type: "Product", status: "Active", parentBrandId: "brand_luna", owner: ryan,
    collaborators: [{ ...mei, role: "Designer" }], createdAt: "2024-03-08T09:00:00+08:00", updatedAt: "2026-07-19T17:10:00+08:00",
    assetCount: 9, approvedAssetCount: 7, inReviewAssetCount: 1, collectionCount: 1, guideCompletion: 78, mark: "/brand/luna-logomark.png", presentationToken: "slate", identityRules: rules(inherited), childBrandIds: [],
  },
  {
    id: "brand_vault", vaultId: "vault_luna", name: "Luna Vault", slug: "luna-vault", description: "Brand memory", type: "Product", status: "Beta", parentBrandId: "brand_luna", owner: lunaTeam,
    collaborators: [{ ...ryan, role: "Product owner" }, { ...mei, role: "Brand operator" }], createdAt: "2025-11-18T11:00:00+08:00", updatedAt: "2026-07-20T15:40:00+08:00",
    assetCount: 11, approvedAssetCount: 6, inReviewAssetCount: 3, collectionCount: 2, guideCompletion: 64, mark: "/brand/luna-logomark.png", presentationToken: "violet", identityRules: rules(inherited), childBrandIds: [],
  },
  ...[
    { id: "brand_cloud", name: "Luna Cloud", slug: "luna-cloud", description: "Brand distribution", status: "Concept" as const },
    { id: "brand_ai", name: "Luna AI", slug: "luna-ai", description: "Brand intelligence", status: "Planned" as const },
    { id: "brand_api", name: "Luna API", slug: "luna-api", description: "Brand infrastructure", status: "Concept" as const },
    { id: "brand_runtime", name: "Luna Runtime", slug: "luna-runtime", description: "Brand-native computing", status: "Planned" as const },
  ].map((item): Brand => ({
    ...item, vaultId: "vault_luna", type: "Product", parentBrandId: "brand_luna", owner: ryan, collaborators: [],
    createdAt: "2026-07-23T09:00:00+08:00", updatedAt: "2026-07-23T09:00:00+08:00", assetCount: 0, approvedAssetCount: 0,
    inReviewAssetCount: 0, collectionCount: 0, guideCompletion: 0, mark: "/brand/luna-logomark.png", presentationToken: "graphite",
    identityRules: rules({ Logo: "Not Configured", Colour: "Inherited", Typography: "Inherited" }), childBrandIds: [],
  })),
  ...[
    { id: "brand_kuro", vaultId: "vault_kuro", name: "Kuro", slug: "kuro" },
    { id: "brand_pangea", vaultId: "vault_pangea", name: "Pangea", slug: "pangea" },
    { id: "brand_tethr", vaultId: "vault_tethr", name: "Tethr", slug: "tethr" },
  ].map(({ id, vaultId, name, slug }): Brand => ({
    id, vaultId, name, slug, description: "", type: "Parent Brand", status: "Draft", owner: ryan,
    collaborators: [], createdAt: "2026-07-22T09:00:00+08:00", updatedAt: "2026-07-22T09:00:00+08:00", assetCount: 0, approvedAssetCount: 0,
    inReviewAssetCount: 0, collectionCount: 0, guideCompletion: 0, mark: "/brand/luna-logomark.png", presentationToken: "graphite",
    identityRules: rules({ Logo: "Not Configured", Colour: "Not Configured", Typography: "Not Configured" }), childBrandIds: [],
  })),
];
