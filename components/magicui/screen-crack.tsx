"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ScreenCrackProps {
  duration?: number;
}

export function ScreenCrack({ duration = 1500 }: ScreenCrackProps) {
  const pathsRef = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    // Animate crack paths with vanilla JS
    pathsRef.current.forEach((path, i) => {
      if (!path) return;
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.transition = `stroke-dashoffset 400ms ease-in-out ${i * 50}ms`;

      requestAnimationFrame(() => {
        path.style.strokeDashoffset = "0";
      });
    });
  }, []);

  const crackPaths = [
    "M50,50 L45,40 L42,30 L38,15",
    "M50,50 L55,42 L60,35 L68,20",
    "M50,50 L58,48 L70,45 L85,42",
    "M50,50 L55,55 L65,60 L80,68",
    "M50,50 L52,58 L55,70 L58,85",
    "M50,50 L45,56 L38,65 L30,80",
    "M50,50 L42,52 L30,55 L15,58",
    "M50,50 L44,45 L35,38 L20,28",
    "M42,30 L35,28 L25,25",
    "M60,35 L65,30 L72,22",
    "M70,45 L78,42 L90,38",
    "M65,60 L72,65 L82,72",
    "M55,70 L52,78 L48,90",
    "M38,65 L32,72 L22,82",
    "M30,55 L22,58 L10,62",
    "M35,38 L28,35 L18,30",
  ];

  return (
    <motion.svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[10002]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: [0.8, 0.4, 0.6, 0.3, 0] }}
      transition={{ duration: duration / 1000, ease: "easeOut" }}
    >
      {/* Red flash overlay */}
      <motion.rect
        width="100"
        height="100"
        fill="rgba(255, 0, 0, 0.2)"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.8, 0.3, 0.6, 0] }}
        transition={{ duration: 0.5, repeat: 2 }}
      />

      {/* Crack patterns */}
      <g
        stroke="#ff3333"
        strokeWidth="0.3"
        fill="none"
        strokeLinecap="round"
      >
        {crackPaths.map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              if (el) pathsRef.current[i] = el;
            }}
            d={d}
            opacity="0.8"
          />
        ))}
      </g>

      {/* Shattered glass shards */}
      <g fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 100, 100, 0.3)" strokeWidth="0.15">
        <polygon points="50,50 45,40 42,45" />
        <polygon points="50,50 55,42 52,48" />
        <polygon points="50,50 58,48 55,52" />
        <polygon points="50,50 55,55 52,55" />
        <polygon points="50,50 52,58 48,55" />
        <polygon points="50,50 45,56 48,52" />
        <polygon points="50,50 42,52 45,48" />
        <polygon points="50,50 44,45 48,48" />
      </g>
    </motion.svg>
  );
}
