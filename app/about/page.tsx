"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

export default function About() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <div className="relative flex flex-col w-full max-w-4xl max-h-[calc(100vh-12rem)] md:max-h-[80vh] bg-[#102323]/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Window Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#162a2a] to-[#102323] border-b border-primary/20">
          <div className="flex items-center gap-2">
            <Icon name="potted_plant" className="text-green-400" size={20} />
            <h3 className="text-white text-lg font-bold tracking-[0.1em]">
              HYDRO LAB [KADIR_OS]
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
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">About Kadir</h1>
            <p className="text-primary text-sm font-mono">Lvl. 5 Technomancer</p>
          </div>

          <div className="bg-[#0d1a1a] border border-primary/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Icon name="person" className="text-primary" size={24} />
              Who I Am
            </h2>
            <p className="text-gray-300 leading-relaxed">
              I'm <span className="font-bold text-primary">Kadir</span>, an AI
              Automation Developer passionate about creating efficient workflows
              and systems. I specialize in{" "}
              <span className="font-semibold text-n8n">n8n automation</span>,
              helping businesses streamline their processes through intelligent
              automation.
            </p>
          </div>

          <div className="bg-[#0d1a1a] border border-green-400/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Icon name="favorite" className="text-green-400" size={24} />
              Interests
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <Icon name="webhook" className="text-n8n" size={16} />
                <strong className="text-n8n">n8n:</strong> Building complex
                automation workflows
              </li>
              <li className="flex items-center gap-2">
                <Icon name="casino" className="text-[#cba6f7]" size={16} />
                <strong className="text-[#cba6f7]">TTRPG:</strong> Dungeon Master
                and player in various tabletop RPG systems
              </li>
              <li className="flex items-center gap-2">
                <Icon name="potted_plant" className="text-green-400" size={16} />
                <strong className="text-green-400">Hydroponics:</strong> Growing
                plants using soilless agriculture techniques
              </li>
              <li className="flex items-center gap-2">
                <Icon name="pets" className="text-[#f9e2af]" size={16} />
                <strong className="text-[#f9e2af]">Alba:</strong> My Tabby-Calico
                cat companion 🐱
              </li>
            </ul>
          </div>
        </div>

        {/* Status Bar Footer */}
        <div className="bg-[#102222] border-t border-primary/10 px-4 py-1 flex justify-between items-center text-[10px] text-primary/60 font-mono select-none">
          <div className="flex gap-4">
            <span>HYDRO: OPTIMAL</span>
            <span>pH: 6.2 | EC: 1.8 | Temp: 24°C</span>
          </div>
          <div>KADIR_OS v2.4.0</div>
        </div>
      </div>
    </div>
  );
}

