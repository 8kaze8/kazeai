"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDiceStore } from "@/store/diceStore";

// Dynamic import for DiceBox since it needs browser APIs
let DiceBox: any = null;

export function D20Dice() {
  const { isRolling, currentRoll, transitionType, setRollResult } = useDiceStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const diceBoxRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const hasRolledRef = useRef(false);

  // Initialize DiceBox
  useEffect(() => {
    const initDiceBox = async () => {
      if (typeof window === "undefined" || diceBoxRef.current) return;

      try {
        // Dynamic import
        const module = await import("@3d-dice/dice-box");
        DiceBox = module.default || module.DiceBox;

        if (!containerRef.current) return;

        const box = new DiceBox("#dice-canvas", {
          assetPath: "/assets/",
          theme: "default",
          themeColor: "#25f4f4",
          scale: 14, // Even bigger dice
          gravity: 1.5,
          spinForce: 8,
          throwForce: 5,
          startingHeight: 10,
          settleTimeout: 3000,
          lightIntensity: 1.3,
          shadowTransparency: 0.3,
        });

        await box.init();
        diceBoxRef.current = box;
        setIsInitialized(true);

        // Listen for roll complete - send result to store
        box.onRollComplete = (results: any) => {
          if (results && results[0]) {
            const rollValue = results[0].value;
            setRollResult(rollValue);
          }
        };
      } catch (error) {
        console.error("Failed to initialize DiceBox:", error);
      }
    };

    initDiceBox();

    return () => {
      if (diceBoxRef.current) {
        try {
          diceBoxRef.current.clear();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, [setRollResult]);

  // Handle rolling
  useEffect(() => {
    if (!isRolling || !isInitialized || !diceBoxRef.current) return;

    // Only roll once per isRolling cycle
    if (hasRolledRef.current) return;
    hasRolledRef.current = true;

    const rollDice = async () => {
      try {
        // Clear previous dice
        diceBoxRef.current.clear();

        // Roll a d20
        await diceBoxRef.current.roll("1d20");
      } catch (error) {
        console.error("Roll error:", error);
      }
    };

    rollDice();
  }, [isRolling, isInitialized]);

  // Reset hasRolled when rolling stops
  useEffect(() => {
    if (!isRolling) {
      hasRolledRef.current = false;
    }
  }, [isRolling]);

  const getColors = () => {
    switch (transitionType) {
      case "criticalFail":
        return {
          primary: "#ef4444",
          glow: "rgba(239, 68, 68, 0.8)",
        };
      case "criticalSuccess":
        return {
          primary: "#25f4f4",
          glow: "rgba(37, 244, 244, 1)",
        };
      default:
        return {
          primary: "#25f4f4",
          glow: "rgba(37, 244, 244, 0.6)",
        };
    }
  };

  const colors = getColors();

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Glow effect */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{
          scale: currentRoll ? [1, 1.3, 1.1] : [1, 1.15, 1],
          opacity: currentRoll ? [0.5, 0.9, 0.7] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: currentRoll ? 0.5 : 1.5,
          repeat: currentRoll ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3D Dice Canvas Container - Much bigger now */}
      <div
        ref={containerRef}
        id="dice-canvas"
        className="relative z-10"
        style={{
          width: 400,
          height: 400,
        }}
      />

      {/* Fallback / Loading state */}
      {!isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
}
