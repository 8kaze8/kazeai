"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DesktopHeader } from "./DesktopHeader";
import { DesktopIcons } from "./DesktopIcons";
import { TerminalWindow } from "./TerminalWindow";
import { Taskbar } from "./Taskbar";
import { AlbaCompanion } from "@/components/features/alba/AlbaCompanion";
import { Icon } from "@/components/ui/Icon";

interface DesktopEnvironmentProps {
  children: ReactNode;
}

export function DesktopEnvironment({ children }: DesktopEnvironmentProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="relative z-10 flex h-full w-full flex-col justify-between">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent pointer-events-none"></div>

      {/* Top System Header */}
      <DesktopHeader />

      {/* Desktop Workspace */}
      <main className="flex-1 relative px-4 md:px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-stretch py-2 md:py-4 gap-4 md:gap-8 min-h-0 overflow-hidden">
        {/* Desktop Icons Grid (Left) */}
        <DesktopIcons currentPath={pathname} onNavigate={router.push} />

        {/* Terminal Window (Floating / Right Aligned) */}
        <TerminalWindow />

        {/* Page Content */}
        <div className="flex-1 relative z-10 min-h-0 flex items-center justify-center w-full">
          {children}
        </div>

        {/* Mobile Center Content Placeholders */}
        <div className="md:hidden flex-1 flex flex-col justify-center items-center text-center p-4">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Icon name="fingerprint" className="text-primary" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome, Traveler
          </h2>
          <p className="text-white/60 text-sm">
            Select a module from the grid to begin browsing Kadir&apos;s
            archives.
          </p>
        </div>
      </main>

      {/* Taskbar */}
      <Taskbar currentPath={pathname} onNavigate={router.push} />

      {/* Alba Companion */}
      <AlbaCompanion />
    </div>
  );
}
