"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Brand, CreateBrandInput, IdentityRuleName } from "@/lib/types/brand";

type BrandContextValue = {
  brands: Brand[];
  createBrand: (input: CreateBrandInput) => Brand;
};

const BrandContext = createContext<BrandContextValue | null>(null);
const identityRuleNames: IdentityRuleName[] = ["Logo", "Colour", "Typography"];

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "new-brand";
}

export function BrandProvider({ initialBrands, children }: { initialBrands: Brand[]; children: React.ReactNode }) {
  const [brands, setBrands] = useState(initialBrands);

  const createBrand = (input: CreateBrandInput) => {
    const baseSlug = slugify(input.name);
    const matchingSlugs = brands.filter((brand) => brand.slug === baseSlug || brand.slug.startsWith(`${baseSlug}-`)).length;
    const slug = matchingSlugs === 0 ? baseSlug : `${baseSlug}-${matchingSlugs + 1}`;
    const parentBrand = brands.find((candidate) => candidate.id === input.parentBrandId);
    const brand: Brand = {
      id: `brand_session_${brands.length + 1}`,
      vaultId: input.vaultId,
      name: input.name.trim(),
      slug,
      description: input.description?.trim() ?? "",
      type: parentBrand?.parentBrandId ? "Nested Sub-brand" : "Sub-brand",
      status: "Draft",
      parentBrandId: input.parentBrandId,
      owner: input.owner ?? { name: "Unassigned", initials: "—" },
      collaborators: [],
      createdAt: "2026-07-21T12:00:00+08:00",
      updatedAt: "2026-07-21T12:00:00+08:00",
      assetCount: 0,
      approvedAssetCount: 0,
      inReviewAssetCount: 0,
      collectionCount: 0,
      guideCompletion: 0,
      mark: "/brand/luna-logomark.png",
      presentationToken: "graphite",
      identityRules: identityRuleNames.map((name) => ({
        name,
        state: input.inheritanceStartingPoint === "inherit" ? "Inherited" : "Not Configured",
        sourceBrandId: input.inheritanceStartingPoint === "inherit" ? input.parentBrandId : undefined,
        note: input.inheritanceStartingPoint === "inherit" && input.parentBrandId ? "Starts with the parent Brand rule." : "No rule has been established yet.",
      })),
      childBrandIds: [],
    };

    setBrands((current) => current.map((item) => item.id === input.parentBrandId ? { ...item, childBrandIds: [...item.childBrandIds, brand.id] } : item).concat(brand));
    return brand;
  };

  const value = useMemo(() => ({ brands, createBrand }), [brands]);
  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrands() {
  const context = useContext(BrandContext);
  if (!context) throw new Error("useBrands must be used within BrandProvider");
  return context;
}
