import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import InventoryItemForm from "@/components/admin/InventoryItemForm";
import type { InventoryItem } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function EditInventoryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("inventory_items")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const item = data as InventoryItem;

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
          EDIT ITEM
        </h1>
        <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
          {item.name}
        </p>
      </div>
      <InventoryItemForm initialData={item} />
    </div>
  );
}
