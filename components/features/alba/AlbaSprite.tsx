"use client";

import { motion } from "framer-motion";
import { useAlbaStore } from "@/store/albaStore";
import Image from "next/image";

export function AlbaSprite() {
  const { state } = useAlbaStore();

  // Map state to sprite file
  const getSpriteFile = () => {
    switch (state) {
      case "sleeping":
        return "/sprites/alba/alba-sleeping.png";
      case "walking":
        return "/sprites/alba/alba-walking.png";
      case "awake":
        return "/sprites/alba/alba-sitting.png";
      case "purring":
        return "/sprites/alba/alba-purring.png";
      case "curious":
        return "/sprites/alba/alba-curious.png";
      case "angry":
        return "/sprites/alba/alba-angry.png";
      default:
        return "/sprites/alba/alba-sitting.png";
    }
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
      default:
        return null;
    }
  };

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
            ? { scale: [1, 1.05, 1], rotate: [-1, 1, -1] }
            : state === "curious"
            ? { rotate: [-2, 2, -2] }
            : state === "angry"
            ? { 
                scale: [1, 1.15, 1], 
                x: [-4, 4, -4, 4, -4],
                rotate: [-3, 3, -3, 3, -3]
              }
            : {}
        }
        transition={{
          duration: state === "sleeping" ? 2 : state === "purring" ? 0.3 : state === "angry" ? 0.15 : 1,
          repeat: state === "sleeping" || state === "purring" || state === "curious" || state === "angry" ? Infinity : 0,
          ease: state === "angry" ? "linear" : "easeInOut",
        }}
      >
        <Image
          src={getSpriteFile()}
          alt={`Alba ${state}`}
          width={128}
          height={128}
          className="w-full h-full object-contain"
          style={{ imageRendering: "pixelated" }}
          unoptimized
        />
      </motion.div>
    </div>
  );
}

