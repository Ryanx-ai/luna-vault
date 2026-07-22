import { assetFixtures } from "@/lib/fixtures/luna-assets";
import type { Asset } from "@/lib/types/asset";

export async function getAssetsByBrand(brandId: string): Promise<Asset[]> {
  return assetFixtures.filter((asset) => asset.brandId === brandId);
}

export async function getAssets(): Promise<Asset[]> {
  return assetFixtures;
}
