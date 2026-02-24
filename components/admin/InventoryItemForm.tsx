"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { InventoryItem } from "@/lib/supabase/types";

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

export default function InventoryItemForm({
  initialData,
}: {
  initialData?: InventoryItem;
}) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [name, setName] = useState(initialData?.name ?? "");
  const [level, setLevel] = useState(initialData?.level ?? 1);
  const [stat, setStat] = useState(initialData?.stat ?? "");
  const [icon, setIcon] = useState(initialData?.icon ?? "");
  const [rarity, setRarity] = useState<
    "common" | "rare" | "epic" | "legendary"
  >(initialData?.rarity ?? "common");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [power, setPower] = useState(initialData?.power ?? 0);
  const [weight, setWeight] = useState(initialData?.weight ?? "");
  const [durability, setDurability] = useState(
    initialData?.durability ?? ""
  );
  const [sortOrder, setSortOrder] = useState(
    initialData?.sort_order ?? 0
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      slug,
      name,
      level,
      stat,
      icon,
      rarity,
      description,
      power,
      weight,
      durability,
      sort_order: sortOrder,
    };

    const supabase = createClient();

    if (isEdit && initialData) {
      const { error: err } = await (supabase as any)
        .from("inventory_items")
        .update(payload)
        .eq("id", initialData.id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await (supabase as any)
        .from("inventory_items")
        .insert(payload);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }

    router.push("/admin/inventory");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-2xl">
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
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
        <div className="w-24 flex flex-col gap-1">
          <label className={labelClass}>Level</label>
          <input
            type="number"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            min={1}
            required
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Stat</label>
          <input
            type="text"
            value={stat}
            onChange={(e) => setStat(e.target.value)}
            required
            placeholder="+15 Automation"
            className={inputClass}
          />
        </div>
        <div className="w-24 flex flex-col gap-1">
          <label className={labelClass}>Icon</label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Rarity</label>
          <select
            value={rarity}
            onChange={(e) =>
              setRarity(
                e.target.value as
                  | "common"
                  | "rare"
                  | "epic"
                  | "legendary"
              )
            }
            className={inputClass}
          >
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
          </select>
        </div>
        <div className="w-24 flex flex-col gap-1">
          <label className={labelClass}>Power</label>
          <input
            type="number"
            value={power}
            onChange={(e) => setPower(Number(e.target.value))}
            required
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

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Weight</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            placeholder="2.5 kg"
            className={inputClass}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className={labelClass}>Durability</label>
          <input
            type="text"
            value={durability}
            onChange={(e) => setDurability(e.target.value)}
            required
            placeholder="95/100"
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
          onClick={() => router.push("/admin/inventory")}
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
