import type { Metadata } from "next";
import { BrandDetail } from "@/components/brands/brand-detail";
import { getBrandBySlug } from "@/lib/data/brands";

export async function generateMetadata({ params }: { params: Promise<{ brandSlug: string }> }): Promise<Metadata> {
  const { brandSlug } = await params;
  const brand = await getBrandBySlug(brandSlug);
  return { title: brand?.name ?? "Brand" };
}

export default async function BrandDetailPage({ params }: { params: Promise<{ brandSlug: string }> }) {
  const { brandSlug } = await params;
  return <BrandDetail brandSlug={brandSlug} />;
}
