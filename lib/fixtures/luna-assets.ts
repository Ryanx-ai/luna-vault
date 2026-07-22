import type { Asset, AssetCategory, AssetFileType, AssetStatus } from "@/lib/types/asset";

const ryan = { name: "Ryan Chin", initials: "RC" };
const base = (id: string, name: string, originalFilename: string, category: AssetCategory, fileType: AssetFileType, status: AssetStatus, updatedAt: string, extra: Partial<Asset> = {}): Asset => ({
  id, vaultId: "vault_kuro", brandId: "brand_kuro", name, originalFilename, slug: id.replace("asset_kuro_", ""), fileType,
  mimeType: fileType === "Video" ? "video/mp4" : originalFilename.endsWith(".svg") ? "image/svg+xml" : "image/png",
  extension: originalFilename.split(".").pop()?.toUpperCase() ?? "FILE", category, tags: ["kuro", category.toLowerCase().replaceAll(" ", "-")], status,
  pinned: false, createdAt: updatedAt, updatedAt, uploadedBy: ryan, version: "v1", thumbnail: fileType === "Image" ? "/brand/luna-logomark.png" : undefined, ...extra,
});

export const assetFixtures: Asset[] = [
  base("asset_kuro_primary", "Primary Kuro Logo", "kuro-logo-primary.svg", "Logos", "Image", "Approved", "2026-07-22T15:20:00+08:00", { pinned: true, width: 1600, height: 480, sizeBytes: 48200, description: "Primary logo for standard Brand applications.", usageNotes: "Use where space allows the full lockup." }),
  base("asset_kuro_wordmark", "Kuro Wordmark", "kuro-wordmark.svg", "Logos", "Image", "Approved", "2026-07-22T14:40:00+08:00", { width: 1400, height: 320, sizeBytes: 31100 }),
  base("asset_kuro_symbol", "Kuro Symbol", "kuro-symbol.svg", "Logos", "Image", "Approved", "2026-07-22T13:15:00+08:00", { pinned: true, width: 800, height: 800, sizeBytes: 22600 }),
  base("asset_kuro_app", "Kuro App Icon", "kuro-app-icon.png", "Icons", "Image", "In Review", "2026-07-21T18:30:00+08:00", { width: 1024, height: 1024, sizeBytes: 186400 }),
  base("asset_kuro_pattern", "Dark Background Pattern", "kuro-pattern-dark.svg", "Patterns", "Image", "Approved", "2026-07-21T16:10:00+08:00", { width: 1920, height: 1080, sizeBytes: 74300 }),
  base("asset_kuro_campaign", "Campaign Poster", "kuro-launch-poster.png", "Campaign Graphics", "Image", "Draft", "2026-07-20T17:45:00+08:00", { width: 2400, height: 3000, sizeBytes: 2400000 }),
  base("asset_kuro_social", "Social Profile Image", "kuro-social-profile.png", "Social Assets", "Image", "Approved", "2026-07-20T12:25:00+08:00", { width: 1080, height: 1080, sizeBytes: 428000 }),
  base("asset_kuro_photo", "Product Photography", "kuro-product-01.png", "Photography", "Image", "Approved", "2026-07-19T15:05:00+08:00", { width: 3200, height: 2133, sizeBytes: 3800000 }),
  base("asset_kuro_icons", "Icon Set", "kuro-icon-set.svg", "Icons", "Image", "In Review", "2026-07-18T11:35:00+08:00", { sizeBytes: 92500 }),
  base("asset_kuro_motion", "Motion Logo Preview", "kuro-logo-motion.mp4", "Motion", "Video", "Draft", "2026-07-17T09:20:00+08:00", { duration: 8, sizeBytes: 6200000 }),
];
