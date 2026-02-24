import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";
import type { Quest } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function QuestsListPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quests")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <p className="text-red-400 text-xs">
        Error loading quests: {error.message}
      </p>
    );
  }
  const quests = (data ?? []) as Quest[];


  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
            QUESTS
          </h1>
          <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
            {quests?.length ?? 0} quests
          </p>
        </div>
        <Link
          href="/admin/quests/new"
          className="bg-[#25f4f4] text-[#102222] text-xs px-3
            py-1.5 rounded font-bold"
        >
          New Quest
        </Link>
      </div>

      <div className="border border-[#25f4f4]/10 rounded overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#152a2a] text-[#25f4f4]/60">
              <th className="text-left p-2 font-medium">Title</th>
              <th className="text-left p-2 font-medium">Client</th>
              <th className="text-left p-2 font-medium">Class</th>
              <th className="text-left p-2 font-medium">
                Completed
              </th>
              <th className="text-right p-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quests?.map((quest) => (
              <tr
                key={quest.id}
                className="border-b border-[#25f4f4]/10
                  hover:bg-[#152a2a]/50 transition-colors"
              >
                <td className="p-2 text-white">{quest.title}</td>
                <td className="p-2 text-[#25f4f4]/60">
                  {quest.client}
                </td>
                <td className="p-2 text-[#25f4f4]/60">
                  {quest.class}
                </td>
                <td className="p-2 text-[#25f4f4]/60">
                  {quest.completed}
                </td>
                <td className="p-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/quests/${quest.id}/edit`}
                      className="text-[#25f4f4]/60
                        hover:text-[#25f4f4] text-xs
                        transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton table="quests" id={quest.id} />
                  </div>
                </td>
              </tr>
            ))}
            {(!quests || quests.length === 0) && (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-[#25f4f4]/40"
                >
                  No quests yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
