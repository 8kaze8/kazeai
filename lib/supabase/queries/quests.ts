import { createClient } from "@/lib/supabase/server";
import type { Quest } from "@/lib/supabase/types";

export async function getQuests(): Promise<Quest[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quests")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
