"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAlbaStore } from "@/store/albaStore";
import { AlbaSprite } from "./AlbaSprite";
import { AlbaBubble } from "./AlbaBubble";

interface AlbaCompanionProps {
  onEatingChange?: (isEating: boolean) => void;
  foodBowlPosition?: { x: number; y: number } | null;
}

export function AlbaCompanion({ onEatingChange, foodBowlPosition }: AlbaCompanionProps) {
  const { position, state, setPosition, setState, showMessage } = useAlbaStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dragDataRef = useRef({
    startX: 0,
    startY: 0,
    startMouseX: 0,
    startMouseY: 0,
    wasDragged: false,
  });

  // Initialize position on mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const currentPos = useAlbaStore.getState().position;
      if (currentPos.x === 0 && currentPos.y === 0) {
        setPosition({
          x: window.innerWidth - 180,
          y: window.innerHeight - 220,
        });
      }
    }

  }, [setPosition]);

  // Drag logic - same as DesktopIcon
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
        if (state !== "walking") setState("walking");
      }

      // Calculate new position with bounds
      const spriteSize = 128;
      const taskbarHeight = 56;
      const newX = Math.max(0, Math.min(
        window.innerWidth - spriteSize,
        dragDataRef.current.startX + deltaX
      ));
      const newY = Math.max(0, Math.min(
        window.innerHeight - taskbarHeight - spriteSize,
        dragDataRef.current.startY + deltaY
      ));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(false);

      // Return to awake state after drag
      setTimeout(() => {
        setState("awake");
        dragDataRef.current.wasDragged = false;
      }, 100);
    };

    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("mouseup", handleMouseUp, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove, true);
      document.removeEventListener("mouseup", handleMouseUp, true);
    };
  }, [isDragging, setPosition, setState, state]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    dragDataRef.current = {
      startX: position.x,
      startY: position.y,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      wasDragged: false,
    };

    setIsDragging(true);
  };

  // Smooth animation to target position
  const animateToPosition = (targetX: number, targetY: number, duration: number = 300) => {
    const startX = position.x;
    const startY = position.y;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentX = startX + (targetX - startX) * eased;
      const currentY = startY + (targetY - startY) * eased;

      setPosition({ x: currentX, y: currentY });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleClick = () => {
    // Only react if we didn't drag
    if (dragDataRef.current.wasDragged) return;

    // Track clicks for angry state
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    // Clear previous timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Reset click count after 2 seconds
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2000);

    // 3 clicks = angry!
    if (newClickCount >= 3) {
      setState("angry");
      showMessage("HISSSS! 😾");
      setClickCount(0);

      // Stay angry for 5 seconds
      setTimeout(() => {
        setState("awake");
      }, 5000);
      return;
    }

    // First click = curious, show message
    if (newClickCount === 1) {
      setState("curious");
      showMessage();
    } else if (newClickCount === 2) {
      // Second click = still curious but different message
      showMessage("Mrrow? 🐱");
    }

    // Move AWAY from click - much more noticeable distance
    const moveDirection = Math.random() > 0.5 ? 1 : -1;
    const offsetX = moveDirection * (80 + Math.random() * 60); // 80-140px
    const offsetY = (Math.random() - 0.5) * 40; // -20 to +20px

    const spriteSize = 128;
    const taskbarHeight = 56;
    const targetX = Math.max(0, Math.min(window.innerWidth - spriteSize, position.x + offsetX));
    const targetY = Math.max(0, Math.min(window.innerHeight - taskbarHeight - spriteSize, position.y + offsetY));

    animateToPosition(targetX, targetY, 400); // Slower, more visible movement

    // Return to awake after curious
    setTimeout(() => {
      if (useAlbaStore.getState().state === "curious") {
        setState("awake");
      }
    }, 1500);
  };

  // Hover = curious
  const handleMouseEnter = () => {
    if (state === "awake" && !isDragging) {
      setState("curious");
    }
  };

  const handleMouseLeave = () => {
    if (state === "curious" && !isDragging) {
      setState("awake");
    }
  };

  // Food bowl - walk to it and eat
  useEffect(() => {
    if (foodBowlPosition && !isEating) {
      setIsEating(true);
      onEatingChange?.(true);
      showMessage("Yummy! 😋");
      setState("walking");

      // Calculate target position (above the food bowl)
      const targetX = Math.max(0, Math.min(window.innerWidth - 128, foodBowlPosition.x - 64));
      const targetY = Math.max(0, Math.min(window.innerHeight - 56 - 128, foodBowlPosition.y - 140));

      // Animate walking to food bowl
      const startX = position.x;
      const startY = position.y;
      const distance = Math.sqrt(Math.pow(targetX - startX, 2) + Math.pow(targetY - startY, 2));
      const duration = Math.max(800, Math.min(distance * 2, 2000));
      const startTime = Date.now();

      const animateWalk = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing
        const eased = 1 - Math.pow(1 - progress, 3);

        const currentX = startX + (targetX - startX) * eased;
        const currentY = startY + (targetY - startY) * eased;

        setPosition({ x: currentX, y: currentY });

        if (progress < 1) {
          requestAnimationFrame(animateWalk);
        } else {
          // Arrived at food bowl - start eating
          setState("eating");

          // Eat for 3 seconds
          setTimeout(() => {
            setIsEating(false);
            onEatingChange?.(false);
            setState("purring");
            showMessage("Prrr... That was delicious! 😺");

            setTimeout(() => {
              setState("awake");
            }, 3000);
          }, 3000);
        }
      };

      requestAnimationFrame(animateWalk);
    }
  }, [foodBowlPosition]);

  if (!mounted) return null;

  return (
    <div
      className="alba-companion fixed z-40 select-none"
      style={{
        width: 128,
        height: 128,
        left: position.x,
        top: position.y,
        transform: isDragging ? "scale(1.1)" : "scale(1)",
        zIndex: isDragging ? 9999 : 40,
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging ? "transform 0.1s" : "transform 0.1s",
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        whileHover={{ scale: isDragging ? 1 : 1.05 }}
      >
        {/* Angry glow effect */}
        {state === "angry" && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Eating glow */}
        {state === "eating" && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(203, 166, 247, 0.3) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Purring glow */}
        {state === "purring" && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37, 244, 244, 0.2) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Curious glow */}
        {state === "curious" && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(203, 166, 247, 0.15) 0%, transparent 70%)",
              filter: "blur(6px)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 1,
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
