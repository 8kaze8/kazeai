"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganicContainer } from "@/components/ui/OrganicContainer";
import { motion } from "framer-motion";
import { getRandomRotation, getRandomOffset } from "@/lib/utils";

export default function Skills() {
  const skillCategories = [
    {
      title: "Automation",
      color: "green" as const,
      skills: ["n8n", "Workflow Design", "API Integration", "Webhooks"],
    },
    {
      title: "Development",
      color: "earth" as const,
      skills: ["TypeScript", "React", "Next.js", "Node.js", "Python"],
    },
    {
      title: "Tools",
      color: "terracotta" as const,
      skills: ["Git", "Docker", "PostgreSQL", "REST APIs", "GraphQL"],
    },
  ];

  return (
    <main className="min-h-screen flex flex-col pt-20">
      <div className="flex-1 container mx-auto px-6 py-12">
        <motion.h1
          className="text-5xl md:text-6xl font-black mb-12 text-cyber-charcoal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            transform: `rotate(${getRandomRotation()}deg)`,
            textShadow: "4px 4px 0px rgba(127, 176, 105, 0.2)",
          }}
        >
          Skills
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {skillCategories.map((category, index) => (
            <OrganicContainer
              key={index}
              withTexture
              color={category.color}
              className="p-8"
            >
              <motion.h2
                className="text-2xl font-black mb-6"
                style={{
                  transform: `rotate(${getRandomRotation()}deg)`,
                  textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                }}
              >
                {category.title}
              </motion.h2>
              <ul className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    className="text-cyber-gray text-base font-medium"
                    style={{
                      transform: `translateX(${getRandomOffset()}px) rotate(${getRandomRotation() * 0.5}deg)`,
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: skillIndex * 0.1 }}
                  >
                    <span className="text-organic-green-dark">▸</span> {skill}
                  </motion.li>
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

