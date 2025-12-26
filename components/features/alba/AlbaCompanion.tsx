"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAlbaStore } from "@/store/albaStore";
import { useAlbaInteraction } from "@/hooks/useAlbaInteraction";
import { AlbaSprite } from "./AlbaSprite";
import { AlbaBubble } from "./AlbaBubble";

export function AlbaCompanion() {
  const { position, state } = useAlbaStore();
  const { handleHover, handleClick } = useAlbaInteraction();

  useEffect(() => {
    // Set initial position to bottom-right
    if (position.x === 0 && position.y === 0) {
      useAlbaStore.getState().setPosition({
        x: typeof window !== "undefined" ? window.innerWidth - 100 : 0,
        y: typeof window !== "undefined" ? window.innerHeight - 100 : 0,
      });
    }
  }, [position]);

  return (
    <motion.div
      className="fixed z-40 cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: state === "walking" ? [0, 10, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        x: { duration: 0.5, repeat: Infinity },
      }}
      onMouseEnter={handleHover}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <AlbaBubble />
        <AlbaSprite />
      </div>
    </motion.div>
  );
}

