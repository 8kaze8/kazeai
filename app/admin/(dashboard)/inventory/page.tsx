import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";
import type { InventoryItem } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const rarityColors: Record<string, string> = {
  common: "text-gray-400",
  rare: "text-blue-400",
  epic: "text-purple-400",
  legendary: "text-yellow-400",
};

export default async function InventoryListPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <p className="text-red-400 text-xs">
        Error loading items: {error.message}
      </p>
    );
  }
  const items = (data ?? []) as InventoryItem[];


  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
            INVENTORY
          </h1>
          <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
            {items?.length ?? 0} items
          </p>
        </div>
        <Link
          href="/admin/inventory/new"
          className="bg-[#25f4f4] text-[#102222] text-xs px-3
            py-1.5 rounded font-bold"
        >
          New Item
        </Link>
      </div>

      <div className="border border-[#25f4f4]/10 rounded overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#152a2a] text-[#25f4f4]/60">
              <th className="text-left p-2 font-medium">Name</th>
              <th className="text-left p-2 font-medium">Level</th>
              <th className="text-left p-2 font-medium">Rarity</th>
              <th className="text-left p-2 font-medium">Power</th>
              <th className="text-right p-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#25f4f4]/10
                  hover:bg-[#152a2a]/50 transition-colors"
              >
                <td className="p-2 text-white">
                  <span className="mr-1.5">{item.icon}</span>
                  {item.name}
                </td>
                <td className="p-2 text-[#25f4f4]/60">
                  Lv.{item.level}
                </td>
                <td className="p-2">
                  <span
                    className={`capitalize ${
                      rarityColors[item.rarity] ?? "text-gray-400"
                    }`}
                  >
                    {item.rarity}
                  </span>
                </td>
                <td className="p-2 text-[#25f4f4]/60">
                  {item.power}
                </td>
                <td className="p-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/inventory/${item.id}/edit`}
                      className="text-[#25f4f4]/60
                        hover:text-[#25f4f4] text-xs
                        transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      table="inventory_items"
                      id={item.id}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {(!items || items.length === 0) && (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-[#25f4f4]/40"
                >
                  No items yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
