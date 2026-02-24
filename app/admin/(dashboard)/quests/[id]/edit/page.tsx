import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import QuestForm from "@/components/admin/QuestForm";
import type { Quest } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function EditQuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("quests")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const quest = data as Quest;

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
          EDIT QUEST
        </h1>
        <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
          {quest.title}
        </p>
      </div>
      <QuestForm initialData={quest} />
    </div>
  );
}
