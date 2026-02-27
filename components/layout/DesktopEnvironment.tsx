"use client";

import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DesktopHeader } from "./DesktopHeader";
import { DesktopIcons } from "./DesktopIcons";
import { TerminalWindow } from "./TerminalWindow";
import { Taskbar } from "./Taskbar";
import { AlbaCompanion } from "@/components/features/alba/AlbaCompanion";

interface DesktopEnvironmentProps {
  children: ReactNode;
}

export function DesktopEnvironment({ children }: DesktopEnvironmentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAlbaEating, setIsAlbaEating] = useState(false);
  const [foodBowlPosition, setFoodBowlPosition] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="relative z-10 flex h-full w-full flex-col justify-between">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent pointer-events-none"></div>

      {/* Top System Header */}
      <DesktopHeader />

      {/* Desktop Workspace */}
      <main className="flex-1 relative px-2 md:px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-stretch py-2 md:py-4 gap-4 md:gap-8 min-h-0 overflow-visible">
        {/* Desktop Icons Grid (Left) */}
        <DesktopIcons currentPath={pathname} onNavigate={router.push} />

        {/* Terminal Window (Floating / Right Aligned) */}
        <TerminalWindow />

        {/* Page Content */}
        <div className="flex-1 relative z-10 min-h-0 flex items-center justify-center w-full pointer-events-none">
          <div className="pointer-events-auto w-full">
            {children}
          </div>
        </div>
      </main>

      {/* Taskbar */}
      <Taskbar
        currentPath={pathname}
        onNavigate={router.push}
        onFeedAlba={(pos) => setFoodBowlPosition(pos)}
        isAlbaEating={isAlbaEating}
      />

      {/* Alba Companion */}
      <AlbaCompanion
        onEatingChange={setIsAlbaEating}
        foodBowlPosition={foodBowlPosition}
      />
    </div>
  );
}
