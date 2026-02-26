"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Quest } from "@/lib/supabase/types";

const inputClass =
  "w-full bg-[#152a2a] border border-[#25f4f4]/20 text-white text-xs p-2 rounded outline-none focus:border-[#25f4f4]/50 transition-colors";
const labelClass =
  "text-[10px] uppercase tracking-wider text-[#25f4f4]/60";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function QuestForm({
  initialData,
}: {
  initialData?: Quest;
}) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [client, setClient] = useState(initialData?.client ?? "");
  const [questClass, setQuestClass] = useState(
    initialData?.class ?? ""
  );
  const [questId, setQuestId] = useState(
    initialData?.quest_id ?? ""
  );
  const [completed, setCompleted] = useState(
    initialData?.completed ?? ""
  );
  const [briefing, setBriefing] = useState(
    initialData?.briefing ?? ""
  );
  const [loot, setLoot] = useState(
    initialData?.loot
      ? JSON.stringify(initialData.loot, null, 2)
      : '{\n  "responseTime": "",\n  "costReduction": "",\n  "csatScore": ""\n}'
  );
  const [techStack, setTechStack] = useState(
    initialData?.tech_stack?.join(", ") ?? ""
  );
  const [images, setImages] = useState(
    initialData?.images?.join(", ") ?? ""
  );
  const [category, setCategory] = useState<
    "main_quest" | "side_quest"
  >(initialData?.category ?? "main_quest");
  const [sortOrder, setSortOrder] = useState(
    initialData?.sort_order ?? 0
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    let parsedLoot;
    try {
      parsedLoot = JSON.parse(loot);
    } catch {
      setError("Invalid JSON in loot field");
      setSaving(false);
      return;
    }

    const payload = {
      slug,
      title,
      client,
      class: questClass,
      quest_id: questId,
      completed,
      briefing,
      loot: parsedLoot,
      tech_stack: techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      images: images
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      category,
      sort_order: sortOrder,
    };

    const supabase = createClient();

    if (isEdit && initialData) {
      const { error: err } = await (supabase as any)
        .from("quests")
        .update(payload)
        .eq("id", initialData.id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await (supabase as any)
        .from("quests")
        .insert(payload);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }

    router.push("/admin/quests");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-2xl">
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="w-40 flex flex-col gap-1">
        <label className={labelClass}>Category</label>
        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value as "main_quest" | "side_quest"
            )
          }
          className={inputClass}
        >
          <option value="main_quest">Main Quest</option>
          <option value="side_quest">Side Quest</option>
        </select>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Client</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div className="w-40 flex flex-col gap-1">
          <label className={labelClass}>Class</label>
          <input
            type="text"
            value={questClass}
            onChange={(e) => setQuestClass(e.target.value)}
            required
            placeholder="Automation"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Quest ID</label>
          <input
            type="text"
            value={questId}
            onChange={(e) => setQuestId(e.target.value)}
            required
            placeholder="QST-001"
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Completed</label>
          <input
            type="text"
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
            required
            placeholder="2024"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Briefing</label>
        <textarea
          value={briefing}
          onChange={(e) => setBriefing(e.target.value)}
          required
          rows={3}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Loot (JSON)</label>
        <textarea
          value={loot}
          onChange={(e) => setLoot(e.target.value)}
          rows={5}
          className={`${inputClass} font-mono`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>
          Tech Stack (comma-separated)
        </label>
        <input
          type="text"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="n8n, OpenAI, Supabase"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>
          Images (comma-separated URLs)
        </label>
        <input
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="w-24 flex flex-col gap-1">
        <label className={labelClass}>Sort Order</label>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          className={inputClass}
        />
      </div>

      {error && (
        <p className="text-[10px] text-red-400">{error}</p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#25f4f4] text-[#102222] text-xs px-3
            py-1.5 rounded font-bold disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/quests")}
          className="text-xs px-3 py-1.5 rounded border
            border-[#25f4f4]/20 text-[#25f4f4]/60
            hover:text-[#25f4f4] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
