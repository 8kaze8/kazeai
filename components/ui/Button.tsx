"use client";

import { motion } from "framer-motion";
import { getRandomRotation } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const rotation = getRandomRotation();

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative px-6 py-3 
        ${variant === "primary" ? "bg-organic-green text-white" : "bg-organic-beige text-cyber-charcoal"}
        ${className}
      `}
      style={{ rotate: `${rotation}deg` }}
      whileHover={{
        scale: 1.05,
        rotate: `${rotation + 1}deg`,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 5,5 Q 5,5 8,5 L 92,5 Q 95,5 95,8 L 95,92 Q 95,95 92,95 L 8,95 Q 5,95 5,92 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

