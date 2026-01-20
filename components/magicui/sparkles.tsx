"use client";

import { useEffect, useRef } from "react";

interface SparklesProps {
  count?: number;
  colors?: string[];
  duration?: number;
}

export function Sparkles({
  count = 30,
  colors = ["#FFD700", "#FFA500", "#FFEC8B", "#25f4f4", "#fff"],
  duration = 2000,
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const sparkles: HTMLDivElement[] = [];

    // Create sparkle elements
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "absolute pointer-events-none";
      sparkle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z"
                fill="${colors[Math.floor(Math.random() * colors.length)]}"
                style="filter: drop-shadow(0 0 4px ${colors[Math.floor(Math.random() * colors.length)]})"/>
        </svg>
      `;
      sparkle.style.left = "50%";
      sparkle.style.top = "50%";
      sparkle.style.transform = "translate(-50%, -50%)";
      sparkle.style.opacity = "0";
      container.appendChild(sparkle);
      sparkles.push(sparkle);
    }

    // Animate each sparkle with vanilla JS
    sparkles.forEach((sparkle, i) => {
      const delay = i * 30;
      const targetX = (Math.random() - 0.5) * 600;
      const targetY = (Math.random() - 0.5) * 600;
      const rotation = (Math.random() - 0.5) * 360;
      const maxScale = 0.5 + Math.random();

      setTimeout(() => {
        sparkle.style.transition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
        sparkle.style.opacity = "1";
        sparkle.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) rotate(${rotation}deg) scale(${maxScale})`;

        // Fade out
        setTimeout(() => {
          sparkle.style.opacity = "0";
          sparkle.style.transform = `translate(calc(-50% + ${targetX * 1.2}px), calc(-50% + ${targetY * 1.2}px)) rotate(${rotation}deg) scale(0)`;
        }, duration * 0.6);
      }, delay);
    });

    return () => {
      sparkles.forEach((s) => s.remove());
    };
  }, [count, colors, duration]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[10001] overflow-hidden flex items-center justify-center"
    />
  );
}
