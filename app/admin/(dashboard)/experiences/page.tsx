import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";
import type { Experience } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function ExperiencesListPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <p className="text-red-400 text-xs">
        Error loading experiences: {error.message}
      </p>
    );
  }
  const experiences = (data ?? []) as Experience[];


  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
            EXPERIENCES
          </h1>
          <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
            {experiences?.length ?? 0} entries
          </p>
        </div>
        <Link
          href="/admin/experiences/new"
          className="bg-[#25f4f4] text-[#102222] text-xs px-3
            py-1.5 rounded font-bold"
        >
          New Experience
        </Link>
      </div>

      <div className="border border-[#25f4f4]/10 rounded overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#152a2a] text-[#25f4f4]/60">
              <th className="text-left p-2 font-medium">Title</th>
              <th className="text-left p-2 font-medium">Company</th>
              <th className="text-left p-2 font-medium">Period</th>
              <th className="text-left p-2 font-medium">
                Completion
              </th>
              <th className="text-right p-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences?.map((exp) => (
              <tr
                key={exp.id}
                className="border-b border-[#25f4f4]/10
                  hover:bg-[#152a2a]/50 transition-colors"
              >
                <td className="p-2 text-white">{exp.title}</td>
                <td className="p-2 text-[#25f4f4]/60">
                  {exp.company}
                </td>
                <td className="p-2 text-[#25f4f4]/60">
                  {exp.period}
                </td>
                <td className="p-2 text-[#25f4f4]/60">
                  {exp.completion}%
                </td>
                <td className="p-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/experiences/${exp.id}/edit`}
                      className="text-[#25f4f4]/60
                        hover:text-[#25f4f4] text-xs
                        transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      table="experiences"
                      id={exp.id}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {(!experiences || experiences.length === 0) && (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-[#25f4f4]/40"
                >
                  No experiences yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
