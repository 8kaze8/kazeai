import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getTableCount(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: "blog_posts" | "experiences" | "quests" | "inventory_items"
): Promise<number> {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error) return 0;
  return count ?? 0;
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [blogCount, experienceCount, questCount, inventoryCount] =
    await Promise.all([
      getTableCount(supabase, "blog_posts"),
      getTableCount(supabase, "experiences"),
      getTableCount(supabase, "quests"),
      getTableCount(supabase, "inventory_items"),
    ]);

  const total = blogCount + experienceCount + questCount + inventoryCount;

  const stats = [
    { label: "Blog Posts", count: blogCount, href: "/admin/blog", tag: "RESEARCH" },
    { label: "Experiences", count: experienceCount, href: "/admin/experiences", tag: "TIMELINE" },
    { label: "Quests", count: questCount, href: "/admin/quests", tag: "MISSIONS" },
    { label: "Inventory", count: inventoryCount, href: "/admin/inventory", tag: "SKILLS" },
  ];

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-sm font-bold tracking-[0.1em] text-primary">
          DASHBOARD
        </h1>
        <p className="text-[10px] text-primary/30 mt-0.5 font-mono">
          {total} entries // all_collections
        </p>
      </div>

      {/* Stat Cards - matches card.base from designTokens */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="flex flex-col gap-2 p-2 md:p-3 rounded-lg
              bg-[#162a2a] border border-white/5
              hover:border-primary/30 hover:shadow-[0_0_10px_rgba(37,244,244,0.1)]
              transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-primary/25 tracking-wider">
                {stat.tag}
              </span>
            </div>
            <p className="text-lg font-bold text-primary tabular-nums">
              {stat.count}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-primary/40 group-hover:text-primary/60 transition-colors">
                {stat.label}
              </span>
              <span className="text-[9px] text-primary/20 group-hover:text-primary/40 font-mono transition-colors">
                {">"}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* System Status */}
      <div className="mt-4 p-2 md:p-3 rounded-lg bg-[#162a2a] border border-white/5">
        <p className="text-[9px] font-mono text-primary/20 mb-1.5">
          // system_status
        </p>
        <div className="flex gap-3 text-[10px]">
          <span className="text-primary/30">
            AUTH: <span className="text-[#4ade80]/60">ACTIVE</span>
          </span>
          <span className="text-primary/30">
            DB: <span className="text-[#4ade80]/60">CONNECTED</span>
          </span>
          <span className="text-primary/30">
            RLS: <span className="text-[#4ade80]/60">ENABLED</span>
          </span>
        </div>
      </div>
    </div>
  );
}
