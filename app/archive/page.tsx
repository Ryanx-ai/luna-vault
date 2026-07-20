import { PageScaffold } from "@/components/layout/page-scaffold";
export const metadata = { title: "Archive" };
export default function ArchivePage() { return <PageScaffold eyebrow="Retention" title="Archive" description="Retired material kept safely away from the current source of truth." emptyTitle="The archive is empty" emptyDescription="Superseded brand material will remain traceable without cluttering active work." />; }
