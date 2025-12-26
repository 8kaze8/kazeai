"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganicContainer } from "@/components/ui/OrganicContainer";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { getRandomRotation, getRandomOffset } from "@/lib/utils";

export default function Contact() {
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
          Contact
        </motion.h1>

        <div className="max-w-2xl mx-auto">
          <OrganicContainer withTexture color="green" className="p-10">
            <motion.h2
              className="text-3xl font-black mb-6 text-organic-green-dark"
              style={{
                transform: `rotate(${getRandomRotation()}deg)`,
                textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
              }}
            >
              Get in Touch
            </motion.h2>
            <p className="text-cyber-gray mb-8 text-lg leading-relaxed">
              Interested in <span className="font-semibold text-organic-green">automation</span>,{" "}
              <span className="font-semibold text-organic-earth">n8n workflows</span>, or just want to chat
              about <span className="font-semibold text-organic-terracotta">TTRPGs</span>? Feel free to reach out!
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-base font-black mb-3 text-cyber-charcoal">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-5 py-3 border-3 border-cyber-charcoal bg-organic-off-white focus:outline-none focus:border-organic-green focus:ring-2 focus:ring-organic-green/20 hand-drawn-shadow"
                  placeholder="your.email@example.com"
                  style={{
                    transform: `translateX(${getRandomOffset()}px)`,
                  }}
                />
              </div>

              <div>
                <label className="block text-base font-black mb-3 text-cyber-charcoal">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-5 py-3 border-3 border-cyber-charcoal bg-organic-off-white focus:outline-none focus:border-organic-green focus:ring-2 focus:ring-organic-green/20 resize-none hand-drawn-shadow"
                  placeholder="Your message here..."
                  style={{
                    transform: `translateX(${getRandomOffset()}px)`,
                  }}
                />
              </div>

              <motion.div
                style={{
                  transform: `translateX(${getRandomOffset()}px) rotate(${getRandomRotation()}deg)`,
                }}
              >
                <Button onClick={() => alert("Form submission coming soon!")}>
                  Send Message
                </Button>
              </motion.div>
            </div>
          </OrganicContainer>
        </div>
      </div>
      <Footer />
    </main>
  );
}

