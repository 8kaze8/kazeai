import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "@/components/providers/Providers";
import { DesktopEnvironment } from "@/components/layout/DesktopEnvironment";
import { DiceRollOverlay } from "@/components/features/dice/DiceRollOverlay";

export const metadata: Metadata = {
  title: "KadirOS v1.1 - Desktop Environment",
  description: "Kadir's Portfolio - AI Automation Developer specializing in n8n, TTRPG enthusiast, and hydroponics hobbyist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background-light dark:bg-background-dark overflow-hidden h-screen w-screen relative font-display selection:bg-primary/30 selection:text-primary">
        <Providers>
          <DesktopEnvironment>
            <DiceRollOverlay />
            {children}
          </DesktopEnvironment>
        </Providers>
      </body>
    </html>
  );
}

