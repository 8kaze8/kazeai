"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganicContainer } from "@/components/ui/OrganicContainer";
import { GrowthLoader } from "@/components/features/hydroponic/GrowthLoader";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getRandomRotation, getRandomOffset } from "@/lib/utils";

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
          <motion.div
            className="mb-16 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-black mb-8 text-cyber-charcoal"
              style={{
                transform: `rotate(${getRandomRotation()}deg)`,
                textShadow: "4px 4px 0px rgba(127, 176, 105, 0.15)",
              }}
            >
              Welcome
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-cyber-gray leading-relaxed"
              style={{
                transform: `translate(${getRandomOffset()}px, ${getRandomOffset()}px)`,
              }}
            >
              I'm <span className="font-bold text-organic-green">Kadir</span>, an{" "}
              <span className="font-semibold text-organic-earth">AI Automation Developer</span> who builds workflows with n8n,
              rolls dice in TTRPGs, and grows plants with hydroponics. This is my
              digital space - a blend of <span className="italic">organic design</span> and{" "}
              <span className="font-mono">cybernetic functionality</span>.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <OrganicContainer withTexture color="green" className="p-8">
              <motion.h3
                className="text-2xl font-black mb-4 text-organic-green-dark"
                style={{
                  transform: `rotate(${getRandomRotation()}deg)`,
                  textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                }}
              >
                n8n Automation
              </motion.h3>
              <p className="text-cyber-gray leading-relaxed text-base">
                Building complex workflows and automations that connect systems
                seamlessly. Every automation is a story of connections.
              </p>
            </OrganicContainer>

            <OrganicContainer withTexture color="terracotta" className="p-8">
              <motion.h3
                className="text-2xl font-black mb-4 text-organic-terracotta"
                style={{
                  transform: `rotate(${getRandomRotation()}deg)`,
                  textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                }}
              >
                TTRPG Enthusiast
              </motion.h3>
              <p className="text-cyber-gray leading-relaxed text-base">
                Rolling dice, telling stories, and exploring worlds one session
                at a time. The best stories are told together.
              </p>
            </OrganicContainer>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

