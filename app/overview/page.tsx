import { WorkspaceOverview } from "@/components/overview/workspace-overview";
import { getWorkspaceOverview } from "@/lib/data/workspace";

export const metadata = { title: "Overview" };

export default async function OverviewPage() {
  const overview = await getWorkspaceOverview();
  return <WorkspaceOverview data={overview} />;
}
