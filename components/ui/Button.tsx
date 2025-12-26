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
        relative px-8 py-4 font-black text-lg
        border-3 border-cyber-charcoal
        ${variant === "primary" ? "bg-organic-green text-white" : "bg-organic-beige text-cyber-charcoal"}
        hand-drawn-shadow
        ${className}
      `}
      style={{
        rotate: `${rotation}deg`,
        borderRadius: `${15 + Math.random() * 10}% ${25 + Math.random() * 10}% ${20 + Math.random() * 10}% ${30 + Math.random() * 10}% / ${35 + Math.random() * 10}% ${20 + Math.random() * 10}% ${30 + Math.random() * 10}% ${25 + Math.random() * 10}%`,
      }}
      whileHover={{
        scale: 1.08,
        rotate: `${rotation + 2}deg`,
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span className="relative z-10" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}>
        {children}
      </span>
    </motion.button>
  );
}

