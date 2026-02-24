import ExperienceForm from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
          NEW EXPERIENCE
        </h1>
        <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
          Add a new experience entry
        </p>
      </div>
      <ExperienceForm />
    </div>
  );
}
