"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

export default function Contact() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <div className="relative flex flex-col w-full max-w-2xl max-h-[calc(100vh-12rem)] md:max-h-[80vh] bg-[#102323]/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Window Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#162a2a] to-[#102323] border-b border-primary/20">
          <div className="flex items-center gap-2">
            <Icon name="satellite_alt" className="text-[#f9e2af]" size={20} />
            <h3 className="text-white text-lg font-bold tracking-[0.1em]">
              COMMS LINK [KADIR_OS]
            </h3>
          </div>
          <div className="flex gap-2">
            <button className="text-primary/70 hover:text-primary transition-colors">
              <Icon name="minimize" size={18} />
            </button>
            <button className="text-primary/70 hover:text-primary transition-colors">
              <Icon name="crop_square" size={18} />
            </button>
            <button
              onClick={() => router.push("/")}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <Icon name="close" size={18} />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-gray-300 leading-relaxed">
              Interested in <span className="font-semibold text-primary">automation</span>,{" "}
              <span className="font-semibold text-n8n">n8n workflows</span>, or just want to chat
              about <span className="font-semibold text-[#cba6f7]">TTRPGs</span>? Feel free to reach out!
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0d1a1a] border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                Message
              </label>
              <textarea
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-[#0d1a1a] border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all font-mono text-sm"
                placeholder="Type your message here..."
              />
            </div>

            <button
              onClick={() => alert("Form submission coming soon!")}
              className="w-full px-6 py-3 bg-primary text-background-dark font-bold rounded-lg hover:bg-white transition-all uppercase tracking-wider shadow-[0_0_15px_rgba(37,244,244,0.4)] hover:shadow-[0_0_25px_rgba(37,244,244,0.6)] flex items-center justify-center gap-2"
            >
              <Icon name="send" size={18} />
              Send Message
            </button>
          </div>
        </div>

        {/* Status Bar Footer */}
        <div className="bg-[#102222] border-t border-primary/10 px-4 py-1 flex justify-between items-center text-[10px] text-primary/60 font-mono select-none">
          <div className="flex gap-4">
            <span>NET: CONNECTED (SECURE)</span>
            <span>ENCRYPTION: ENABLED</span>
          </div>
          <div>KADIR_OS v2.4.0</div>
        </div>
      </div>
    </div>
  );
}

