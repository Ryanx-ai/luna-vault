import type { Metadata } from "next";
import { BrandConfigure } from "@/components/brands/brand-configure";

export const metadata: Metadata = { title: "Configure Brand" };

export default async function ConfigureBrandPage({ params }: { params: Promise<{ brandSlug: string }> }) {
  const { brandSlug } = await params;
  return <BrandConfigure brandSlug={brandSlug} />;
}
