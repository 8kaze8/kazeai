"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { animate } from "animejs";
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
  const [walkingFrame, setWalkingFrame] = useState(0);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const finalDragPos = useRef({ x: 0, y: 0 });
  const albaRef = useRef<HTMLDivElement>(null);
  const walkingIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Walking sprite animation
  useEffect(() => {
    if (state === "walking") {
      walkingIntervalRef.current = setInterval(() => {
        setWalkingFrame((prev) => (prev + 1) % 4); // 4 frame walking animation
      }, 150); // 150ms per frame
    } else {
      if (walkingIntervalRef.current) {
        clearInterval(walkingIntervalRef.current);
        walkingIntervalRef.current = null;
      }
      setWalkingFrame(0);
    }

    return () => {
      if (walkingIntervalRef.current) {
        clearInterval(walkingIntervalRef.current);
      }
    };
  }, [state]);

  // Animate to position with path animation
  const animateToPosition = (targetX: number, targetY: number) => {
    if (!albaRef.current) return;

    setState("walking");
    setIsClickMove(true);

    const startX = position.x;
    const startY = position.y;
    const distance = Math.sqrt(
      Math.pow(targetX - startX, 2) + Math.pow(targetY - startY, 2)
    );

    // Duration based on distance (min 0.5s, max 2s)
    const duration = Math.max(500, Math.min(distance / 100, 2000));

    // Animate position with Anime.js
    animate(albaRef.current, {
      translateX: [startX, targetX],
      translateY: [startY, targetY],
      duration: duration,
      easing: "easeInOutQuad",
      update: (anim) => {
        // Update position during animation for smooth following
        const progress = anim.progress / 100;
        const currentX = startX + (targetX - startX) * progress;
        const currentY = startY + (targetY - startY) * progress;
        setPosition({ x: currentX, y: currentY });
      },
      complete: () => {
        setPosition({ x: targetX, y: targetY });
        setState("awake");
        setIsClickMove(false);
      },
    });
  };

  // Use dragPosition during drag, position when not dragging
  // After drag ends, position is already updated to finalPos, so use position
  const currentPos = isDragging ? dragPosition : position;

  return (
    <div
      ref={albaRef}
      className="alba-companion fixed z-40 select-none pointer-events-none"
      style={{
        width: 128,
        height: 128,
        left: currentPos.x,
        top: currentPos.y,
        transform: isDragging ? "scale(1.1)" : "scale(1)",
        transition: isDragging ? "transform 0.2s" : "none",
      }}
    >
      <motion.div 
        className="relative w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
        onMouseDown={handleMouseDown}
        onMouseEnter={handleHover}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          if (!hasMoved && !isDragging) {
            const targetX = e.clientX - 64; // Center sprite
            const targetY = e.clientY - 64;
            const distance = Math.sqrt(
              Math.pow(targetX - position.x, 2) + Math.pow(targetY - position.y, 2)
            );

            // Only animate if distance > 50px
            if (distance > 50) {
              animateToPosition(targetX, targetY);
            }
            handleClick();
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
      </motion.div>
    </div>
  );
}

