export const dynamic = "force-dynamic";

import { getQuests } from "@/lib/supabase/queries";
import { QuestLogWindow } from "@/components/features/quests/QuestLogWindow";

export default async function ProjectsPage() {
  const quests = await getQuests();
  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <QuestLogWindow quests={quests} />
    </div>
  );
}
