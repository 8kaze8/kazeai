"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { Icon } from "@/components/ui/Icon";

interface DesktopIconsProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function DesktopIcons({
  currentPath,
  onNavigate,
}: DesktopIconsProps) {
  const { navigate } = useNavigation();

  const icons = [
    {
      id: "inventory",
      path: "/skills",
      label: "Inventory",
      icon: "backpack",
      color: "text-primary",
      hoverColor: "text-primary",
      badge: 3,
    },
    {
      id: "quest-log",
      path: "/projects",
      label: "Quest Log",
      icon: "history_edu",
      color: "text-[#cba6f7]",
      hoverColor: "text-[#cba6f7]",
    },
    {
      id: "skill-tree",
      path: "/skills",
      label: "Skill Tree",
      icon: "account_tree",
      color: "text-[#a6e3a1]",
      hoverColor: "text-[#a6e3a1]",
    },
    {
      id: "timeline-archives",
      path: "/timeline",
      label: "Timeline Archives",
      icon: "history",
      color: "text-blue-400",
      hoverColor: "text-blue-400",
    },
    {
      id: "research-lab",
      path: "/about",
      label: "Research Lab",
      icon: "layers",
      color: "text-green-400",
      hoverColor: "text-green-400",
    },
    {
      id: "comms-link",
      path: "/contact",
      label: "Comms Link",
      icon: "satellite_alt",
      color: "text-[#f9e2af]",
      hoverColor: "text-[#f9e2af]",
    },
  ];

  return (
    <div className="flex flex-row md:flex-col gap-8 md:gap-6 flex-wrap content-start w-full md:w-auto z-20">
      {icons.map((icon) => (
        <button
          key={icon.id}
          onClick={() => navigate(icon.path)}
          className="group flex flex-col items-center gap-2 w-24 p-2 rounded-lg hover:bg-white/5 hover:backdrop-blur-sm transition-all border border-transparent hover:border-primary/30 focus:outline-none focus:bg-white/10"
        >
          <div className="relative w-14 h-14 bg-gradient-to-br from-surface-dark to-background-dark rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-105 transition-transform group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(37,244,244,0.15)]">
            <Icon
              name={icon.icon}
              className={`${icon.color} group-hover:animate-pulse`}
              size={28}
            />
            {icon.badge && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                {icon.badge}
              </div>
            )}
          </div>
          <span
            className={`text-sm font-medium text-center text-gray-100 desktop-icon-shadow tracking-wide ${
              icon.hoverColor === "text-primary"
                ? "group-hover:text-primary"
                : icon.hoverColor === "text-[#cba6f7]"
                ? "group-hover:text-[#cba6f7]"
                : icon.hoverColor === "text-green-400"
                ? "group-hover:text-green-400"
                : icon.hoverColor === "text-[#f9e2af]"
                ? "group-hover:text-[#f9e2af]"
                : icon.hoverColor === "text-blue-400"
                ? "group-hover:text-blue-400"
                : "group-hover:text-[#a6e3a1]"
            }`}
          >
            {icon.label}
          </span>
        </button>
      ))}
    </div>
  );
}

