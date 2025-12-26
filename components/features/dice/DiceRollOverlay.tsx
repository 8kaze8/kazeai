"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDiceStore } from "@/store/diceStore";
import { useNavigationStore } from "@/store/navigationStore";
import { D20Dice } from "./D20Dice";
import { criticalFail, criticalSuccess, standardTransition } from "@/lib/animations";

export function DiceRollOverlay() {
  const router = useRouter();
  const { isRolling, currentRoll, transitionType, navigateTo, completeTransition } = useDiceStore();
  const { setIsTransitioning } = useNavigationStore();

  // Auto-navigate after animation completes
  useEffect(() => {
    if (isRolling && navigateTo && currentRoll !== null) {
      const timer = setTimeout(() => {
        completeTransition();
        router.push(navigateTo);
        setIsTransitioning(false);
      }, 2500); // Wait for roll animation (1.5s) + display (1s)

      return () => clearTimeout(timer);
    }
  }, [isRolling, navigateTo, currentRoll, completeTransition, router, setIsTransitioning]);

  const getOverlayStyle = () => {
    switch (transitionType) {
      case "criticalFail":
        return "bg-red-50";
      case "criticalSuccess":
        return "bg-yellow-50";
      default:
        return "bg-organic-off-white";
    }
  };

  const getMessage = () => {
    switch (transitionType) {
      case "criticalFail":
        return "Critical Fail! Automation Error: Human intervention required";
      case "criticalSuccess":
        return "Natural 20! Critical Success!";
      default:
        return `Rolled: ${currentRoll}`;
    }
  };

  return (
    <AnimatePresence>
      {isRolling && (
        <motion.div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${getOverlayStyle()}`}
          variants={standardTransition}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={
              transitionType === "criticalFail"
                ? criticalFail
                : transitionType === "criticalSuccess"
                ? criticalSuccess
                : standardTransition
            }
            animate={
              transitionType === "criticalFail"
                ? "shake"
                : transitionType === "criticalSuccess"
                ? "glow"
                : "visible"
            }
            className="flex flex-col items-center gap-4"
          >
            <D20Dice />
            {currentRoll && (
              <motion.p
                className="text-2xl font-bold text-cyber-charcoal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                {getMessage()}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

