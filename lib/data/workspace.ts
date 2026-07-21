import { lunaWorkspaceFixture, notificationFixtures, userProfileFixture, vaultFixtures } from "@/lib/fixtures/luna-workspace";
import type { ShellData, WorkspaceOverview } from "@/lib/types/workspace";

export async function getWorkspaceOverview(): Promise<WorkspaceOverview> {
  return lunaWorkspaceFixture;
}

export async function getShellData(): Promise<ShellData> {
  return {
    vaults: vaultFixtures,
    notifications: notificationFixtures,
    activity: lunaWorkspaceFixture.recentActivity,
    recentAssets: lunaWorkspaceFixture.recentAssets,
    brands: lunaWorkspaceFixture.brands,
    user: userProfileFixture,
  };
}
