import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Settings" };
export default function SettingsPage() {
  return (
    <PageScaffold
      eyebrow="Vault configuration"
      title="Settings"
      description="Configure the shared foundations and preferences of the active Vault."
      emptyTitle="No settings available"
      emptyDescription="Vault collaborators, Brand defaults, and shared preferences will appear here."
    />
  );
}
