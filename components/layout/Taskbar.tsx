"use client";

import { useAlbaStore } from "@/store/albaStore";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ALBA_MESSAGES } from "@/lib/constants";

interface TaskbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Taskbar({ currentPath, onNavigate }: TaskbarProps) {
  const { state, showMessage } = useAlbaStore();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAlbaClick = () => {
    const randomMessage =
      ALBA_MESSAGES[Math.floor(Math.random() * ALBA_MESSAGES.length)];
    showMessage(randomMessage);
  };

  return (
    <footer className="h-14 bg-[#0d1b1b]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-2 md:px-4 z-50 shadow-2xl relative">
      {/* Left: Start & Search */}
      <div className="flex items-center gap-1 md:gap-2">
        <button className="p-2 rounded hover:bg-white/10 group transition-colors flex items-center justify-center">
          <Icon
            name="apps"
            className="text-primary group-hover:rotate-90 transition-transform duration-300"
            size={28}
          />
        </button>
        <div className="hidden md:flex items-center bg-white/5 h-8 rounded px-3 border border-white/5 w-48 hover:bg-white/10 transition-colors">
          <Icon name="search" className="text-white/30 mr-2" size={18} />
          <input
            className="bg-transparent border-none text-white/80 text-sm placeholder-white/30 focus:ring-0 w-full p-0"
            placeholder="Find workflow..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Center: Active Apps */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 h-full">
        {/* Terminal Icon */}
        <div className="h-full flex items-center px-4 hover:bg-white/5 border-b-2 border-transparent hover:border-white/20 relative group cursor-pointer transition-colors">
          <Icon
            name="terminal"
            className="text-gray-400 group-hover:text-white transition-colors"
            size={20}
          />
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-32 bg-gray-900 border border-white/10 text-white text-xs p-2 rounded shadow-xl text-center z-50">
            Terminal
          </div>
        </div>

        {/* n8n Icon */}
        <div className="h-full flex items-center px-4 bg-white/5 border-b-2 border-n8n relative group cursor-pointer n8n-active">
          <div className="relative">
            <Icon name="webhook" className="text-n8n" size={20} />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-n8n opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-n8n"></span>
            </span>
          </div>
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-32 bg-gray-900 border border-n8n/30 text-white text-xs p-2 rounded shadow-xl text-center z-50">
            n8n Automation
          </div>
        </div>

        {/* Alba Companion */}
        <div
          className="h-full flex items-center justify-center px-4 hover:bg-white/5 border-b-2 border-transparent hover:border-yellow-200/50 relative group cursor-pointer transition-colors ml-2"
          onClick={handleAlbaClick}
        >
          <div className="w-12 h-12 -mb-1 rounded bg-center bg-cover pixelated opacity-90 group-hover:opacity-100 transition-all duration-500 origin-bottom group-hover:scale-110 group-hover:-translate-y-1">
            {/* Placeholder for Alba sprite - will be replaced with actual image */}
            <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-orange-300 rounded flex items-center justify-center">
              <span className="text-2xl">🐱</span>
            </div>
          </div>
          <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center w-56 bg-[#152a2a] border border-yellow-200/30 text-white text-xs p-3 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="font-bold text-yellow-200 mb-1 flex items-center gap-1">
              <Icon name="pets" size={14} className="text-yellow-200" /> Alba
            </p>
            <p className="text-white/70 italic text-center">
              Stretching... Time to automate?
            </p>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-[#152a2a] border-r-[6px] border-r-transparent absolute -bottom-[6px]"></div>
          </div>
        </div>
      </div>

      {/* Right: System Tray */}
      <div className="flex items-center gap-2 md:gap-4 px-2">
        <div className="flex items-center gap-1 text-white/60">
          <button className="p-1.5 hover:bg-white/10 rounded hover:text-white transition-colors">
            <Icon name="expand_less" size={18} />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded hover:text-white transition-colors">
            <Icon name="wifi" size={18} />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded hover:text-white transition-colors">
            <Icon name="volume_up" size={18} />
          </button>
        </div>
        <div className="flex flex-col items-end justify-center text-right pl-2 border-l border-white/10 h-8">
          <span className="text-xs font-medium text-white/90 leading-none mb-0.5">
            {new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
          <span className="text-[10px] text-white/50 leading-none">
            {new Date().toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
        <button className="ml-1 p-1.5 hover:bg-white/10 rounded text-white/60 hover:text-primary transition-colors relative">
          <Icon name="notifications" size={20} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
        </button>
      </div>
    </footer>
  );
}

