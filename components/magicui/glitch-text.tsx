"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text);

  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`";
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    // Glitch effect for first 500ms
    interval = setInterval(() => {
      const newText = text
        .split("")
        .map((char, i) => {
          if (Math.random() > 0.7) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return char;
        })
        .join("");
      setGlitchText(newText);
    }, 50);

    // Stop glitching and show real text
    timeout = setTimeout(() => {
      clearInterval(interval);
      setGlitchText(text);
    }, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text]);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={{
        x: [0, -3, 3, -2, 2, 0],
        textShadow: [
          "0 0 0 transparent",
          "-3px 0 #ff0000, 3px 0 #00ffff",
          "3px 0 #ff0000, -3px 0 #00ffff",
          "-2px 0 #ff0000, 2px 0 #00ffff",
          "0 0 0 transparent",
        ],
      }}
      transition={{
        duration: 0.3,
        repeat: 2,
        ease: "easeInOut",
      }}
    >
      {/* Glitch layers */}
      <span
        className="absolute inset-0 text-red-500 opacity-70"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
          transform: "translateX(-2px)",
        }}
      >
        {glitchText}
      </span>
      <span
        className="absolute inset-0 text-cyan-400 opacity-70"
        style={{
          clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
          transform: "translateX(2px)",
        }}
      >
        {glitchText}
      </span>
      <span className="relative">{glitchText}</span>
    </motion.span>
  );
}
