"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganicContainer } from "@/components/ui/OrganicContainer";
import { motion } from "framer-motion";
import { getRandomRotation, getRandomOffset } from "@/lib/utils";

export default function About() {
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
          About
        </motion.h1>

        <div className="space-y-10 mb-12 max-w-4xl">
          <OrganicContainer withTexture color="green" className="p-10">
            <motion.h2
              className="text-3xl font-black mb-6 text-organic-green-dark"
              style={{
                transform: `rotate(${getRandomRotation()}deg)`,
                textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
              }}
            >
              Who I Am
            </motion.h2>
            <p className="text-cyber-gray leading-relaxed text-lg">
              I'm <span className="font-bold text-organic-green">Kadir</span>, an AI Automation Developer passionate about creating
              efficient workflows and systems. I specialize in{" "}
              <span className="font-semibold text-organic-earth">n8n automation</span>,
              helping businesses streamline their processes through intelligent
              automation.
            </p>
          </OrganicContainer>

          <OrganicContainer withTexture color="earth" className="p-10">
            <motion.h2
              className="text-3xl font-black mb-6 text-organic-earth"
              style={{
                transform: `rotate(${getRandomRotation()}deg)`,
                textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
              }}
            >
              Interests
            </motion.h2>
            <ul className="space-y-4 text-cyber-gray text-lg">
              <li style={{ transform: `translateX(${getRandomOffset()}px)` }}>
                <strong className="text-organic-green">n8n:</strong> Building complex automation workflows
              </li>
              <li style={{ transform: `translateX(${getRandomOffset()}px)` }}>
                <strong className="text-organic-terracotta">TTRPG:</strong> Dungeon Master and player in various
                tabletop RPG systems
              </li>
              <li style={{ transform: `translateX(${getRandomOffset()}px)` }}>
                <strong className="text-organic-earth">Hydroponics:</strong> Growing plants using soilless
                agriculture techniques
              </li>
              <li style={{ transform: `translateX(${getRandomOffset()}px)` }}>
                <strong className="text-organic-green">Alba:</strong> My Tabby-Calico cat companion 🐱
              </li>
            </ul>
          </OrganicContainer>
        </div>
      </div>
      <Footer />
    </main>
  );
}

