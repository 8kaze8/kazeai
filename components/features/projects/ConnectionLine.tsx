"use client";

import { motion } from "framer-motion";
import type { ProjectNode } from "@/types/projects";

interface ConnectionLineProps {
  from: ProjectNode;
  to: ProjectNode;
}

export function ConnectionLine({ from, to }: ConnectionLineProps) {
  // Calculate control points for bezier curve
  const midX = (from.position.x + to.position.x) / 2;
  const midY = (from.position.y + to.position.y) / 2;
  const controlX1 = midX + (to.position.x - from.position.x) * 0.3;
  const controlY1 = from.position.y;
  const controlX2 = midX - (to.position.x - from.position.x) * 0.3;
  const controlY2 = to.position.y;

  const path = `M ${from.position.x} ${from.position.y} 
                C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${to.position.x} ${to.position.y}`;

  return (
    <motion.path
      d={path}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeOpacity="0.3"
      strokeDasharray="5,5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.3 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  );
}

