"use client";

import { TextBlock } from "@/components/ui/TextBlock";

export function Header() {
  return (
    <header className="pt-24 pb-12">
      <TextBlock align="left" className="px-6">
        <h1 className="text-5xl font-bold text-cyber-charcoal mb-4">
          Kadir
        </h1>
        <p className="text-xl text-cyber-gray">
          AI Automation Developer • n8n Specialist • TTRPG Enthusiast
        </p>
      </TextBlock>
    </header>
  );
}

