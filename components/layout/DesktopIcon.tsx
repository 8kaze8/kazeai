"use client";

import { useRef, useState, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { BorderBeam } from "@/components/magicui/border-beam";

interface DesktopIconProps {
  icon: {
    id: string;
    path: string;
    label: string;
    icon: string;
    color: string;
    hoverColor: string;
    hexColor: string;
    badge?: number;
  };
  savedPosition: { x: number; y: number };
  onPositionChange: (id: string, pos: { x: number; y: number }) => void;
  onNavigate: (path: string) => void;
  mounted: boolean;
  hasDragged: boolean;
  setHasDragged: (id: string, value: boolean) => void;
}

export function DesktopIcon({
  icon,
  savedPosition,
  onPositionChange,
  onNavigate,
  mounted,
  hasDragged,
  setHasDragged,
}: DesktopIconProps) {
  const [position, setPosition] = useState(savedPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLButtonElement>(null);

  // Update position when savedPosition changes externally
  useEffect(() => {
    setPosition(savedPosition);
  }, [savedPosition.x, savedPosition.y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    
    setIsDragging(true);
    setHasDragged(icon.id, false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Mark as dragged if moved significantly
      if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
        setHasDragged(icon.id, true);
      }

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      // Clamp to screen bounds
      const maxX = typeof window !== "undefined" ? window.innerWidth - 100 : 0;
      const maxY = typeof window !== "undefined" ? window.innerHeight - 200 : 0;

      const clampedX = Math.max(0, Math.min(position.x, maxX));
      const clampedY = Math.max(0, Math.min(position.y, maxY));

      setPosition({ x: clampedX, y: clampedY });
      onPositionChange(icon.id, { x: clampedX, y: clampedY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart, position, icon.id, onPositionChange, setHasDragged]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only navigate if not dragged
    if (mounted && onNavigate && !hasDragged) {
      onNavigate(icon.path);
    }
    // Reset drag flag after click
    setTimeout(() => {
      setHasDragged(icon.id, false);
    }, 100);
  };

  return (
    <button
      ref={iconRef}
      className="desktop-icon group relative flex flex-col items-center gap-2 w-20 md:w-24 flex-shrink-0 p-2 rounded-lg hover:bg-white/5 hover:backdrop-blur-sm transition-all border border-transparent hover:border-primary/30 focus:outline-none focus:bg-white/10 cursor-pointer"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) ${isDragging ? "scale(1.15)" : "scale(1)"}`,
        zIndex: isDragging ? 30 : 1,
        boxShadow: isDragging ? "0 0 30px rgba(37,244,244,0.6)" : "none",
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging ? "none" : "transform 0.1s ease-out",
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.classList.add("icon-hovered");
      }}
      onMouseLeave={(e) => {
        e.currentTarget.classList.remove("icon-hovered");
      }}
    >
      <div className="relative w-14 h-14 bg-gradient-to-br from-surface-dark to-background-dark rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-105 transition-transform group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(37,244,244,0.15)]">
        {/* BorderBeam on hover - only on icon container */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
          <BorderBeam
            size={100}
            duration={3}
            colorFrom={icon.hexColor}
            colorTo="#25f4f4"
          />
        </div>
        <Icon name={icon.icon} className={`${icon.color} group-hover:animate-pulse`} size={28} />
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
  );
}
