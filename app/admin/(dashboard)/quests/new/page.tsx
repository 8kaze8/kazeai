import QuestForm from "@/components/admin/QuestForm";

export default function NewQuestPage() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
          NEW QUEST
        </h1>
        <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
          Create a new quest
        </p>
      </div>
      <QuestForm />
    </div>
  );
}
