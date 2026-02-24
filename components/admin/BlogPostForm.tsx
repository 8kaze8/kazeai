"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/lib/supabase/types";

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

export default function BlogPostForm({
  initialData,
}: {
  initialData?: BlogPost;
}) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [subtitle, setSubtitle] = useState(
    initialData?.subtitle ?? ""
  );
  const [date, setDate] = useState(initialData?.date ?? "");
  const [category, setCategory] = useState(
    initialData?.category ?? ""
  );
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [tags, setTags] = useState(
    initialData?.tags?.join(", ") ?? ""
  );
  const [readTime, setReadTime] = useState(
    initialData?.read_time ?? ""
  );
  const [featured, setFeatured] = useState(
    initialData?.featured ?? false
  );
  const [imageUrl, setImageUrl] = useState(
    initialData?.image_url ?? ""
  );
  const [author, setAuthor] = useState(
    initialData?.author ?? "Kaze"
  );
  const [sortOrder, setSortOrder] = useState(
    initialData?.sort_order ?? 0
  );
  const [content, setContent] = useState(
    initialData?.content
      ? JSON.stringify(initialData.content, null, 2)
      : ""
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

    let parsedContent = null;
    if (content.trim()) {
      try {
        parsedContent = JSON.parse(content);
      } catch {
        setError("Invalid JSON in content field");
        setSaving(false);
        return;
      }
    }

    const payload = {
      title,
      slug,
      subtitle: subtitle || null,
      date,
      category,
      excerpt,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      read_time: readTime,
      featured,
      image_url: imageUrl || null,
      author,
      sort_order: sortOrder,
      content: parsedContent,
    };

    const supabase = createClient();

    if (isEdit && initialData) {
      const { error: err } = await (supabase as any)
        .from("blog_posts")
        .update(payload)
        .eq("id", initialData.id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await (supabase as any)
        .from("blog_posts")
        .insert(payload);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }

    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-2xl">
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="w-32 flex flex-col gap-1">
          <label className={labelClass}>Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            placeholder="Jan 2026"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div className="w-32 flex flex-col gap-1">
          <label className={labelClass}>Read Time</label>
          <input
            type="text"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            required
            placeholder="5 min"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          rows={2}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="AI, Automation, n8n"
          className={inputClass}
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="w-32 flex flex-col gap-1">
          <label className={labelClass}>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="w-32 flex flex-col gap-1">
          <label className={labelClass}>Sort Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <label className="flex items-center gap-2 mt-4 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="accent-[#25f4f4]"
          />
          <span className="text-xs text-[#25f4f4]/60">Featured</span>
        </label>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Content (JSON)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className={`${inputClass} font-mono`}
          placeholder='{"introduction": "...", "sections": [...]}'
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
          onClick={() => router.push("/admin/blog")}
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
