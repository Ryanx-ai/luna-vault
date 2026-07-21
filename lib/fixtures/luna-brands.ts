import type { Brand, IdentityRule, IdentityRuleName, InheritanceState } from "@/lib/types/brand";

const ryan = { name: "Ryan Chin", initials: "RC" } as const;
const lunaTeam = { name: "Luna team", initials: "LT" } as const;
const mei = { name: "Mei Tan", initials: "MT" } as const;

const ruleNames: IdentityRuleName[] = ["Logo", "Colour", "Typography", "Graphic Assets"];

function rules(states: Record<IdentityRuleName, InheritanceState>, notes: Partial<Record<IdentityRuleName, string>> = {}): IdentityRule[] {
  return ruleNames.map((name) => ({
    name,
    state: states[name],
    sourceBrandId: states[name] === "Inherited" ? "brand_luna" : undefined,
    note: notes[name] ?? (states[name] === "Inherited" ? "Uses the shared parent system." : states[name] === "Overridden" ? "A Brand-specific decision replaces the parent rule." : states[name] === "Unique" ? "Defined specifically for this Brand." : "No identity source has been configured yet."),
  }));
}

const inherited: Record<IdentityRuleName, InheritanceState> = {
  Logo: "Overridden",
  Colour: "Inherited",
  Typography: "Inherited",
  "Graphic Assets": "Unique",
};

export const lunaBrandFixtures: Brand[] = [
  {
    id: "brand_luna", vaultId: "vault_luna", name: "Luna", slug: "luna", description: "Primary identity and shared system for the Luna family.", type: "Parent Brand", status: "Active", owner: ryan,
    collaborators: [{ ...mei, role: "Brand operator" }, { ...lunaTeam, role: "Design team" }], createdAt: "2024-01-12T10:00:00+08:00", updatedAt: "2026-07-20T14:20:00+08:00",
    assetCount: 18, approvedAssetCount: 15, inReviewAssetCount: 2, collectionCount: 3, guideCompletion: 92, mark: "/brand/luna-logomark.png", presentationToken: "violet",
    identityRules: rules({ Logo: "Unique", Colour: "Unique", Typography: "Unique", "Graphic Assets": "Unique" }, { Logo: "The primary Luna identity source.", Colour: "Defines the shared Luna palette.", Typography: "Defines the family typography system.", "Graphic Assets": "Defines the shared visual asset language." }),
    childBrandIds: ["brand_studio", "brand_vault", "brand_labs", "brand_events"],
  },
  {
    id: "brand_studio", vaultId: "vault_luna", name: "Luna Studio", slug: "luna-studio", description: "Creative practice for identity, product, and experience design.", type: "Product", status: "Active", parentBrandId: "brand_luna", owner: ryan,
    collaborators: [{ ...mei, role: "Designer" }], createdAt: "2024-03-08T09:00:00+08:00", updatedAt: "2026-07-19T17:10:00+08:00",
    assetCount: 9, approvedAssetCount: 7, inReviewAssetCount: 1, collectionCount: 1, guideCompletion: 78, mark: "/brand/luna-logomark.png", presentationToken: "slate", identityRules: rules(inherited), childBrandIds: [],
  },
  {
    id: "brand_vault", vaultId: "vault_luna", name: "Luna Vault", slug: "luna-vault", description: "Brand infrastructure product for living identity systems.", type: "Product", status: "Active", parentBrandId: "brand_luna", owner: lunaTeam,
    collaborators: [{ ...ryan, role: "Product owner" }, { ...mei, role: "Brand operator" }], createdAt: "2025-11-18T11:00:00+08:00", updatedAt: "2026-07-20T15:40:00+08:00",
    assetCount: 11, approvedAssetCount: 6, inReviewAssetCount: 3, collectionCount: 2, guideCompletion: 64, mark: "/brand/luna-logomark.png", presentationToken: "violet", identityRules: rules(inherited), childBrandIds: [],
  },
  {
    id: "brand_labs", vaultId: "vault_luna", name: "Luna Labs", slug: "luna-labs", description: "Internal initiative for experimental tools and new ideas.", type: "Internal Initiative", status: "Draft", parentBrandId: "brand_luna", owner: mei,
    collaborators: [{ ...ryan, role: "Sponsor" }], createdAt: "2026-02-06T10:30:00+08:00", updatedAt: "2026-07-17T11:30:00+08:00",
    assetCount: 6, approvedAssetCount: 3, inReviewAssetCount: 1, collectionCount: 0, guideCompletion: 35, mark: "/brand/luna-logomark.png", presentationToken: "graphite",
    identityRules: rules({ Logo: "Not Configured", Colour: "Inherited", Typography: "Inherited", "Graphic Assets": "Unique" }), childBrandIds: [],
  },
  {
    id: "brand_events", vaultId: "vault_luna", name: "Luna Events", slug: "luna-events", description: "Event identity system for community gatherings and launches.", type: "Event", status: "In Review", parentBrandId: "brand_luna", owner: mei,
    collaborators: [{ ...ryan, role: "Approver" }], createdAt: "2026-04-22T13:00:00+08:00", updatedAt: "2026-07-18T09:15:00+08:00",
    assetCount: 4, approvedAssetCount: 1, inReviewAssetCount: 2, collectionCount: 1, guideCompletion: 48, mark: "/brand/luna-logomark.png", presentationToken: "plum",
    identityRules: rules({ Logo: "Overridden", Colour: "Overridden", Typography: "Inherited", "Graphic Assets": "Unique" }), childBrandIds: [],
  },
  ...[
    { id: "brand_kuro", vaultId: "vault_kuro", name: "Kuro", slug: "kuro" },
    { id: "brand_pangea", vaultId: "vault_pangea", name: "Pangea", slug: "pangea" },
    { id: "brand_tethr", vaultId: "vault_tethr", name: "Tethr", slug: "tethr" },
  ].map(({ id, vaultId, name, slug }): Brand => ({
    id, vaultId, name, slug, description: `Automatic Parent Brand for the ${name} Vault.`, type: "Parent Brand", status: "Draft", owner: ryan,
    collaborators: [], createdAt: "2026-07-22T09:00:00+08:00", updatedAt: "2026-07-22T09:00:00+08:00", assetCount: 0, approvedAssetCount: 0,
    inReviewAssetCount: 0, collectionCount: 0, guideCompletion: 0, mark: "/brand/luna-logomark.png", presentationToken: "graphite",
    identityRules: rules({ Logo: "Not Configured", Colour: "Not Configured", Typography: "Not Configured", "Graphic Assets": "Not Configured" }), childBrandIds: [],
  })),
];
