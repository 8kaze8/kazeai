"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { animate } from "animejs";
import { useDiceStore } from "@/store/diceStore";
import { useNavigationStore } from "@/store/navigationStore";
import { useAlbaStore } from "@/store/albaStore";
import { D20Dice } from "./D20Dice";
import { Confetti } from "@/components/magicui/confetti";
import { criticalFail, criticalSuccess, standardTransition } from "@/lib/animations";

export function DiceRollOverlay() {
  const router = useRouter();
  const { isRolling, currentRoll, transitionType, navigateTo, completeTransition } = useDiceStore();
  const { setIsTransitioning } = useNavigationStore();
  const { setState: setAlbaState } = useAlbaStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const errorMessageRef = useRef<HTMLParagraphElement>(null);
  const successMessageRef = useRef<HTMLParagraphElement>(null);

  // Critical Fail Animation
  useEffect(() => {
    if (isRolling && transitionType === "criticalFail" && overlayRef.current) {
      // Alba kızgın ol
      setAlbaState("angry");

      // Screen shake
      animate(overlayRef.current, {
        translateX: [0, -20, 20, -20, 20, 0],
        translateY: [0, -10, 10, -10, 10, 0],
        duration: 500,
        complete: () => {
          // Red flash
          if (overlayRef.current) {
            animate(overlayRef.current, {
              backgroundColor: [
                "rgba(26, 13, 13, 1)",
                "rgba(239, 68, 68, 0.3)",
                "rgba(26, 13, 13, 1)",
              ],
              duration: 300,
              complete: () => {
                // Error message scale
                if (errorMessageRef.current) {
                  animate(errorMessageRef.current, {
                    scale: [0, 1.2, 1],
                    opacity: [0, 1],
                    duration: 400,
                    easing: "easeOutElastic(1, .8)",
                  });
                }
              },
            });
          }
        },
      });

      // Ana sayfaya dön
      setTimeout(() => {
        completeTransition();
        router.push("/");
        setIsTransitioning(false);
        setAlbaState("awake");
      }, 2000);
    }
  }, [isRolling, transitionType, router, completeTransition, setIsTransitioning, setAlbaState]);

  // Critical Success Animation
  useEffect(() => {
    if (isRolling && transitionType === "criticalSuccess" && overlayRef.current) {
      // Alba mutlu ol
      setAlbaState("purring");

      // Dice büyüme + rotate
      const diceContainer = document.querySelector(".dice-container");
      if (diceContainer) {
        animate(diceContainer, {
          scale: [1, 1.3, 1],
          rotate: [0, 360],
          duration: 800,
          easing: "easeOutElastic(1, .8)",
          complete: () => {
            // Success message
            if (successMessageRef.current) {
              animate(successMessageRef.current, {
                scale: [0, 1.2, 1],
                opacity: [0, 1],
                duration: 600,
                easing: "easeOutElastic(1, .8)",
                complete: () => {
                  // Glow efekti
                  if (successMessageRef.current) {
                    animate(successMessageRef.current, {
                      textShadow: [
                        "0 0 0px rgba(37,244,244,0)",
                        "0 0 30px rgba(37,244,244,1)",
                        "0 0 60px rgba(37,244,244,0.8)",
                      ],
                      duration: 1000,
                      easing: "easeInOut",
                    });
                  }
                },
              });
            }
          },
        });
      }

      // Navigate after animation
      setTimeout(() => {
        if (navigateTo) {
          completeTransition();
          router.push(navigateTo);
          setIsTransitioning(false);
          setAlbaState("awake");
        }
      }, 3000);
    }
  }, [isRolling, transitionType, navigateTo, router, completeTransition, setIsTransitioning, setAlbaState]);

  // Auto-navigate for standard rolls
  useEffect(() => {
    if (isRolling && navigateTo && currentRoll !== null && transitionType === "standard") {
      const timer = setTimeout(() => {
        completeTransition();
        router.push(navigateTo);
        setIsTransitioning(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isRolling, navigateTo, currentRoll, transitionType, completeTransition, router, setIsTransitioning]);

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
        <>
          {/* Confetti for critical success */}
          {transitionType === "criticalSuccess" && <Confetti duration={3000} />}
          
          <motion.div
            ref={overlayRef}
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
              ref={contentRef}
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

              <div className="dice-container">
                <D20Dice />
              </div>
              
              {currentRoll && (
                <motion.div
                  className="flex flex-col items-center gap-2 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  {transitionType === "criticalFail" && (
                    <p
                      ref={errorMessageRef}
                      className="text-red-400 text-4xl md:text-5xl font-bold font-mono tracking-wider text-center"
                      style={{
                        textShadow: "0 0 20px rgba(239,68,68,0.8), 0 0 40px rgba(239,68,68,0.4)",
                      }}
                    >
                      CRITICAL FAIL!
                    </p>
                  )}
                  
                  {transitionType === "criticalSuccess" && (
                    <p
                      ref={successMessageRef}
                      className="text-primary text-5xl md:text-6xl font-bold font-mono tracking-wider text-center"
                      style={{
                        textShadow: "0 0 30px rgba(37,244,244,1), 0 0 60px rgba(37,244,244,0.8)",
                      }}
                    >
                      NATURAL 20!
                    </p>
                  )}
                  
                  {transitionType === "standard" && (
                    <motion.p
                      className={`text-xl md:text-2xl font-bold font-mono ${getMessageColor()} tracking-wider text-center`}
                      style={{
                        textShadow: "0 0 10px rgba(37,244,244,0.5)",
                      }}
                    >
                      {getMessage()}
                    </motion.p>
                  )}
                  
                  <motion.p
                    className="text-white/40 text-xs font-mono mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: transitionType === "criticalSuccess" ? 2.5 : transitionType === "criticalFail" ? 1.5 : 2 }}
                  >
                    {transitionType === "criticalSuccess" 
                      ? ">> CRITICAL SUCCESS! System access granted <<"
                      : transitionType === "criticalFail"
                      ? ">> Error detected, redirecting to home... <<"
                      : ">> Transitioning... <<"
                    }
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

