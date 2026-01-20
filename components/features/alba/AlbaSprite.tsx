"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAlbaStore } from "@/store/albaStore";
import Image from "next/image";

// Sprite sheet config for walking animation
const WALKING_SPRITE = {
  src: "/sprites/alba/alba-walking-sheet.png",
  cols: 4,
  rows: 4,
  totalFrames: 16,
  frameWidth: 128,
  frameHeight: 128,
  fps: 5, // Slower walking animation for clearer visibility
};

export function AlbaSprite() {
  const { state, direction } = useAlbaStore();
  const [walkFrame, setWalkFrame] = useState(0);

  // Animate walking sprite sheet
  useEffect(() => {
    if (state !== "walking") {
      setWalkFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setWalkFrame((prev) => (prev + 1) % WALKING_SPRITE.totalFrames);
    }, 1000 / WALKING_SPRITE.fps);

    return () => clearInterval(interval);
  }, [state]);

  // Map state to sprite file
  const getSpriteFile = () => {
    switch (state) {
      case "sleeping":
        return "/sprites/alba/alba-sleeping.png";
      case "walking":
        return null; // Use sprite sheet instead
      case "awake":
        return "/sprites/alba/alba-sitting.png";
      case "purring":
        return "/sprites/alba/alba-purring.png";
      case "curious":
        return "/sprites/alba/alba-curious.png";
      case "angry":
        return "/sprites/alba/alba-angry.png";
      case "eating":
        return "/sprites/alba/alba-sitting.png"; // Use sitting sprite with eating animation
      default:
        return "/sprites/alba/alba-sitting.png";
    }
  };

  // Calculate sprite sheet position for walking
  const getWalkingSpritePosition = () => {
    const col = walkFrame % WALKING_SPRITE.cols;
    const row = Math.floor(walkFrame / WALKING_SPRITE.cols);
    return {
      x: col * WALKING_SPRITE.frameWidth,
      y: row * WALKING_SPRITE.frameHeight,
    };
  };

  // Get symbol for each state
  const getSymbol = () => {
    switch (state) {
      case "curious":
        return (
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#cba6f7] font-bold text-xl"
            animate={{ y: [0, -3, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            ?
          </motion.div>
        );
      case "purring":
        return (
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#cba6f7] font-bold text-sm"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            PURR!
          </motion.div>
        );
      case "angry":
        return (
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-400 font-bold text-2xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 15, -15, 0],
              opacity: [1, 0.8, 1]
            }}
            transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut" }}
            style={{
              textShadow: "0 0 10px rgba(239, 68, 68, 0.8), 0 0 20px rgba(239, 68, 68, 0.6)",
            }}
          >
            !
          </motion.div>
        );
      case "eating":
        return (
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#cba6f7] font-bold text-sm"
            animate={{
              y: [0, -3, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            nom nom
          </motion.div>
        );
      default:
        return null;
    }
  };

  const spriteFile = getSpriteFile();
  const walkPos = getWalkingSpritePosition();

  return (
    <div className="relative w-32 h-32">
      {/* Symbol above head */}
      {getSymbol()}

      {/* Sprite image */}
      <motion.div
        className="relative w-32 h-32"
        animate={
          state === "sleeping"
            ? { y: [0, -2, 0] }
            : state === "purring"
            ? { scale: [1, 1.08, 1, 1.08, 1], rotate: [-2, 2, -2, 2, -2], y: [0, -3, 0, -3, 0] }
            : state === "curious"
            ? { rotate: [-2, 2, -2] }
            : state === "angry"
            ? {
                scale: [1, 1.15, 1],
                x: [-4, 4, -4, 4, -4],
                rotate: [-3, 3, -3, 3, -3]
              }
            : state === "eating"
            ? {
                y: [0, 6, 0], // Slower, gentler head bob
                rotate: [-1, 1, -1],
                scale: [1, 0.97, 1]
              }
            : {}
        }
        transition={{
          duration: state === "sleeping" ? 2 : state === "purring" ? 0.6 : state === "angry" ? 0.15 : state === "eating" ? 1.2 : 1,
          repeat: state === "sleeping" || state === "purring" || state === "curious" || state === "angry" || state === "eating" ? Infinity : 0,
          ease: state === "angry" ? "linear" : "easeInOut",
        }}
      >
        {state === "walking" ? (
          // Walking animation using sprite sheet
          <div
            className="w-32 h-32 overflow-hidden"
            style={{
              imageRendering: "pixelated",
              transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
            }}
          >
            <div
              style={{
                width: WALKING_SPRITE.frameWidth * WALKING_SPRITE.cols,
                height: WALKING_SPRITE.frameHeight * WALKING_SPRITE.rows,
                backgroundImage: `url(${WALKING_SPRITE.src})`,
                backgroundSize: "100% 100%",
                transform: `translate(-${walkPos.x}px, -${walkPos.y}px)`,
                imageRendering: "pixelated",
              }}
            />
          </div>
        ) : (
          // Static sprite for other states
          <Image
            src={spriteFile || "/sprites/alba/alba-sitting.png"}
            alt={`Alba ${state}`}
            width={128}
            height={128}
            className="w-full h-full object-contain"
            style={{ imageRendering: "pixelated" }}
            unoptimized
          />
        )}
      </motion.div>
    </div>
  );
}

