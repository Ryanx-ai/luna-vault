import { lunaBrandFixtures } from "@/lib/fixtures/luna-brands";
import type { Brand } from "@/lib/types/brand";

export async function getBrands(): Promise<Brand[]> {
  return lunaBrandFixtures;
}

export async function getBrandBySlug(slug: string): Promise<Brand | undefined> {
  return lunaBrandFixtures.find((brand) => brand.slug === slug);
}
