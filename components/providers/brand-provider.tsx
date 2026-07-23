"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Brand, CreateBrandInput, IdentityRuleName } from "@/lib/types/brand";

type BrandContextValue = {
  brands: Brand[];
  createBrand: (input: CreateBrandInput) => Brand;
  canMoveBrand: (brandId: string, parentBrandId?: string) => { ok: boolean; message?: string };
  moveBrand: (brandId: string, parentBrandId?: string) => { ok: boolean; message?: string };
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
      description: "",
      type: input.mode === "independent" ? "Independent Brand" : parentBrand?.parentBrandId ? "Nested Sub-brand" : "Sub-brand",
      status: "Draft",
      parentBrandId: input.mode === "sub-brand" ? input.parentBrandId : undefined,
      owner: { name: "Ryan Chin", initials: "RC" },
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
      identityRules: identityRuleNames.map((name) => {
        const inherited = input.mode === "sub-brand" && input.inheritParentIdentity && name !== "Logo";
        return {
          name,
          state: inherited ? "Inherited" : "Not Configured",
          sourceBrandId: inherited ? input.parentBrandId : undefined,
          note: inherited ? "Uses the parent Brand settings." : name === "Logo" ? "No logos added yet." : name === "Colour" ? "No colours added yet." : "No typefaces added yet.",
        };
      }),
      childBrandIds: [],
    };

    setBrands((current) => current.map((item) => input.parentBrandId && item.id === input.parentBrandId ? { ...item, childBrandIds: [...item.childBrandIds, brand.id] } : item).concat(brand));
    return brand;
  };

  const canMoveBrand = (brandId: string, parentBrandId?: string) => validateMove(brands, brandId, parentBrandId);
  const moveBrand = (brandId: string, parentBrandId?: string) => {
    const result = validateMove(brands, brandId, parentBrandId);
    if (!result.ok) return result;
    setBrands((current) => current.map((item) => {
      if (item.id === brandId) {
        const parent = current.find((candidate) => candidate.id === parentBrandId);
        const type = !parentBrandId ? "Independent Brand" : parent?.parentBrandId ? "Nested Sub-brand" : "Sub-brand";
        return { ...item, parentBrandId, type };
      }
      if (item.childBrandIds.includes(brandId)) return { ...item, childBrandIds: item.childBrandIds.filter((id) => id !== brandId) };
      if (parentBrandId && item.id === parentBrandId) return { ...item, childBrandIds: [...new Set([...item.childBrandIds, brandId])] };
      return item;
    }));
    return { ok: true };
  };

  const value = useMemo(() => ({ brands, createBrand, canMoveBrand, moveBrand }), [brands]);
  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

function validateMove(brands: Brand[], brandId: string, parentBrandId?: string) {
  const brand = brands.find((item) => item.id === brandId);
  if (!brand) return { ok: false, message: "Brand not found." };
  if (brand.type === "Parent Brand") return { ok: false, message: "The Vault Parent Brand cannot be moved." };
  if (!parentBrandId) return { ok: true };
  const parent = brands.find((item) => item.id === parentBrandId);
  if (!parent || parent.vaultId !== brand.vaultId) return { ok: false, message: "Choose a Brand in the same Vault." };
  if (parentBrandId === brandId) return { ok: false, message: "A Brand cannot be its own parent." };
  const descendants = new Set<string>();
  const collect = (id: string) => brands.filter((item) => item.parentBrandId === id).forEach((child) => { descendants.add(child.id); collect(child.id); });
  collect(brandId);
  if (descendants.has(parentBrandId)) return { ok: false, message: "A Brand cannot move beneath one of its descendants." };
  const depth = (item: Brand) => { let value = 1; let parentId = item.parentBrandId; while (parentId) { value += 1; parentId = brands.find((candidate) => candidate.id === parentId)?.parentBrandId; } return value; };
  const subtreeHeight = (id: string): number => 1 + Math.max(0, ...brands.filter((item) => item.parentBrandId === id).map((child) => subtreeHeight(child.id)));
  if (depth(parent) + subtreeHeight(brandId) > 3) return { ok: false, message: "This move would exceed the three-level Brand hierarchy." };
  return { ok: true };
}

export function useBrands() {
  const context = useContext(BrandContext);
  if (!context) throw new Error("useBrands must be used within BrandProvider");
  return context;
}
