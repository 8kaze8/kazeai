"use client";

import { motion } from "framer-motion";
import { getRandomRotation } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="py-10 border-t-3 border-cyber-charcoal mt-auto">
      <motion.div
        className="text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p
          className="text-sm md:text-base text-cyber-gray font-medium"
          style={{
            transform: `rotate(${getRandomRotation() * 0.3}deg)`,
          }}
        >
          Built with <span className="font-bold text-organic-green">Next.js</span>,{" "}
          <span className="font-bold text-organic-earth">Framer Motion</span>, and{" "}
          <span className="font-bold text-organic-terracotta italic">organic cybernetics</span>
        </p>
      </motion.div>
    </footer>
  );
}

