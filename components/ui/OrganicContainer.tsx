"use client";

import { motion } from "framer-motion";
import { getRandomRotation, getRandomOffset } from "@/lib/utils";
import { organicFadeIn } from "@/lib/animations";

interface OrganicContainerProps {
  children: React.ReactNode;
  className?: string;
  withTexture?: boolean;
}

export function OrganicContainer({
  children,
  className = "",
  withTexture = false,
}: OrganicContainerProps) {
  const rotation = getRandomRotation();
  const offsetX = getRandomOffset();
  const offsetY = getRandomOffset();

  // Generate blob-like SVG path
  const generateBlobPath = () => {
    const points = 8;
    const radius = 50;
    const centerX = 50;
    const centerY = 50;
    const path: string[] = [];

    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const variation = 5 + Math.random() * 10;
      const x = centerX + Math.cos(angle) * (radius + variation);
      const y = centerY + Math.sin(angle) * (radius + variation);
      if (i === 0) {
        path.push(`M ${x} ${y}`);
      } else {
        path.push(`L ${x} ${y}`);
      }
    }
    path.push("Z");
    return path.join(" ");
  };

  return (
    <motion.div
      className={`relative ${className} ${withTexture ? "texture-paper" : ""}`}
      style={{
        rotate: `${rotation}deg`,
        transform: `translate(${offsetX}px, ${offsetY}px)`,
      }}
      variants={organicFadeIn}
      initial="hidden"
      animate="visible"
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={generateBlobPath()}
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

