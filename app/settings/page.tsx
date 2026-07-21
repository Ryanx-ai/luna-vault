import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Settings" };
export default function SettingsPage() {
  return (
    <PageScaffold
      eyebrow="Vault configuration"
      title="Settings"
      description="Configure the shared foundations and preferences of the active Vault."
      emptyTitle="Vault settings are coming later"
      emptyDescription="Collaborators, Brand defaults, and Vault-level preferences will be configured here."
    />
  );
}
