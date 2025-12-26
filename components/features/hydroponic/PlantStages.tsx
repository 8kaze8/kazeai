"use client";

import { motion } from "framer-motion";

interface PlantStagesProps {
  stage: "seed" | "roots" | "stem" | "leaves" | "complete";
}

export function PlantStages({ stage }: PlantStagesProps) {
  return (
    <svg
      width="100"
      height="150"
      viewBox="0 0 100 150"
      className="text-organic-green"
    >
      {/* Seed */}
      {stage !== "seed" && (
        <motion.circle
          cx="50"
          cy="140"
          r="5"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Roots */}
      {(stage === "roots" || stage === "stem" || stage === "leaves" || stage === "complete") && (
        <>
          <motion.path
            d="M 50,140 Q 45,145 40,150"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path
            d="M 50,140 Q 55,145 60,150"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </>
      )}

      {/* Stem */}
      {(stage === "stem" || stage === "leaves" || stage === "complete") && (
        <motion.path
          d="M 50,140 Q 48,100 50,60 Q 52,40 50,20"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
      )}

      {/* Leaves */}
      {(stage === "leaves" || stage === "complete") && (
        <>
          <motion.path
            d="M 50,60 Q 40,55 35,50 Q 30,45 25,40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          />
          <motion.path
            d="M 50,60 Q 60,55 65,50 Q 70,45 75,40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.7 }}
          />
          <motion.path
            d="M 50,40 Q 45,35 40,30"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.9 }}
          />
        </>
      )}

      {/* Complete - pulse animation */}
      {stage === "complete" && (
        <motion.circle
          cx="50"
          cy="20"
          r="3"
          fill="currentColor"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </svg>
  );
}

