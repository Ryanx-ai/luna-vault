import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Luna Vault", template: "%s · Luna Vault" },
  description: "The operating system for brands.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0b0c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
