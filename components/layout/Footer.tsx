"use client";

import { TextBlock } from "@/components/ui/TextBlock";

export function Footer() {
  return (
    <footer className="py-8 border-t-2 border-cyber-charcoal mt-auto">
      <TextBlock align="center" className="px-6">
        <p className="text-sm text-cyber-gray">
          Built with Next.js, Framer Motion, and organic cybernetics
        </p>
      </TextBlock>
    </footer>
  );
}

