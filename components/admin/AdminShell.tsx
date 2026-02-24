"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "~" },
  { label: "Blog Posts", href: "/admin/blog", icon: "#" },
  { label: "Experiences", href: "/admin/experiences", icon: ">" },
  { label: "Quests", href: "/admin/quests", icon: "!" },
  { label: "Inventory", href: "/admin/inventory", icon: "*" },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-[#102222]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-48 bg-[#102323]/95 backdrop-blur-md border-r border-primary/20 flex flex-col z-50">
        {/* Logo */}
        <div className="px-3 py-3 border-b border-primary/20">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(37,244,244,0.5)]" />
            <p className="text-sm font-bold tracking-[0.1em] text-primary">
              KAZEOS
            </p>
          </div>
          <p className="text-[9px] text-primary/30 mt-0.5 ml-3.5 font-mono">
            admin_console
          </p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-2 flex flex-col gap-0.5 mt-1">
          <p className="text-[9px] text-primary/20 font-mono px-2 mb-1">
            // content
          </p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-2 px-2 py-1.5 rounded-md
                text-xs transition-all duration-200
                ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(37,244,244,0.05)]"
                    : "text-primary/40 hover:text-primary/70 hover:bg-primary/5 border border-transparent"
                }
              `}
            >
              <span className="w-4 text-center font-mono text-[10px] text-primary/50">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-2 border-t border-primary/10 flex flex-col gap-0.5">
          <Link
            href="/"
            className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-primary/30 hover:text-primary/60 hover:bg-primary/5 transition-all duration-200"
          >
            <span className="w-4 text-center font-mono text-[10px]">
              &lt;-
            </span>
            <span>Back to Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-[#ff6d5a]/40 hover:text-[#ff6d5a]/80 hover:bg-[#ff6d5a]/5 transition-all duration-200 w-full text-left"
          >
            <span className="w-4 text-center font-mono text-[10px]">
              x
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-48 flex-1 min-h-screen p-3 md:p-4">
        {children}
      </main>
    </div>
  );
}
