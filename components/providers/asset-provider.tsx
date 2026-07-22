"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Asset, AssetCategory, AssetStatus, CreateAssetInput } from "@/lib/types/asset";

type AssetContextValue = {
  assets: Asset[];
  addAssets: (inputs: CreateAssetInput[]) => Asset[];
  togglePinned: (id: string) => void;
  updateAssets: (ids: string[], changes: Partial<Pick<Asset, "category" | "status" | "tags" | "pinned">>) => void;
};

const AssetContext = createContext<AssetContextValue | null>(null);
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function AssetProvider({ initialAssets, children }: { initialAssets: Asset[]; children: React.ReactNode }) {
  const [assets, setAssets] = useState(initialAssets);
  const addAssets = (inputs: CreateAssetInput[]) => {
    const now = new Date().toISOString();
    const created = inputs.map((input, index): Asset => ({ ...input, id: `asset_session_${Date.now()}_${index}`, slug: `${slugify(input.name)}-${Date.now()}-${index}`, pinned: false, createdAt: now, updatedAt: now, uploadedBy: { name: "Ryan Chin", initials: "RC" }, version: "v1", description: input.description }));
    setAssets((current) => [...created, ...current]);
    return created;
  };
  const togglePinned = (id: string) => setAssets((current) => current.map((asset) => asset.id === id ? { ...asset, pinned: !asset.pinned } : asset));
  const updateAssets = (ids: string[], changes: Partial<Pick<Asset, "category" | "status" | "tags" | "pinned">>) => setAssets((current) => current.map((asset) => ids.includes(asset.id) ? { ...asset, ...changes, updatedAt: new Date().toISOString() } : asset));
  const value = useMemo(() => ({ assets, addAssets, togglePinned, updateAssets }), [assets]);
  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
}

export function useAssets() {
  const context = useContext(AssetContext);
  if (!context) throw new Error("useAssets must be used within AssetProvider");
  return context;
}
