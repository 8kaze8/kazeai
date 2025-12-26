"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TextBlock } from "@/components/ui/TextBlock";
import { OrganicContainer } from "@/components/ui/OrganicContainer";

export default function Skills() {
  const skillCategories = [
    {
      title: "Automation",
      skills: ["n8n", "Workflow Design", "API Integration", "Webhooks"],
    },
    {
      title: "Development",
      skills: ["TypeScript", "React", "Next.js", "Node.js", "Python"],
    },
    {
      title: "Tools",
      skills: ["Git", "Docker", "PostgreSQL", "REST APIs", "GraphQL"],
    },
  ];

  return (
    <main className="min-h-screen flex flex-col pt-20">
      <div className="flex-1 container mx-auto px-6 py-12">
        <TextBlock className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Skills</h1>
        </TextBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <OrganicContainer key={index} withTexture className="p-6">
              <h2 className="text-xl font-bold mb-4">{category.title}</h2>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-cyber-gray text-sm"
                    style={{
                      transform: `translateX(${Math.random() * 4 - 2}px)`,
                    }}
                  >
                    • {skill}
                  </li>
                ))}
              </ul>
            </OrganicContainer>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}

