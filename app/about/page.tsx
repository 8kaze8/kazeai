"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TextBlock } from "@/components/ui/TextBlock";
import { OrganicContainer } from "@/components/ui/OrganicContainer";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col pt-20">
      <div className="flex-1 container mx-auto px-6 py-12">
        <TextBlock className="mb-12">
          <h1 className="text-4xl font-bold mb-6">About</h1>
        </TextBlock>

        <div className="space-y-8 mb-12">
          <OrganicContainer withTexture className="p-8">
            <h2 className="text-2xl font-bold mb-4">Who I Am</h2>
            <p className="text-cyber-gray leading-relaxed">
              I'm Kadir, an AI Automation Developer passionate about creating
              efficient workflows and systems. I specialize in n8n automation,
              helping businesses streamline their processes through intelligent
              automation.
            </p>
          </OrganicContainer>

          <OrganicContainer withTexture className="p-8">
            <h2 className="text-2xl font-bold mb-4">Interests</h2>
            <ul className="space-y-3 text-cyber-gray">
              <li>
                <strong>n8n:</strong> Building complex automation workflows
              </li>
              <li>
                <strong>TTRPG:</strong> Dungeon Master and player in various
                tabletop RPG systems
              </li>
              <li>
                <strong>Hydroponics:</strong> Growing plants using soilless
                agriculture techniques
              </li>
              <li>
                <strong>Alba:</strong> My Tabby-Calico cat companion
              </li>
            </ul>
          </OrganicContainer>
        </div>
      </div>
      <Footer />
    </main>
  );
}

