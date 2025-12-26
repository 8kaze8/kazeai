"use client";

import { motion } from "framer-motion";
import { getRandomRotation, getRandomOffset } from "@/lib/utils";

export function Header() {
  const rotation1 = getRandomRotation();
  const rotation2 = getRandomRotation();
  const offset1 = getRandomOffset();
  const offset2 = getRandomOffset();

  return (
    <header className="pt-24 pb-12 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-6xl md:text-7xl font-black text-cyber-charcoal mb-6 leading-tight"
          style={{
            transform: `translate(${offset1}px, ${offset2}px) rotate(${rotation1}deg)`,
            textShadow: "3px 3px 0px rgba(127, 176, 105, 0.2), -2px -2px 0px rgba(212, 165, 116, 0.2)",
          }}
        >
          K<span style={{ transform: `rotate(${rotation2}deg)` }} className="inline-block">a</span>dir
        </motion.h1>
        <motion.div
          className="flex flex-wrap gap-3 text-lg md:text-xl text-cyber-gray"
          style={{
            transform: `translate(${-offset1}px, ${-offset2}px)`,
          }}
        >
          <span className="font-bold text-organic-green">AI Automation Developer</span>
          <span className="opacity-50">•</span>
          <span className="font-semibold text-organic-earth">n8n Specialist</span>
          <span className="opacity-50">•</span>
          <span className="font-medium text-organic-terracotta">TTRPG Enthusiast</span>
        </motion.div>
      </motion.div>
    </header>
  );
}

