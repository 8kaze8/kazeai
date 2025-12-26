"use client";

import { NodeGraph } from "@/components/features/projects/NodeGraph";
import type { ProjectNode } from "@/types/projects";

// Sample project data
const sampleProjects: ProjectNode[] = [
  {
    id: "1",
    title: "n8n Workflow Suite",
    position: { x: 200, y: 200 },
    techStack: ["n8n", "TypeScript", "REST APIs"],
    description: "A comprehensive suite of n8n workflows for automating business processes.",
    outcome: "Reduced manual work by 80% across multiple departments.",
    link: "https://example.com",
    connections: ["2"],
  },
  {
    id: "2",
    title: "Hydroponic Monitor",
    position: { x: 500, y: 300 },
    techStack: ["IoT", "Python", "React"],
    description: "Real-time monitoring system for hydroponic growing systems.",
    outcome: "Improved crop yield by 25% through data-driven insights.",
    connections: ["1", "3"],
  },
  {
    id: "3",
    title: "TTRPG Campaign Manager",
    position: { x: 800, y: 200 },
    techStack: ["Next.js", "PostgreSQL", "D3.js"],
    description: "Digital tool for managing tabletop RPG campaigns and character sheets.",
    outcome: "Used by 50+ gaming groups for streamlined campaign management.",
    connections: ["2"],
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <p className="text-cyber-gray mb-12">
          Explore my work through an interactive node graph. Click on nodes to
          see details.
        </p>
      </div>
      <div className="h-[calc(100vh-300px)]">
        <NodeGraph projects={sampleProjects} />
      </div>
    </main>
  );
}

