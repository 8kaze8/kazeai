import InventoryItemForm from "@/components/admin/InventoryItemForm";

export default function NewInventoryItemPage() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg font-bold tracking-[0.1em] text-[#25f4f4]">
          NEW ITEM
        </h1>
        <p className="text-[10px] text-[#25f4f4]/40 mt-0.5">
          Add a new inventory item
        </p>
      </div>
      <InventoryItemForm />
    </div>
  );
}
