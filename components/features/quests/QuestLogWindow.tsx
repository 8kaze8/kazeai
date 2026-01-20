"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { animate } from "animejs";
import { Icon } from "@/components/ui/Icon";
import { WindowContainer } from "@/components/ui/WindowContainer";

interface Quest {
  id: string;
  title: string;
  client: string;
  class: string;
  questId: string;
  completed: string;
  briefing: string;
  loot: {
    responseTime: string;
    costReduction: string;
    csatScore: string;
  };
  techStack: string[];
  images: string[];
}

const quests: Quest[] = [
  {
    id: "chatbot-oracle",
    title: "The Chatbot Oracle",
    client: "FinTech Corp",
    class: "AI Automation",
    questId: "#A7X-99",
    completed: "2023-11-15",
    briefing:
      "The client faced a massive influx of customer queries, resulting in 48h+ wait times. The objective was to engineer a sovereign AI agent capable of handling Tier-1 support tickets autonomously while seamlessly escalating complex issues to human operators.",
    loot: {
      responseTime: "Instant",
      costReduction: "+40%",
      csatScore: "4.8/5",
    },
    techStack: ["Python", "OpenAI API", "LangChain", "FastAPI", "Redis"],
    images: [],
  },
  {
    id: "email-sentinel",
    title: "Automated Email Sentinel",
    client: "E-com Giants",
    class: "Workflow Automation",
    questId: "#B2Y-45",
    completed: "2023-09-20",
    briefing:
      "Implemented an intelligent email processing system that automatically categorizes, routes, and responds to customer inquiries using n8n workflows.",
    loot: {
      responseTime: "< 5min",
      costReduction: "+35%",
      csatScore: "4.6/5",
    },
    techStack: ["n8n", "Node.js", "PostgreSQL", "SMTP"],
    images: [],
  },
  {
    id: "data-pipeline",
    title: "Data Pipeline Construct",
    client: "HealthData Inc",
    class: "Data Engineering",
    questId: "#C3Z-12",
    completed: "2023-07-10",
    briefing:
      "Built a robust ETL pipeline that processes millions of health records daily, ensuring data quality and compliance with healthcare regulations.",
    loot: {
      responseTime: "Real-time",
      costReduction: "+50%",
      csatScore: "4.9/5",
    },
    techStack: ["Python", "Apache Airflow", "PostgreSQL", "Docker"],
    images: [],
  },
  {
    id: "legacy-migration",
    title: "Legacy System Migration",
    client: "OldBank Ltd",
    class: "System Integration",
    questId: "#D4A-78",
    completed: "2023-05-05",
    briefing:
      "Migrated legacy banking systems to modern cloud infrastructure with zero downtime, ensuring seamless customer experience throughout the transition.",
    loot: {
      responseTime: "Zero Downtime",
      costReduction: "+45%",
      csatScore: "4.7/5",
    },
    techStack: ["AWS", "Terraform", "Kubernetes", "n8n"],
    images: [],
  },
];

export function QuestLogWindow() {
  const router = useRouter();
  const [selectedQuest, setSelectedQuest] = useState<Quest>(quests[0]);
  const [questType, setQuestType] = useState<"main" | "side">("main");
  const questListRef = useRef<HTMLDivElement>(null);

  // Scroll animation for quest items
  useEffect(() => {
    if (questListRef.current) {
      const questItems = questListRef.current.querySelectorAll('.quest-item');
      
      // Trigger animation when items come into view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              animate(entry.target, {
                opacity: [0, 1],
                translateY: [30, 0],
                delay: index * 100,
                duration: 600,
                easing: 'easeOutExpo',
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      questItems.forEach((item) => observer.observe(item));

      return () => {
        questItems.forEach((item) => observer.unobserve(item));
      };
    }
  }, []);

  return (
    <WindowContainer className="relative w-full max-w-4xl max-h-[calc(100vh-12rem)] md:max-h-[75vh] flex flex-col bg-[#102323]/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden z-10">
      {/* Window Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#162a2a] to-[#102323] border-b border-primary/20">
        <div className="flex items-center gap-2">
          <Icon name="menu_book" className="text-primary" size={16} />
          <h3 className="text-white text-sm font-bold tracking-[0.1em]">
            QUEST_LOG [KAZE_OS]
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

      {/* Main Window Content */}
      <div className="flex flex-1 overflow-hidden min-h-0 max-h-full">
        {/* Sidebar: Quest List */}
        <div className="w-full md:w-1/3 border-r border-[#224949] flex flex-col bg-[#102323] min-h-0 flex-shrink-0">
          {/* Header / User Stats */}
          <div className="p-3 md:p-4 border-b border-[#224949] bg-gradient-to-b from-[#152e2e] to-[#102323]">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-white text-lg md:text-xl font-bold leading-tight">
                Quest Log
              </h1>
              <div className="flex items-center gap-2 text-[#90cbcb] text-[10px] font-mono uppercase tracking-widest">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#25f4f4]"></span>
                Lvl. 25 Developer
              </div>
              {/* XP Bar */}
              <div className="mt-2 w-full bg-[#0d1818] h-1.5 rounded-full overflow-hidden border border-[#224949]">
                <div className="h-full bg-primary w-[75%] shadow-[0_0_10px_#25f4f4]"></div>
              </div>
              <div className="flex justify-between text-[9px] text-gray-400 font-mono mt-0.5">
                <span>EXP: 7500/10000</span>
                <span>NEXT LVL</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-[#224949]">
            <div className="flex h-10 w-full items-center rounded-lg bg-[#0d1818] p-1 border border-[#224949]">
              <label className="flex-1 cursor-pointer h-full flex items-center justify-center rounded px-2 has-[:checked]:bg-[#224949] has-[:checked]:text-white text-gray-400 text-xs font-bold uppercase tracking-wide transition-all">
                <span>Main Quests</span>
                <input
                  checked={questType === "main"}
                  onChange={() => setQuestType("main")}
                  className="invisible w-0 absolute"
                  name="quest-type"
                  type="radio"
                  value="main"
                />
              </label>
              <label className="flex-1 cursor-pointer h-full flex items-center justify-center rounded px-2 has-[:checked]:bg-[#224949] has-[:checked]:text-white text-gray-400 text-xs font-bold uppercase tracking-wide transition-all">
                <span>Side Quests</span>
                <input
                  checked={questType === "side"}
                  onChange={() => setQuestType("side")}
                  className="invisible w-0 absolute"
                  name="quest-type"
                  type="radio"
                  value="side"
                />
              </label>
            </div>
          </div>

                 {/* List Items */}
                 <div ref={questListRef} className="flex-1 overflow-y-auto p-2 space-y-1 min-h-0">
            {quests.map((quest) => (
              <button
                key={quest.id}
                onClick={() => setSelectedQuest(quest)}
                className={`quest-item opacity-0 w-full text-left group flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  selectedQuest.id === quest.id
                    ? "bg-[#1a2c2c] border-primary/30 shadow-neon"
                    : "hover:bg-[#1a2c2c] border-transparent hover:border-[#224949]"
                }`}
              >
                <div
                  className={`shrink-0 flex items-center justify-center size-8 rounded ${
                    selectedQuest.id === quest.id
                      ? "bg-primary/20 text-primary"
                      : "bg-[#224949] text-gray-400 group-hover:text-white"
                  } transition-colors`}
                >
                  <Icon
                    name="check_circle"
                    className={
                      selectedQuest.id === quest.id ? "text-primary" : "text-gray-400"
                    }
                    size={20}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm truncate transition-colors ${
                      selectedQuest.id === quest.id
                        ? "text-white font-bold group-hover:text-primary"
                        : "text-gray-300 font-medium group-hover:text-white"
                    }`}
                  >
                    {quest.title}
                  </p>
                  <p className="text-gray-500 text-xs truncate">
                    Client: {quest.client}
                  </p>
                </div>
                {selectedQuest.id === quest.id && (
                  <Icon name="arrow_forward_ios" className="text-primary" size={14} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Quest Details */}
        <div className="hidden md:flex flex-col flex-[2] bg-surface-darker relative overflow-hidden min-h-0">
          {/* Background Grid Effect */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#224949 1px, transparent 1px), linear-gradient(90deg, #224949 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
          <div className="relative z-10 flex flex-col h-full overflow-y-auto min-h-0">
            {/* Detail Header */}
            <div className="p-8 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                    <Icon name="smart_toy" size={14} />
                    Class: {selectedQuest.class}
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
                    {selectedQuest.title}
                  </h2>
                  <p className="text-gray-400 font-mono text-sm">
                    Quest ID: {selectedQuest.questId} {/* Completed: */}{" "}
                    {selectedQuest.completed}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center justify-center size-10 rounded-lg bg-[#1a2c2c] border border-[#224949] hover:border-primary text-white hover:text-primary transition-all group">
                    <Icon name="code" size={20} />
                  </button>
                  <button className="flex items-center justify-center size-10 rounded-lg bg-[#1a2c2c] border border-[#224949] hover:border-primary text-white hover:text-primary transition-all group">
                    <Icon name="rocket_launch" size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Layout */}
            <div className="px-8 pb-8 space-y-6">
              {/* Mission Briefing */}
              <div className="bg-[#102323]/80 border border-[#224949] rounded-xl p-6 backdrop-blur-sm">
                <h3 className="flex items-center gap-2 text-[#90cbcb] font-bold uppercase text-sm tracking-widest mb-4">
                  <Icon name="feed" size={18} />
                  Mission Briefing
                </h3>
                <p className="text-gray-300 leading-relaxed font-light">
                  {selectedQuest.briefing}
                </p>
              </div>

              {/* Two Column Layout: Rewards & Tech */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Loot / Rewards */}
                <div className="bg-[#102323]/80 border border-[#224949] rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Icon name="military_tech" className="text-primary" size={64} />
                  </div>
                  <h3 className="flex items-center gap-2 text-primary font-bold uppercase text-sm tracking-widest mb-4">
                    <Icon name="stars" size={18} />
                    Quest Loot (Results)
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between p-2 rounded bg-[#0d1818] border border-[#224949]">
                      <span className="text-gray-300 text-sm">Response Time</span>
                      <span className="text-primary font-mono font-bold text-sm">
                        {selectedQuest.loot.responseTime}
                      </span>
                    </li>
                    <li className="flex items-center justify-between p-2 rounded bg-[#0d1818] border border-[#224949]">
                      <span className="text-gray-300 text-sm">Cost Reduction</span>
                      <span className="text-green-400 font-mono font-bold text-sm">
                        {selectedQuest.loot.costReduction}
                      </span>
                    </li>
                    <li className="flex items-center justify-between p-2 rounded bg-[#0d1818] border border-[#224949]">
                      <span className="text-gray-300 text-sm">CSAT Score</span>
                      <span className="text-yellow-400 font-mono font-bold text-sm">
                        {selectedQuest.loot.csatScore}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Equipment / Tech Stack */}
                <div className="bg-[#102323]/80 border border-[#224949] rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="flex items-center gap-2 text-[#90cbcb] font-bold uppercase text-sm tracking-widest mb-4">
                    <Icon name="backpack" size={18} />
                    Equipment (Tech Stack)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuest.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 rounded-md bg-[#1a2c2c] border text-xs font-mono hover:border-white hover:text-white transition-colors cursor-default ${
                          index === 0
                            ? "border-primary/30 text-primary"
                            : "border-[#224949] text-gray-300"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gallery / Screenshots */}
              <div>
                <h3 className="flex items-center gap-2 text-[#90cbcb] font-bold uppercase text-sm tracking-widest mb-4">
                  <Icon name="image" size={18} />
                  Visual Evidence
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg overflow-hidden border border-[#224949] relative group h-32 bg-[#0d1818] flex items-center justify-center">
                    <Icon name="image" className="text-gray-600" size={40} />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-[#224949] relative group h-32 bg-[#0d1818] flex items-center justify-center">
                    <Icon name="bar_chart" className="text-gray-600" size={40} />
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 mt-4 border-t border-[#224949] flex justify-end gap-4">
                <button className="px-6 py-2.5 rounded-lg border border-[#224949] text-gray-300 font-bold text-sm hover:bg-[#1a2c2c] hover:text-white transition-all uppercase tracking-wide">
                  Archives
                </button>
                <button className="px-6 py-2.5 rounded-lg bg-primary text-background-dark font-bold text-sm shadow-[0_0_15px_rgba(37,244,244,0.4)] hover:shadow-[0_0_25px_rgba(37,244,244,0.6)] hover:bg-white transition-all uppercase tracking-wide flex items-center gap-2">
                  <Icon name="replay" size={18} />
                  Replay Quest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar Footer */}
      <div className="bg-[#102222] border-t border-primary/10 px-4 py-1 flex justify-between items-center text-[10px] text-primary/60 font-mono select-none">
        <div className="flex gap-4">
          <span>MEM: 64TB FREE</span>
          <span>NET: CONNECTED (SECURE)</span>
        </div>
        <div>KAZE_OS v2.4.0</div>
      </div>
    </WindowContainer>
  );
}

