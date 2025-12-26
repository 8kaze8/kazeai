"use client";

import { motion } from "framer-motion";
import { useDiceStore } from "@/store/diceStore";

export function D20Dice() {
  const { isRolling, currentRoll, transitionType } = useDiceStore();

  const getDiceColor = () => {
    switch (transitionType) {
      case "criticalFail":
        return "text-red-400";
      case "criticalSuccess":
        return "text-primary";
      default:
        return "text-primary";
    }
  };

  const getGlowColor = () => {
    switch (transitionType) {
      case "criticalFail":
        return "rgba(239, 68, 68, 0.8)";
      case "criticalSuccess":
        return "rgba(37, 244, 244, 1)";
      default:
        return "rgba(37, 244, 244, 0.6)";
    }
  };

  return (
    <div className="relative flex items-center justify-center perspective-1000">
      <motion.div
        className="relative"
        style={{
          width: "80px",
          height: "80px",
          transformStyle: "preserve-3d",
        }}
        animate={
          isRolling
            ? {
                rotateX: [0, 360, 720, 1080],
                rotateY: [0, 360, 720, 1080],
                rotateZ: [0, 180, 360, 540],
              }
            : {
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
              }
        }
        transition={{
          duration: 1.5,
          ease: "easeOut",
          repeat: isRolling ? Infinity : 0,
        }}
      >
        {/* 3D D20 Icosahedron - Simplified but realistic */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          className={getDiceColor()}
          style={{
            filter: `drop-shadow(0 0 15px ${getGlowColor()})`,
          }}
        >
          {/* Top pyramid faces */}
          <motion.polygon
            points="40,10 60,25 40,40 20,25"
            fill="currentColor"
            fillOpacity="0.3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            animate={isRolling ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0.3 }}
            transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0 }}
          />
          <motion.polygon
            points="40,10 55,30 40,50 25,30"
            fill="currentColor"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            animate={isRolling ? { opacity: [0.25, 0.5, 0.25] } : { opacity: 0.25 }}
            transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0, delay: 0.1 }}
          />
          
          {/* Middle band */}
          <motion.polygon
            points="25,30 55,30 50,50 30,50"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            animate={isRolling ? { opacity: [0.2, 0.4, 0.2] } : { opacity: 0.2 }}
            transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0, delay: 0.15 }}
          />
          
          {/* Bottom pyramid faces */}
          <motion.polygon
            points="40,50 55,30 40,70 25,30"
            fill="currentColor"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            animate={isRolling ? { opacity: [0.25, 0.5, 0.25] } : { opacity: 0.25 }}
            transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0, delay: 0.2 }}
          />
          <motion.polygon
            points="40,40 60,25 40,70 20,25"
            fill="currentColor"
            fillOpacity="0.3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            animate={isRolling ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0.3 }}
            transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0, delay: 0.25 }}
          />
          
          {/* Edges for 3D effect */}
          <motion.line
            x1="40"
            y1="10"
            x2="40"
            y2="70"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            animate={isRolling ? { opacity: [0.5, 0.8, 0.5] } : { opacity: 0.5 }}
            transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0 }}
          />
          <motion.line
            x1="20"
            y1="25"
            x2="60"
            y2="25"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.4"
            animate={isRolling ? { opacity: [0.4, 0.7, 0.4] } : { opacity: 0.4 }}
            transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0, delay: 0.1 }}
          />
          
          {/* Center number */}
          {currentRoll && (
            <motion.text
              x="40"
              y="45"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="28"
              fontWeight="bold"
              fill="currentColor"
              className="font-mono"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              style={{
                textShadow: `0 0 10px ${getGlowColor()}, 0 0 20px ${getGlowColor()}`,
              }}
            >
              {currentRoll}
            </motion.text>
          )}
        </svg>
      </motion.div>
    </div>
  );
}
