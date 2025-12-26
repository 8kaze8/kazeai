"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TextBlock } from "@/components/ui/TextBlock";
import { OrganicContainer } from "@/components/ui/OrganicContainer";
import { Button } from "@/components/ui/Button";

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col pt-20">
      <div className="flex-1 container mx-auto px-6 py-12">
        <TextBlock className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Contact</h1>
        </TextBlock>

        <div className="max-w-2xl mx-auto">
          <OrganicContainer withTexture className="p-8">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-cyber-gray mb-8">
              Interested in automation, n8n workflows, or just want to chat
              about TTRPGs? Feel free to reach out!
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border-2 border-cyber-charcoal bg-organic-off-white focus:outline-none focus:border-organic-green"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-cyber-charcoal bg-organic-off-white focus:outline-none focus:border-organic-green resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <Button onClick={() => alert("Form submission coming soon!")}>
                Send Message
              </Button>
            </div>
          </OrganicContainer>
        </div>
      </div>
      <Footer />
    </main>
  );
}

