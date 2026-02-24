"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Experience } from "@/lib/supabase/types";

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

export default function ExperienceForm({
  initialData,
}: {
  initialData?: Experience;
}) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [period, setPeriod] = useState(initialData?.period ?? "");
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [company, setCompany] = useState(
    initialData?.company ?? ""
  );
  const [missionId, setMissionId] = useState(
    initialData?.mission_id ?? ""
  );
  const [clearanceLevel, setClearanceLevel] = useState(
    initialData?.clearance_level ?? ""
  );
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [achievements, setAchievements] = useState(
    initialData?.achievements
      ? JSON.stringify(initialData.achievements, null, 2)
      : "[]"
  );
  const [techStack, setTechStack] = useState(
    initialData?.tech_stack?.join(", ") ?? ""
  );
  const [startDate, setStartDate] = useState(
    initialData?.start_date ?? ""
  );
  const [endDate, setEndDate] = useState(
    initialData?.end_date ?? ""
  );
  const [completion, setCompletion] = useState(
    initialData?.completion ?? 100
  );
  const [demoImage, setDemoImage] = useState(
    initialData?.demo_image ?? ""
  );
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

    let parsedAchievements;
    try {
      parsedAchievements = JSON.parse(achievements);
    } catch {
      setError("Invalid JSON in achievements field");
      setSaving(false);
      return;
    }

    const payload = {
      slug,
      period,
      title,
      company,
      mission_id: missionId,
      clearance_level: clearanceLevel,
      description,
      achievements: parsedAchievements,
      tech_stack: techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      start_date: startDate,
      end_date: endDate,
      completion,
      demo_image: demoImage || null,
      sort_order: sortOrder,
    };

    const supabase = createClient();

    if (isEdit && initialData) {
      const { error: err } = await (supabase as any) // eslint-disable-line
        .from("experiences")
        .update(payload)
        .eq("id", initialData.id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await (supabase as any) // eslint-disable-line
        .from("experiences")
        .insert(payload);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }

    router.push("/admin/experiences");
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

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div className="w-40 flex flex-col gap-1">
          <label className={labelClass}>Period</label>
          <input
            type="text"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            required
            placeholder="2024 - Present"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Mission ID</label>
          <input
            type="text"
            value={missionId}
            onChange={(e) => setMissionId(e.target.value)}
            required
            placeholder="MSN-001"
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Clearance Level</label>
          <input
            type="text"
            value={clearanceLevel}
            onChange={(e) => setClearanceLevel(e.target.value)}
            required
            placeholder="ALPHA"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>
          Achievements (JSON array)
        </label>
        <textarea
          value={achievements}
          onChange={(e) => setAchievements(e.target.value)}
          rows={6}
          className={`${inputClass} font-mono`}
          placeholder='[{"title": "...", "description": "..."}]'
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
          placeholder="React, Node.js, TypeScript"
          className={inputClass}
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Start Date</label>
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            placeholder="2024-01"
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>End Date</label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            placeholder="Present"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-32 flex flex-col gap-1">
          <label className={labelClass}>Completion %</label>
          <input
            type="number"
            value={completion}
            onChange={(e) => setCompletion(Number(e.target.value))}
            min={0}
            max={100}
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Demo Image URL</label>
          <input
            type="text"
            value={demoImage}
            onChange={(e) => setDemoImage(e.target.value)}
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
          onClick={() => router.push("/admin/experiences")}
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
