"use client";

import { motion } from "framer-motion";
import { getRandomRotation, getRandomOffset } from "@/lib/utils";
import { organicFadeIn } from "@/lib/animations";
import { useMemo } from "react";

interface OrganicContainerProps {
  children: React.ReactNode;
  className?: string;
  withTexture?: boolean;
  color?: "green" | "earth" | "terracotta" | "beige";
}

export function OrganicContainer({
  children,
  className = "",
  withTexture = false,
  color = "beige",
}: OrganicContainerProps) {
  const rotation = getRandomRotation();
  const offsetX = getRandomOffset();
  const offsetY = getRandomOffset();

  const colorClasses = {
    green: "bg-organic-green/20 border-organic-green",
    earth: "bg-organic-earth/20 border-organic-earth",
    terracotta: "bg-organic-terracotta/20 border-organic-terracotta",
    beige: "bg-organic-beige border-cyber-charcoal",
  };

  // Generate more organic, hand-drawn blob path
  const blobPath = useMemo(() => {
    const points = 12;
    const radius = 50;
    const centerX = 50;
    const centerY = 50;
    const path: string[] = [];
    const variations = [8, 12, 15, 10, 18, 14, 11, 16, 9, 13, 17, 12];

    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const variation = variations[i % variations.length];
      const x = centerX + Math.cos(angle) * (radius + variation);
      const y = centerY + Math.sin(angle) * (radius + variation);
      if (i === 0) {
        path.push(`M ${x} ${y}`);
      } else if (i === points) {
        path.push(`L ${x} ${y} Z`);
      } else {
        // Use quadratic curves for smoother, more organic look
        const nextAngle = ((i + 1) / points) * Math.PI * 2;
        const nextX = centerX + Math.cos(nextAngle) * (radius + variations[(i + 1) % variations.length]);
        const nextY = centerY + Math.sin(nextAngle) * (radius + variations[(i + 1) % variations.length]);
        const controlX = (x + nextX) / 2 + (Math.cos(angle) * 5);
        const controlY = (y + nextY) / 2 + (Math.sin(angle) * 5);
        path.push(`Q ${controlX} ${controlY} ${nextX} ${nextY}`);
      }
    }
    return path.join(" ");
  }, []);

  return (
    <motion.div
      className={`relative ${className} ${withTexture ? "texture-paper" : ""} ${colorClasses[color]} border-3 hand-drawn-shadow`}
      style={{
        rotate: `${rotation}deg`,
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        borderRadius: `${20 + Math.random() * 10}% ${30 + Math.random() * 10}% ${25 + Math.random() * 10}% ${35 + Math.random() * 10}% / ${40 + Math.random() * 10}% ${25 + Math.random() * 10}% ${35 + Math.random() * 10}% ${30 + Math.random() * 10}%`,
      }}
      variants={organicFadeIn}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        rotate: `${rotation + 0.5}deg`,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={blobPath}
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

