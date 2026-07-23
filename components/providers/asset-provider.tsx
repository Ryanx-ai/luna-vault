"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Asset, AssetCategory, AssetStatus, CreateAssetInput } from "@/lib/types/asset";

type AssetContextValue = {
  assets: Asset[];
  addAssets: (inputs: CreateAssetInput[]) => Asset[];
  togglePinned: (id: string) => void;
  updateAssets: (ids: string[], changes: Partial<Pick<Asset, "category" | "status" | "tags" | "pinned">>) => void;
  deleteAssets: (ids: string[]) => void;
};

const AssetContext = createContext<AssetContextValue | null>(null);
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function AssetProvider({ initialAssets, children }: { initialAssets: Asset[]; children: React.ReactNode }) {
  const [assets, setAssets] = useState(initialAssets);
  const objectUrls = useRef(new Set<string>());
  useEffect(() => () => { objectUrls.current.forEach((url) => URL.revokeObjectURL(url)); objectUrls.current.clear(); }, []);
  const addAssets = (inputs: CreateAssetInput[]) => {
    const now = new Date().toISOString();
    const created = inputs.map((input, index): Asset => ({ ...input, id: `asset_session_${Date.now()}_${index}`, slug: `${slugify(input.name)}-${Date.now()}-${index}`, pinned: false, createdAt: now, updatedAt: now, uploadedBy: { name: "Ryan Chin", initials: "RC" }, version: "v1", description: input.description }));
    created.forEach((asset) => { if (asset.thumbnail?.startsWith("blob:")) objectUrls.current.add(asset.thumbnail); });
    setAssets((current) => [...created, ...current]);
    return created;
  };
  const togglePinned = (id: string) => setAssets((current) => current.map((asset) => asset.id === id ? { ...asset, pinned: !asset.pinned } : asset));
  const updateAssets = (ids: string[], changes: Partial<Pick<Asset, "category" | "status" | "tags" | "pinned">>) => setAssets((current) => current.map((asset) => ids.includes(asset.id) ? { ...asset, ...changes, updatedAt: new Date().toISOString() } : asset));
  const deleteAssets = (ids: string[]) => setAssets((current) => current.filter((asset) => !ids.includes(asset.id)));
  const value = useMemo(() => ({ assets, addAssets, togglePinned, updateAssets, deleteAssets }), [assets]);
  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
}

export function useAssets() {
  const context = useContext(AssetContext);
  if (!context) throw new Error("useAssets must be used within AssetProvider");
  return context;
}
