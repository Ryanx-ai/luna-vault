import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Brands" };
export default function BrandsPage() { return <PageScaffold eyebrow="Identity system" title="Brands" description="The source of truth for parent brands, sub-brands, and their relationships." emptyTitle="No brands in this vault" emptyDescription="Brand profiles and their inherited identity rules will be organised here." />; }
