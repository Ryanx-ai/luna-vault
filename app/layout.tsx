import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { getBrands } from "@/lib/data/brands";
import { getShellData } from "@/lib/data/workspace";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Luna Vault", template: "%s · Luna Vault" },
  description: "The operating system for brands.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0b0c",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [shellData, brands] = await Promise.all([getShellData(), getBrands()]);
  return (
    <html lang="en">
      <body>
        <AppShell shellData={shellData} brands={brands}>{children}</AppShell>
      </body>
    </html>
  );
}
