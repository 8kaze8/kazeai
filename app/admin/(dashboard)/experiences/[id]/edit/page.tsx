import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ExperienceForm from "@/components/admin/ExperienceForm";
import type { Experience } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const experience = data as Experience;

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
          EDIT EXPERIENCE
        </h1>
        <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
          {experience.title}
        </p>
      </div>
      <ExperienceForm initialData={experience} />
    </div>
  );
}
