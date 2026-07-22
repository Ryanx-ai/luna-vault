import { lunaWorkspaceFixture, notificationFixtures, userProfileFixture, vaultFixtures } from "@/lib/fixtures/luna-workspace";
import type { ShellData } from "@/lib/types/workspace";

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
