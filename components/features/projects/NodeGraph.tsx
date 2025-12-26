"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { ProjectNode } from "@/types/projects";
import { ProjectNode as ProjectNodeComponent } from "./ProjectNode";
import { ConnectionLine } from "./ConnectionLine";

interface NodeGraphProps {
  projects: ProjectNode[];
}

export function NodeGraph({ projects }: NodeGraphProps) {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const connections = useMemo(() => {
    const conns: Array<{ from: ProjectNode; to: ProjectNode }> = [];
    projects.forEach((project) => {
      project.connections.forEach((connectionId) => {
        const connectedNode = projects.find((p) => p.id === connectionId);
        if (connectedNode) {
          // Avoid duplicate connections
          if (
            !conns.some(
              (c) =>
                (c.from.id === project.id && c.to.id === connectedNode.id) ||
                (c.from.id === connectedNode.id && c.to.id === project.id)
            )
          ) {
            conns.push({ from: project, to: connectedNode });
          }
        }
      });
    });
    return conns;
  }, [projects]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((conn, index) => (
          <ConnectionLine key={`${conn.from.id}-${conn.to.id}-${index}`} from={conn.from} to={conn.to} />
        ))}
      </svg>
      {projects.map((project) => (
        <ProjectNode
          key={project.id}
          node={project}
          isExpanded={expandedNode === project.id}
          onToggle={() => {
            setExpandedNode(expandedNode === project.id ? null : project.id);
          }}
        />
      ))}
    </div>
  );
}

