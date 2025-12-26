import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "@/components/providers/Providers";
import { Navigation } from "@/components/layout/Navigation";
import { AlbaCompanion } from "@/components/features/alba/AlbaCompanion";
import { DiceRollOverlay } from "@/components/features/dice/DiceRollOverlay";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Kadir - AI Automation Developer",
  description: "Portfolio of Kadir, AI Automation Developer specializing in n8n, TTRPG enthusiast, and hydroponics hobbyist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-organic-off-white text-cyber-charcoal">
        <Providers>
          <Navigation />
          <DiceRollOverlay />
          <AlbaCompanion />
          {children}
        </Providers>
      </body>
    </html>
  );
}

