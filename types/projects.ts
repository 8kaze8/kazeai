export interface ProjectNode {
  id: string;
  title: string;
  position: { x: number; y: number };
  techStack: string[];
  description: string;
  outcome: string;
  link?: string;
  connections: string[];
}

