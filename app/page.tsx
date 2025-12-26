"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TextBlock } from "@/components/ui/TextBlock";
import { OrganicContainer } from "@/components/ui/OrganicContainer";
import { GrowthLoader } from "@/components/features/hydroponic/GrowthLoader";
import { useState, useEffect } from "react";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && <GrowthLoader onComplete={() => setShowLoader(false)} />}
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-6 py-12">
          <TextBlock className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Welcome</h2>
            <p className="text-lg text-cyber-gray mb-8">
              I'm Kadir, an AI Automation Developer who builds workflows with n8n,
              rolls dice in TTRPGs, and grows plants with hydroponics. This is my
              digital space - a blend of organic design and cybernetic functionality.
            </p>
          </TextBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <OrganicContainer withTexture className="p-6">
              <h3 className="text-xl font-bold mb-4">n8n Automation</h3>
              <p className="text-cyber-gray">
                Building complex workflows and automations that connect systems
                seamlessly.
              </p>
            </OrganicContainer>

            <OrganicContainer withTexture className="p-6">
              <h3 className="text-xl font-bold mb-4">TTRPG Enthusiast</h3>
              <p className="text-cyber-gray">
                Rolling dice, telling stories, and exploring worlds one session
                at a time.
              </p>
            </OrganicContainer>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

