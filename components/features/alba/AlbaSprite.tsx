"use client";

import { motion } from "framer-motion";
import { useAlbaStore } from "@/store/albaStore";

export function AlbaSprite() {
  const { state } = useAlbaStore();

  // Simple SVG-based cat sprite (placeholder until actual sprites are generated)
  const renderSprite = () => {
    switch (state) {
      case "sleeping":
        return (
          <motion.svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Sleeping cat - curled up */}
            <circle cx="32" cy="40" r="20" fill="#D4A574" />
            <circle cx="28" cy="38" r="3" fill="#2C2C2C" />
            <circle cx="36" cy="38" r="3" fill="#2C2C2C" />
            <ellipse cx="32" cy="42" rx="8" ry="4" fill="#C97D60" />
          </motion.svg>
        );
      case "awake":
        return (
          <motion.svg width="64" height="64" viewBox="0 0 64 64">
            {/* Awake cat - sitting */}
            <circle cx="32" cy="35" r="18" fill="#D4A574" />
            <circle cx="28" cy="32" r="2" fill="#2C2C2C" />
            <circle cx="36" cy="32" r="2" fill="#2C2C2C" />
            <path d="M 28,36 Q 32,38 36,36" stroke="#2C2C2C" strokeWidth="1.5" fill="none" />
            <polygon points="24,28 26,24 28,28" fill="#C97D60" />
            <polygon points="36,28 38,24 40,28" fill="#C97D60" />
          </motion.svg>
        );
      case "walking":
        return (
          <motion.svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {/* Walking cat */}
            <circle cx="32" cy="30" r="16" fill="#D4A574" />
            <circle cx="28" cy="28" r="2" fill="#2C2C2C" />
            <circle cx="36" cy="28" r="2" fill="#2C2C2C" />
            <ellipse cx="32" cy="32" rx="6" ry="3" fill="#C97D60" />
            <rect x="26" y="42" width="4" height="8" fill="#D4A574" />
            <rect x="34" y="42" width="4" height="8" fill="#D4A574" />
          </motion.svg>
        );
      case "purring":
        return (
          <motion.svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [-1, 1, -1],
            }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            {/* Purring cat */}
            <circle cx="32" cy="32" r="18" fill="#D4A574" />
            <circle cx="28" cy="30" r="2.5" fill="#2C2C2C" />
            <circle cx="36" cy="30" r="2.5" fill="#2C2C2C" />
            <path d="M 26,36 Q 32,40 38,36" stroke="#2C2C2C" strokeWidth="2" fill="none" />
          </motion.svg>
        );
      case "curious":
        return (
          <motion.svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {/* Curious cat - head follows cursor */}
            <circle cx="32" cy="30" r="16" fill="#D4A574" />
            <circle cx="30" cy="28" r="2.5" fill="#2C2C2C" />
            <circle cx="34" cy="28" r="2.5" fill="#2C2C2C" />
            <ellipse cx="32" cy="32" rx="5" ry="3" fill="#C97D60" />
            <polygon points="24,26 26,22 28,26" fill="#C97D60" />
            <polygon points="36,26 38,22 40,26" fill="#C97D60" />
          </motion.svg>
        );
      default:
        return null;
    }
  };

  return <div className="relative">{renderSprite()}</div>;
}

