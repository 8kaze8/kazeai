"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAlbaStore } from "@/store/albaStore";

export function AlbaBubble() {
  const { message } = useAlbaStore();

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-white rounded-lg shadow-lg border-2 border-background-dark text-sm text-background-dark whitespace-nowrap z-50"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-1"
            width="12"
            height="8"
            viewBox="0 0 12 8"
          >
            <path
              d="M 6,8 L 0,0 L 12,0 Z"
              fill="white"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

