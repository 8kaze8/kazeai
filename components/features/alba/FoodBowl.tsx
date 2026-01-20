"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAlbaStore } from "@/store/albaStore";

const BOWL_SIZE = 48;
const TASKBAR_HEIGHT = 56;

interface FoodBowlProps {
  onFoodReady: (position: { x: number; y: number }) => void;
}

export function FoodBowl({ onFoodReady }: FoodBowlProps) {
  const [bowlState, setBowlState] = useState<"empty" | "filled" | "eating">("empty");
  const [mounted, setMounted] = useState(false);
  const hasCalledAlbaRef = useRef(false);
  const { state: albaState, position: albaPosition } = useAlbaStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if Alba has arrived at the bowl and started eating
  useEffect(() => {
    if (bowlState === "filled") {
      const bowlCenterX = 20 + BOWL_SIZE / 2;
      const bowlCenterY = (typeof window !== "undefined" ? window.innerHeight : 800) - TASKBAR_HEIGHT - BOWL_SIZE - 20;
      const albaCenterX = albaPosition.x + 64;
      const albaCenterY = albaPosition.y + 64;

      const distance = Math.sqrt(
        Math.pow(bowlCenterX - albaCenterX, 2) + Math.pow(bowlCenterY - albaCenterY, 2)
      );

      // Alba arrived and is purring (eating)
      if (distance < 100 && albaState === "purring") {
        setBowlState("eating");
      }
    }
  }, [albaPosition.x, albaPosition.y, albaState, bowlState]);

  // Empty bowl when Alba finishes eating
  useEffect(() => {
    if (bowlState === "eating" && albaState === "awake") {
      const timer = setTimeout(() => {
        setBowlState("empty");
        hasCalledAlbaRef.current = false;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [albaState, bowlState]);

  const handleClick = () => {
    if (bowlState !== "empty" || hasCalledAlbaRef.current) return;

    hasCalledAlbaRef.current = true;
    setBowlState("filled");

    // Calculate bowl center position for Alba to come to
    const bowlX = 20 + BOWL_SIZE / 2 - 64;
    const bowlY = (typeof window !== "undefined" ? window.innerHeight : 800) - TASKBAR_HEIGHT - BOWL_SIZE - 20 - 64;

    // Notify Alba that food is ready
    onFoodReady({ x: Math.max(0, bowlX), y: bowlY });
  };

  if (!mounted) return null;

  const isEmpty = bowlState === "empty";
  const isFilled = bowlState === "filled" || bowlState === "eating";
  const isEating = bowlState === "eating";

  return (
    <motion.div
      className="fixed z-30 cursor-pointer select-none"
      style={{
        left: 20,
        bottom: TASKBAR_HEIGHT + 20,
        width: BOWL_SIZE,
        height: BOWL_SIZE,
      }}
      onClick={handleClick}
      whileHover={{ scale: isEmpty ? 1.1 : 1 }}
      whileTap={{ scale: isEmpty ? 0.95 : 1 }}
      title={isEmpty ? "Click to fill with food" : (isEating ? "Alba is eating..." : "Alba is coming...")}
    >
      {/* Bowl base */}
      <svg
        viewBox="0 0 48 48"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}
      >
        {/* Bowl outer - dark teal to match theme */}
        <ellipse
          cx="24"
          cy="32"
          rx="22"
          ry="12"
          fill="#1a3a3a"
          stroke="#25f4f4"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        {/* Bowl inner */}
        <ellipse
          cx="24"
          cy="30"
          rx="18"
          ry="9"
          fill="#0d2222"
        />
        {/* Bowl rim highlight */}
        <ellipse
          cx="24"
          cy="28"
          rx="18"
          ry="8"
          fill="none"
          stroke="#25f4f4"
          strokeWidth="1"
          strokeOpacity="0.2"
        />

        {/* Inner glow when empty */}
        {isEmpty && (
          <ellipse
            cx="24"
            cy="30"
            rx="14"
            ry="6"
            fill="#25f4f4"
            opacity="0.1"
          />
        )}

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="foodGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#cba6f7" />
            <stop offset="100%" stopColor="#9366cc" />
          </radialGradient>
        </defs>

        {/* Food inside bowl */}
        {isFilled && (
          <g>
            {/* Food pile base */}
            <ellipse
              cx="24"
              cy="28"
              rx="14"
              ry="6"
              fill="url(#foodGradient)"
            >
              {isEating && (
                <animate
                  attributeName="ry"
                  values="6;5;6;4.5;6"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              )}
            </ellipse>
            {/* Food kibbles */}
            <circle cx="18" cy="26" r="3" fill="#a6e3a1" opacity="0.9" />
            <circle cx="24" cy="25" r="3" fill="#cba6f7" opacity="0.9" />
            <circle cx="30" cy="26" r="3" fill="#a6e3a1" opacity="0.9" />
            <circle cx="21" cy="29" r="2.5" fill="#25f4f4" opacity="0.8" />
            <circle cx="27" cy="29" r="2.5" fill="#cba6f7" opacity="0.8" />
            <circle cx="24" cy="28" r="2" fill="#f9e2af" opacity="0.9" />
          </g>
        )}
      </svg>

      {/* Sparkle effect when empty */}
      {isEmpty && (
        <motion.div
          className="absolute -top-1 -right-1 text-primary text-sm"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ✨
        </motion.div>
      )}

      {/* Heart effect when eating */}
      {isEating && albaState === "purring" && (
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-400 text-lg pointer-events-none"
          animate={{
            y: [0, -15, -20],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ❤️
        </motion.div>
      )}

      {/* Paw icon when empty */}
      {isEmpty && (
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-primary/60"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🐾
        </motion.div>
      )}
    </motion.div>
  );
}
