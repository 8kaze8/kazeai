"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#25f4f4",
  colorTo = "#1ccbcb",
  delay = 0,
}: BorderBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("class", "absolute inset-0");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none";

    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke-width", borderWidth.toString());
    rect.setAttribute("stroke-dasharray", `${size} ${size * 2}`);
    rect.setAttribute("rx", "8");

    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", gradientId);
    gradient.setAttribute("gradientUnits", "userSpaceOnUse");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "100%");

    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", colorFrom);
    stop1.setAttribute("stop-opacity", "0");

    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "50%");
    stop2.setAttribute("stop-color", colorFrom);
    stop2.setAttribute("stop-opacity", "1");

    const stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop3.setAttribute("offset", "100%");
    stop3.setAttribute("stop-color", colorTo);
    stop3.setAttribute("stop-opacity", "0");

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    rect.setAttribute("stroke", `url(#${gradientId})`);
    svg.appendChild(rect);
    container.appendChild(svg);

    let offset = anchor;
    const animate = () => {
      offset += 0.5;
      rect.setAttribute("stroke-dashoffset", offset.toString());
      requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(() => {
      animate();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (container.contains(svg)) {
        container.removeChild(svg);
      }
    };
  }, [size, duration, anchor, borderWidth, colorFrom, colorTo, delay]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-lg",
        className
      )}
    />
  );
}
