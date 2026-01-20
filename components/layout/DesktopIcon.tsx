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
  const dragDataRef = useRef({
    startX: 0,
    startY: 0,
    startMouseX: 0,
    startMouseY: 0,
    wasDragged: false,
  });

  // Update position when savedPosition changes externally (e.g., reset)
  useEffect(() => {
    if (!isDragging) {
      setPosition(savedPosition);
    }
  }, [savedPosition, isDragging]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const deltaX = e.clientX - dragDataRef.current.startMouseX;
      const deltaY = e.clientY - dragDataRef.current.startMouseY;

      // Mark as dragged if moved more than 5px
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        dragDataRef.current.wasDragged = true;
        setHasDragged(icon.id, true);
      }

      setPosition({
        x: dragDataRef.current.startX + deltaX,
        y: dragDataRef.current.startY + deltaY,
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Save final position
      const finalPosition = {
        x: dragDataRef.current.startX + (e.clientX - dragDataRef.current.startMouseX),
        y: dragDataRef.current.startY + (e.clientY - dragDataRef.current.startMouseY),
      };

      setPosition(finalPosition);
      onPositionChange(icon.id, finalPosition);
      setIsDragging(false);

      // Reset drag state after a short delay
      setTimeout(() => {
        dragDataRef.current.wasDragged = false;
        setHasDragged(icon.id, false);
      }, 100);
    };

    // Use capture phase to ensure we get events first
    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("mouseup", handleMouseUp, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove, true);
      document.removeEventListener("mouseup", handleMouseUp, true);
    };
  }, [isDragging, icon.id, onPositionChange, setHasDragged]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only handle left click
    if (e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();

    // Store initial positions
    dragDataRef.current = {
      startX: position.x,
      startY: position.y,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      wasDragged: false,
    };

    setIsDragging(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only navigate if we didn't drag
    if (!dragDataRef.current.wasDragged && mounted && onNavigate) {
      onNavigate(icon.path);
    }
  };

  return (
    <button
      className="desktop-icon group relative flex flex-col items-center gap-2 w-20 md:w-24 flex-shrink-0 p-2 rounded-lg hover:bg-white/5 hover:backdrop-blur-sm transition-all border border-transparent hover:border-primary/30 focus:outline-none focus:bg-white/10"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) ${isDragging ? "scale(1.15)" : "scale(1)"}`,
        zIndex: isDragging ? 9999 : 1,
        boxShadow: isDragging ? "0 0 30px rgba(37,244,244,0.6)" : "none",
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging ? "none" : "transform 0.1s ease-out, box-shadow 0.1s ease-out",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      draggable={false}
    >
      <div
        className="relative w-14 h-14 bg-gradient-to-br from-surface-dark to-background-dark rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-105 transition-transform group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(37,244,244,0.15)]"
        draggable={false}
      >
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
          <BorderBeam
            size={100}
            duration={3}
            colorFrom={icon.hexColor}
            colorTo="#25f4f4"
          />
        </div>
        <Icon name={icon.icon} className={`${icon.color} group-hover:animate-pulse pointer-events-none`} size={28} />
        {icon.badge && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm pointer-events-none">
            {icon.badge}
          </div>
        )}
      </div>
      <span
        className={`text-sm font-medium text-center text-gray-100 desktop-icon-shadow tracking-wide pointer-events-none select-none ${
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
        draggable={false}
      >
        {icon.label}
      </span>
    </button>
  );
}
