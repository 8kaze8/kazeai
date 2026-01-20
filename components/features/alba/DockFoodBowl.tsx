"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface DockFoodBowlProps {
  onFoodReady: () => void;
  isFilled: boolean;
}

export function DockFoodBowl({ onFoodReady, isFilled }: DockFoodBowlProps) {
  const handleClick = () => {
    if (!isFilled) {
      onFoodReady();
    }
  };

  return (
    <div
      className="h-full flex items-center px-2 hover:bg-white/5 border-b-2 border-transparent hover:border-primary/50 relative group cursor-pointer transition-colors"
      onClick={handleClick}
      title={isFilled ? "Alba is eating..." : "Click to fill with food"}
    >
      <motion.div
        className="relative w-10 h-10"
        whileHover={{ scale: isFilled ? 1 : 1.1 }}
        whileTap={{ scale: isFilled ? 1 : 0.95 }}
      >
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
        >
          {/* Bowl outer */}
          <ellipse
            cx="24"
            cy="32"
            rx="20"
            ry="10"
            fill="#1a3a3a"
            stroke="#25f4f4"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          {/* Bowl inner */}
          <ellipse
            cx="24"
            cy="30"
            rx="16"
            ry="7"
            fill="#0d2222"
          />
          {/* Bowl rim highlight */}
          <ellipse
            cx="24"
            cy="28"
            rx="16"
            ry="6"
            fill="none"
            stroke="#25f4f4"
            strokeWidth="1"
            strokeOpacity="0.3"
          />

          {/* Inner glow when empty */}
          {!isFilled && (
            <ellipse
              cx="24"
              cy="30"
              rx="12"
              ry="5"
              fill="#25f4f4"
              opacity="0.15"
            />
          )}

          {/* Gradient for food */}
          <defs>
            <radialGradient id="dockFoodGradient" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#cba6f7" />
              <stop offset="100%" stopColor="#9366cc" />
            </radialGradient>
          </defs>

          {/* Food inside bowl */}
          {isFilled && (
            <g>
              {/* Food pile */}
              <ellipse
                cx="24"
                cy="27"
                rx="12"
                ry="5"
                fill="url(#dockFoodGradient)"
              >
                <animate
                  attributeName="ry"
                  values="5;4.5;5;4;5"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </ellipse>
              {/* Kibbles */}
              <circle cx="19" cy="25" r="2.5" fill="#a6e3a1" opacity="0.9" />
              <circle cx="24" cy="24" r="2.5" fill="#cba6f7" opacity="0.9" />
              <circle cx="29" cy="25" r="2.5" fill="#a6e3a1" opacity="0.9" />
              <circle cx="21" cy="28" r="2" fill="#25f4f4" opacity="0.8" />
              <circle cx="27" cy="28" r="2" fill="#cba6f7" opacity="0.8" />
            </g>
          )}
        </svg>

        {/* Sparkle effect when empty */}
        {!isFilled && (
          <motion.div
            className="absolute -top-1 -right-1 text-primary text-xs"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            +
          </motion.div>
        )}
      </motion.div>

      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-28 bg-gray-900 border border-primary/30 text-white text-xs p-2 rounded shadow-xl text-center z-50">
        {isFilled ? "Alba is eating!" : "Feed Alba"}
      </div>
    </div>
  );
}
