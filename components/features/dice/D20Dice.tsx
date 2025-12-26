"use client";

import { motion } from "framer-motion";
import { diceRoll } from "@/lib/animations";
import { useDiceStore } from "@/store/diceStore";

export function D20Dice() {
  const { isRolling, currentRoll } = useDiceStore();

  return (
    <motion.div
      className="relative w-24 h-24"
      variants={diceRoll}
      animate={isRolling ? "rolling" : "initial"}
    >
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        className="text-cyber-charcoal"
      >
        {/* Simplified D20 shape - icosahedron projection */}
        <motion.polygon
          points="48,8 68,20 68,44 48,56 28,44 28,20"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="2"
          animate={isRolling ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1.5, repeat: isRolling ? Infinity : 0 }}
        />
        <motion.polygon
          points="48,56 68,44 68,68 48,80 28,68 28,44"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="2"
          animate={isRolling ? { rotate: -360 } : { rotate: 0 }}
          transition={{ duration: 1.5, repeat: isRolling ? Infinity : 0 }}
        />
        {currentRoll && (
          <motion.text
            x="48"
            y="52"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="24"
            fontWeight="bold"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            {currentRoll}
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}

