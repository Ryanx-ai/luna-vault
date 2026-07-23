import type { PersonSummary } from "@/lib/types/workspace";

export type AssetStatus = "Draft" | "In Review" | "Approved" | "Archived";
export type AssetFileType = "Image" | "Video" | "Audio" | "Font" | "Document" | "Archive" | "3D" | "Other";

export const defaultAssetCategories = [
  "Logos",
  "Illustrations",
  "Photography",
  "Campaign Graphics",
  "Social Assets",
  "Patterns",
  "Textures",
  "Icons",
  "Templates",
  "Motion",
  "Custom",
] as const;

export type DefaultAssetCategory = (typeof defaultAssetCategories)[number];
export type AssetCategory = DefaultAssetCategory | (string & {});

export type Asset = {
  id: string;
  vaultId: string;
  brandId: string;
  name: string;
  originalFilename: string;
  slug: string;
  fileType: AssetFileType;
  mimeType: string;
  extension: string;
  category: AssetCategory;
  tags: string[];
  status: AssetStatus;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  uploadedBy: PersonSummary;
  sizeBytes?: number;
  width?: number;
  height?: number;
  duration?: number;
  version?: string;
  sourceAssetId?: string;
  thumbnail?: string;
  description?: string;
  usageNotes?: string;
};

export type CreateAssetInput = Pick<Asset, "vaultId" | "brandId" | "name" | "originalFilename" | "fileType" | "mimeType" | "extension" | "category" | "tags" | "status"> & Partial<Pick<Asset, "sizeBytes" | "description" | "thumbnail">>;
