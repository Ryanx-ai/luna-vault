import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/layout/app-shell";
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
  const shellData = await getShellData();
  return (
    <html lang="en">
      <body>
        <AppShell shellData={shellData}>{children}</AppShell>
      </body>
    </html>
  );
}
