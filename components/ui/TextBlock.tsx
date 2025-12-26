"use client";

import { motion } from "framer-motion";
import { getRandomOffset } from "@/lib/utils";
import { organicFadeIn } from "@/lib/animations";

interface TextBlockProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export function TextBlock({
  children,
  className = "",
  align = "left",
}: TextBlockProps) {
  const offsetX = getRandomOffset();
  const offsetY = getRandomOffset();

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <motion.div
      className={`${alignmentClasses[align]} ${className}`}
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
      }}
      variants={organicFadeIn}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

