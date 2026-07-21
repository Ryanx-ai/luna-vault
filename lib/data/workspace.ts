import { lunaWorkspaceFixture } from "@/lib/fixtures/luna-workspace";
import type { WorkspaceOverview } from "@/lib/types/workspace";

export async function getWorkspaceOverview(): Promise<WorkspaceOverview> {
  return lunaWorkspaceFixture;
}
