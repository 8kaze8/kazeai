"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDiceStore } from "@/store/diceStore";
import { useAlbaStore } from "@/store/albaStore";
import { D20Dice } from "./D20Dice";
import { Confetti } from "@/components/magicui/confetti";
import { Sparkles } from "@/components/magicui/sparkles";
import { GlitchText } from "@/components/magicui/glitch-text";
import { ScreenCrack } from "@/components/magicui/screen-crack";
import { BorderBeam } from "@/components/magicui/border-beam";

export function DiceRollOverlay() {
  const router = useRouter();
  const { isRolling, currentRoll, transitionType, navigateTo, completeTransition } = useDiceStore();
  const { setState: setAlbaState } = useAlbaStore();
  const [phase, setPhase] = useState<"rolling" | "result" | "transitioning">("rolling");

  // Reset phase when rolling starts
  useEffect(() => {
    if (isRolling) {
      setPhase("rolling");
    }
  }, [isRolling]);

  // Handle roll result
  useEffect(() => {
    if (isRolling && currentRoll !== null) {
      // Show result after dice animation
      const resultTimer = setTimeout(() => {
        setPhase("result");

        // Set Alba state based on result
        if (transitionType === "criticalFail") {
          setAlbaState("angry");
        } else if (transitionType === "criticalSuccess") {
          setAlbaState("purring");
        }
      }, 300);

      // Navigate or redirect after showing result
      const navigateTimer = setTimeout(() => {
        setPhase("transitioning");

        setTimeout(() => {
          completeTransition();

          if (transitionType === "criticalFail") {
            router.push("/");
          } else if (navigateTo) {
            router.push(navigateTo);
          }

          // Reset Alba state after a delay
          setTimeout(() => {
            setAlbaState("awake");
          }, 300);
        }, 150);
      }, transitionType === "criticalSuccess" ? 1800 : transitionType === "criticalFail" ? 1500 : 1000);

      return () => {
        clearTimeout(resultTimer);
        clearTimeout(navigateTimer);
      };
    }
  }, [isRolling, currentRoll, transitionType, navigateTo, completeTransition, router, setAlbaState]);

  const getModalStyle = () => {
    switch (transitionType) {
      case "criticalFail":
        return "from-[#1a0d0d] via-[#2d1515] to-[#1a0d0d] border-red-500/50";
      case "criticalSuccess":
        return "from-[#0d1a0d] via-[#1a2f1a] to-[#0d1a0d] border-yellow-500/50";
      default:
        return "from-[#0d1517] via-[#0f1c1f] to-[#0d1517] border-primary/30";
    }
  };

  const getMessage = () => {
    switch (transitionType) {
      case "criticalFail":
        return {
          title: "CRITICAL FAIL!",
          subtitle: "The dice gods are not pleased...",
        };
      case "criticalSuccess":
        return {
          title: "NATURAL 20!",
          subtitle: "CRITICAL SUCCESS!",
        };
      default:
        return {
          title: `ROLLED: ${currentRoll}`,
          subtitle: "Success!",
        };
    }
  };

  const message = getMessage();

  return (
    <AnimatePresence>
      {isRolling && (
        <>
          {/* Critical Success Effects */}
          {transitionType === "criticalSuccess" && phase === "result" && (
            <>
              <Confetti duration={3000} colors={["#FFD700", "#FFA500", "#FFEC8B", "#25f4f4", "#a6e3a1"]} />
              <Sparkles count={40} duration={2500} />
            </>
          )}

          {/* Critical Fail Effects */}
          {transitionType === "criticalFail" && phase === "result" && (
            <ScreenCrack duration={2000} />
          )}

          {/* Backdrop */}
          <motion.div
            className={`fixed inset-0 z-[9998] backdrop-blur-sm ${
              transitionType === "criticalFail" && phase === "result"
                ? "bg-red-900/30"
                : transitionType === "criticalSuccess" && phase === "result"
                ? "bg-yellow-900/20"
                : "bg-black/60"
            }`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              backgroundColor: transitionType === "criticalFail" && phase === "result"
                ? ["rgba(127, 29, 29, 0.3)", "rgba(127, 29, 29, 0.5)", "rgba(127, 29, 29, 0.3)"]
                : undefined
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              backgroundColor: { duration: 0.3, repeat: 2 }
            }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`relative bg-gradient-to-br ${getModalStyle()} rounded-2xl border-2 shadow-2xl overflow-hidden`}
              style={{
                width: "min(500px, 90vw)",
                maxHeight: "90vh",
              }}
              initial={{ scale: 0.8, y: 20 }}
              animate={{
                scale: 1,
                y: 0,
                x: transitionType === "criticalFail" && phase === "result"
                  ? [-8, 8, -6, 6, -4, 4, -2, 2, 0]
                  : 0,
                rotate: transitionType === "criticalFail" && phase === "result"
                  ? [-1, 1, -1, 1, 0]
                  : 0,
              }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                x: { duration: 0.5, ease: "easeInOut" },
                rotate: { duration: 0.5, ease: "easeInOut" }
              }}
            >
              {/* BorderBeam for critical success */}
              {transitionType === "criticalSuccess" && phase === "result" && (
                <BorderBeam
                  colorFrom="#FFD700"
                  colorTo="#FFA500"
                  size={300}
                  borderWidth={3}
                />
              )}

              {/* Red pulse border for critical fail */}
              {transitionType === "criticalFail" && phase === "result" && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 30px rgba(239, 68, 68, 0.5)",
                  }}
                  animate={{
                    boxShadow: [
                      "inset 0 0 30px rgba(239, 68, 68, 0.5)",
                      "inset 0 0 60px rgba(239, 68, 68, 0.8)",
                      "inset 0 0 30px rgba(239, 68, 68, 0.5)",
                    ],
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}

              {/* Scanlines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center p-6">
                {/* Header */}
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full ${
                      transitionType === "criticalFail" ? "bg-red-500" :
                      transitionType === "criticalSuccess" ? "bg-yellow-400" : "bg-primary"
                    }`}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className={`text-xs font-mono uppercase tracking-[0.2em] ${
                    transitionType === "criticalFail" ? "text-red-400/70" :
                    transitionType === "criticalSuccess" ? "text-yellow-400/70" : "text-primary/70"
                  }`}>
                    SKILL CHECK // D20
                  </span>
                  <motion.div
                    className={`w-2 h-2 rounded-full ${
                      transitionType === "criticalFail" ? "bg-red-500" :
                      transitionType === "criticalSuccess" ? "bg-yellow-400" : "bg-primary"
                    }`}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>

                {/* Dice */}
                <D20Dice />

                {/* Result message */}
                <AnimatePresence>
                  {phase === "result" && (
                    <motion.div
                      className="flex flex-col items-center gap-2 text-center mt-4"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      {/* Title with special effects */}
                      {transitionType === "criticalFail" ? (
                        <GlitchText
                          text={message.title}
                          className="text-4xl md:text-5xl font-bold font-mono tracking-wider text-red-400"
                        />
                      ) : transitionType === "criticalSuccess" ? (
                        <motion.h1
                          className="text-4xl md:text-5xl font-bold font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400"
                          style={{
                            textShadow: "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.5)",
                          }}
                          animate={{
                            scale: [1, 1.05, 1],
                            textShadow: [
                              "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.5)",
                              "0 0 50px rgba(255, 215, 0, 1), 0 0 100px rgba(255, 165, 0, 0.8)",
                              "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.5)",
                            ],
                          }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          {message.title}
                        </motion.h1>
                      ) : (
                        <motion.h1
                          className="text-4xl md:text-5xl font-bold font-mono tracking-wider text-primary"
                          style={{
                            textShadow: "0 0 20px rgba(37, 244, 244, 0.8)",
                          }}
                        >
                          {message.title}
                        </motion.h1>
                      )}

                      {/* Subtitle */}
                      <motion.p
                        className={`text-sm md:text-base font-medium ${
                          transitionType === "criticalFail"
                            ? "text-red-300/70"
                            : transitionType === "criticalSuccess"
                            ? "text-yellow-300/70"
                            : "text-primary/70"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {message.subtitle}
                      </motion.p>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Loading indicator during roll */}
                {phase === "rolling" && (
                  <motion.div
                    className="flex items-center gap-2 text-primary/50 mt-4 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span>Rolling</span>
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      >
                        .
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Corner accents - color based on result */}
              {["top-2 left-2 border-l-2 border-t-2 rounded-tl-lg",
                "top-2 right-2 border-r-2 border-t-2 rounded-tr-lg",
                "bottom-2 left-2 border-l-2 border-b-2 rounded-bl-lg",
                "bottom-2 right-2 border-r-2 border-b-2 rounded-br-lg"
              ].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute w-8 h-8 ${pos} ${
                    transitionType === "criticalFail" ? "border-red-500/40" :
                    transitionType === "criticalSuccess" ? "border-yellow-400/40" : "border-primary/40"
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
