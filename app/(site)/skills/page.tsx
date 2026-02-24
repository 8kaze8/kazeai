export const dynamic = "force-dynamic";

import { getInventoryItems } from "@/lib/supabase/queries";
import { InventoryWindow } from "@/components/features/inventory/InventoryWindow";

export default async function SkillsPage() {
  const items = await getInventoryItems();
  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <InventoryWindow items={items} />
    </div>
  );
}
