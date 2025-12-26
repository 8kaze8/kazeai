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
        return "bg-[#1a0d0d] border-red-500/30";
      case "criticalSuccess":
        return "bg-[#1a1a0d] border-primary/50";
      default:
        return "bg-background-dark border-primary/30";
    }
  };

  const getMessage = () => {
    switch (transitionType) {
      case "criticalFail":
        return "CRITICAL FAIL! // Automation Error: Human intervention required";
      case "criticalSuccess":
        return "NATURAL 20! // CRITICAL SUCCESS!";
      default:
        return `ROLLED: ${currentRoll}`;
    }
  };

  const getMessageColor = () => {
    switch (transitionType) {
      case "criticalFail":
        return "text-red-400";
      case "criticalSuccess":
        return "text-primary";
      default:
        return "text-primary";
    }
  };

  return (
    <AnimatePresence>
      {isRolling && (
        <motion.div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${getOverlayStyle()} border-2 relative overflow-hidden`}
          variants={standardTransition}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Scanline overlay for retro effect */}
          <div className="absolute inset-0 scanline opacity-10 pointer-events-none"></div>
          
          {/* Grid pattern background */}
          <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-5 pointer-events-none"></div>

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
            className="flex flex-col items-center gap-6 relative z-10"
          >
            {/* Terminal-style header */}
            <motion.div
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-primary/60 text-xs font-mono uppercase tracking-widest">
                SKILL CHECK // D20 ROLL
              </span>
            </motion.div>

            <D20Dice />
            
            {currentRoll && (
              <motion.div
                className="flex flex-col items-center gap-2 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <motion.p
                  className={`text-xl md:text-2xl font-bold font-mono ${getMessageColor()} tracking-wider text-center`}
                  style={{
                    textShadow: transitionType === "criticalSuccess" 
                      ? "0 0 20px rgba(37,244,244,0.8), 0 0 40px rgba(37,244,244,0.4)" 
                      : transitionType === "criticalFail"
                      ? "0 0 20px rgba(239,68,68,0.8), 0 0 40px rgba(239,68,68,0.4)"
                      : "0 0 10px rgba(37,244,244,0.5)"
                  }}
                >
                  {getMessage()}
                </motion.p>
                <motion.p
                  className="text-white/40 text-xs font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  {transitionType === "criticalSuccess" 
                    ? ">> System access granted <<"
                    : transitionType === "criticalFail"
                    ? ">> Error detected, retrying... <<"
                    : ">> Transitioning... <<"
                  }
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

