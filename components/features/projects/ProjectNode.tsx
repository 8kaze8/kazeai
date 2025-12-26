"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomRotation } from "@/lib/utils";
import type { ProjectNode as ProjectNodeType } from "@/types/projects";
import { OrganicContainer } from "@/components/ui/OrganicContainer";
import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";

interface ProjectNodeProps {
  node: ProjectNodeType;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ProjectNode({ node, isExpanded, onToggle }: ProjectNodeProps) {
  const rotation = getRandomRotation();

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
        rotate: `${rotation}deg`,
      }}
      layoutId={`node-${node.id}`}
      onClick={onToggle}
      whileHover={{ scale: 1.1, rotate: `${rotation + 1}deg` }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {!isExpanded ? (
        // Collapsed state - organic blob node
        <motion.div
          className="w-20 h-20 rounded-full bg-organic-green border-2 border-cyber-charcoal flex items-center justify-center"
          style={{
            borderRadius: "50% 40% 60% 30% / 60% 30% 70% 40%",
          }}
        >
          <span className="text-xs font-bold text-white text-center px-2">
            {node.title}
          </span>
        </motion.div>
      ) : (
        // Expanded state - organic container
        <motion.div
          className="w-80 p-6 bg-organic-beige texture-paper border-2 border-cyber-charcoal"
          style={{
            borderRadius: "20% 80% 20% 80% / 80% 20% 80% 20%",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-xl font-bold mb-3">{node.title}</h3>
          <p className="text-sm mb-4 text-cyber-gray">{node.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {node.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-organic-green text-white"
                style={{
                  borderRadius: "10px 20px 10px 20px / 20px 10px 20px 10px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="text-sm font-semibold mb-2">Outcome:</p>
          <p className="text-sm text-cyber-gray mb-4">{node.outcome}</p>
          {node.link && (
            <a
              href={node.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-organic-green underline"
            >
              View Project →
            </a>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

