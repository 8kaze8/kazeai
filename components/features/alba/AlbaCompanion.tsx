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
  const [hasMoved, setHasMoved] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isClickMove, setIsClickMove] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const finalDragPos = useRef({ x: 0, y: 0 });

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
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setHasMoved(false);
    setState("walking");
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    dragOffset.current = { x: position.x, y: position.y };
    setDragPosition({ x: position.x, y: position.y });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;
      
      // Check if mouse has moved significantly
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        setHasMoved(true);
      }
      
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
      // Don't update position state during drag, only update dragPosition
      setDragPosition({ x: newX, y: newY });
      // Store final position in ref for use in handleMouseUp
      finalDragPos.current = { x: newX, y: newY };
    };

    const handleMouseUp = (e?: MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const wasDragging = hasMoved;
      if (wasDragging) {
        // Use ref to get the most current drag position (avoid closure issues)
        const finalPos = finalDragPos.current;
        // CRITICAL: Update position to final drag position - NO ANIMATION
        // Set both position and dragPosition to the same value
        setPosition(finalPos);
        setDragPosition(finalPos);
        // Ensure click move flag is false (this was a drag, not a click)
        setIsClickMove(false);
      }
      setIsDragging(false);
      setHasMoved(false);
      setTimeout(() => {
        setState("awake");
      }, 500);
      return wasDragging;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, hasMoved, setPosition, setState]);

  // Use dragPosition during drag, position when not dragging
  // After drag ends, position is already updated to finalPos, so use position
  const currentPos = isDragging ? dragPosition : position;

  return (
    <motion.div
      className="fixed z-40 select-none pointer-events-none"
      style={{
        width: 128,
        height: 128,
      }}
      initial={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
      animate={{
        opacity: 1,
        scale: isDragging ? 1.1 : 1,
        x: currentPos.x,
        y: currentPos.y,
      }}
      transition={{
        scale: { duration: 0.2 },
        // Only animate on click move, not on drag or initial render
        x: (isDragging || !isClickMove) ? { duration: 0 } : { duration: 1.5, ease: "easeInOut" },
        y: (isDragging || !isClickMove) ? { duration: 0 } : { duration: 1.5, ease: "easeInOut" },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className="relative w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
        onMouseDown={handleMouseDown}
        onMouseEnter={handleHover}
      onClick={(e) => {
        e.stopPropagation();
        if (!hasMoved && !isDragging) {
          // Mark that this is a click move (not a drag) - will trigger smooth animation
          setIsClickMove(true);
          handleClick();
          // Reset flag after animation completes
          setTimeout(() => {
            setIsClickMove(false);
          }, 1500);
        }
      }}
      >
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

