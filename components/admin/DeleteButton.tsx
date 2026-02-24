"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type DeleteButtonProps = {
  table: string;
  id: string;
  onDelete?: () => void;
};

export default function DeleteButton({
  table,
  id,
  onDelete,
}: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from(table as any)
      .delete()
      .eq("id", id);

    if (error) {
      alert(`Delete failed: ${error.message}`);
      return;
    }

    if (onDelete) {
      onDelete();
    }

    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-400/70 hover:text-red-400
        text-xs transition-colors"
    >
      Delete
    </button>
  );
}
