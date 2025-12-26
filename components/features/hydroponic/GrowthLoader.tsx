"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlantStages } from "./PlantStages";

interface GrowthLoaderProps {
  onComplete?: () => void;
}

export function GrowthLoader({ onComplete }: GrowthLoaderProps) {
  const [stage, setStage] = useState<"seed" | "roots" | "stem" | "leaves" | "complete">("seed");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const stages: Array<"seed" | "roots" | "stem" | "leaves" | "complete"> = [
      "seed",
      "roots",
      "stem",
      "leaves",
      "complete",
    ];

    let currentIndex = 0;
    const timers: NodeJS.Timeout[] = [];

    const advanceStage = () => {
      if (currentIndex < stages.length - 1) {
        currentIndex++;
        setStage(stages[currentIndex]);
        if (currentIndex < stages.length - 1) {
          const timer = setTimeout(advanceStage, 1000);
          timers.push(timer);
        } else {
          // Complete
          const timer = setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 2000);
          timers.push(timer);
        }
      }
    };

    const timer = setTimeout(advanceStage, 500);
    timers.push(timer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-organic-off-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PlantStages stage={stage} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

