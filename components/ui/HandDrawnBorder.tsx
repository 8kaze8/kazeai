"use client";

import { motion } from "framer-motion";
import { getRandomRotation } from "@/lib/utils";

interface HandDrawnBorderProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
}

export function HandDrawnBorder({
  children,
  className = "",
  rotation,
}: HandDrawnBorderProps) {
  const rot = rotation ?? getRandomRotation();

  // Generate organic SVG path (slightly imperfect rectangle)
  const generatePath = () => {
    const offset = 2;
    return `M ${10 + offset},${10} 
            Q ${10},${10} ${10},${10 + offset}
            L ${10},${90 - offset}
            Q ${10},${90} ${10 + offset},${90}
            L ${90 - offset},${90}
            Q ${90},${90} ${90},${90 - offset}
            L ${90},${10 + offset}
            Q ${90},${10} ${90 - offset},${10}
            Z`;
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ rotate: `${rot}deg` }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={generatePath()}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

