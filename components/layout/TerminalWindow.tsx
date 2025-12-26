"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";

export function TerminalWindow() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const initialLogs = [
      "➜ ~ n8n start --tunnel",
      "... initializing n8n core",
      "... loading workflows [Hydro_Monitor, Portfolio_Bot]",
      "... Editor is now accessible via: http://localhost:5678/",
      "[n8n] Workflow Active: Lead_Gen_V2",
      "> Webhook listener ready",
      "> Analyzing 3 new automated tasks...",
      "> Status: EXECUTING",
      "➜ ~ check_hydro_stats.py",
      "> pH: 6.2 | EC: 1.8 | Temp: 24°C",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < initialLogs.length) {
        setLogs((prev) => [...prev, initialLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="hidden md:flex absolute top-10 right-10 w-[500px] flex-col rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#0d1313]/95 border border-white/10 backdrop-blur-md overflow-hidden z-0">
      {/* Window Title Bar */}
      <div className="bg-[#1a2626] px-4 py-2 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <Icon name="terminal" className="text-primary/70" size={14} />
          <span className="text-xs font-bold text-white/70 tracking-wide uppercase">
            Terminal - n8n_console.exe
          </span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500 border border-yellow-500/50 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 hover:bg-green-500 border border-green-500/50 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-red-500/20 hover:bg-red-500 border border-red-500/50 transition-colors"></div>
        </div>
      </div>

      {/* Window Content */}
      <div className="p-4 font-mono text-sm h-64 overflow-y-auto relative">
        {/* Scanline overlay */}
        <div className="absolute inset-0 scanline opacity-10 pointer-events-none"></div>
        <div className="flex flex-col gap-1 text-gray-300 relative z-10">
          {logs.map((log, index) => {
            if (!log || typeof log !== "string") return null;
            
            if (log.startsWith("➜")) {
              return (
                <p key={index}>
                  <span className="text-green-500">➜</span>{" "}
                  <span className="text-primary">~</span> {log.length > 4 ? log.substring(4) : log}
                </p>
              );
            } else if (log.startsWith("[n8n]")) {
              return (
                <div
                  key={index}
                  className="pl-4 border-l-2 border-n8n/30 my-2 text-xs text-gray-400 bg-n8n/5 p-2 rounded-r"
                >
                  <p className="text-n8n font-bold mb-1">{log}</p>
                </div>
              );
            } else if (log.startsWith("> Status:")) {
              return (
                <p key={index} className="pl-4">
                  {log.replace("EXECUTING", "")}
                  <span className="text-green-400">EXECUTING</span>
                </p>
              );
            } else if (log.startsWith("> pH:")) {
              return (
                <p key={index} className="text-green-400 text-xs">
                  {log}
                </p>
              );
            } else {
              return (
                <p key={index} className="text-white/50 text-xs">
                  {log}
                </p>
              );
            }
          })}
          <p>
            <span className="text-green-500">➜</span>{" "}
            <span className="text-primary">~</span>{" "}
            <span className="animate-pulse">_</span>
          </p>
        </div>
      </div>
    </div>
  );
}

