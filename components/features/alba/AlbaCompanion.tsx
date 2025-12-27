"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAlbaStore } from "@/store/albaStore";
import { useAlbaInteraction } from "@/hooks/useAlbaInteraction";
import { AlbaSprite } from "./AlbaSprite";
import { AlbaBubble } from "./AlbaBubble";

export function AlbaCompanion() {
  const { position, state, setPosition, setState } = useAlbaStore();
  const { handleHover, handleClick } = useAlbaInteraction();
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Set initial position to bottom-right (above taskbar) - no animation
    if (position.x === 0 && position.y === 0) {
      useAlbaStore.getState().setPosition({
        x: typeof window !== "undefined" ? window.innerWidth - 150 : 0,
        y: typeof window !== "undefined" ? window.innerHeight - 200 : 0,
      });
    }
  }, [position]);

  // Manual drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    setIsDragging(true);
    setState("walking");
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    dragOffset.current = { x: position.x, y: position.y };
    setDragPosition({ x: position.x, y: position.y });
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;
      
      const spriteSize = 128;
      const taskbarHeight = 56;
      const newX = Math.max(0, Math.min(
        typeof window !== "undefined" ? window.innerWidth - spriteSize : 0,
        dragOffset.current.x + deltaX
      ));
      const newY = Math.max(0, Math.min(
        typeof window !== "undefined" ? window.innerHeight - taskbarHeight - spriteSize : 0,
        dragOffset.current.y + deltaY
      ));
      
      // Update drag position immediately for smooth following
      setDragPosition({ x: newX, y: newY });
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setTimeout(() => {
        setState("awake");
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, setPosition, setState]);

  return (
    <motion.div
      className="fixed z-50 cursor-grab active:cursor-grabbing pointer-events-auto select-none"
      initial={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
      animate={{
        opacity: 1,
        scale: isDragging ? 1.1 : 1,
        x: isDragging ? dragPosition.x : position.x,
        y: isDragging ? dragPosition.y : position.y,
      }}
      transition={{
        scale: { duration: 0.2 },
        x: isDragging ? { duration: 0 } : { duration: 0.8, ease: "easeOut" },
        y: isDragging ? { duration: 0 } : { duration: 0.8, ease: "easeOut" },
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleHover}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Angry glow effect */}
        {state === "angry" && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        <AlbaBubble />
        <AlbaSprite />
      </div>
    </motion.div>
  );
}

