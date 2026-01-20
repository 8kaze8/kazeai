"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { WindowContainer } from "@/components/ui/WindowContainer";

interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  missionId: string;
  clearanceLevel: string;
  description: string;
  achievements: {
    title: string;
    description: string;
  }[];
  techStack: string[];
  startDate: string;
  endDate: string;
  completion: number;
  demoImage?: string;
}

const experiences: Experience[] = [
  {
    id: "techcorp-2023",
    period: "2023 - PRESENT",
    title: "Senior AI Architect",
    company: "TechCorp Industries",
    missionId: "4839-XC",
    clearanceLevel: "ALPHA",
    description:
      "Spearheaded the architectural design of autonomous enterprise agents. Responsible for overseeing the deployment of neural networks into legacy infrastructure, ensuring zero-downtime integration.\n\nCurrently leading a squad of 8 engineers to modernize the data ingestion pipeline, utilizing advanced LLM-Ops practices to reduce hallucination rates in production models.",
    achievements: [
      {
        title: "Latency Reduction",
        description: "Optimized inference engines resulting in a 40% reduction in response times.",
      },
      {
        title: "Swarm Deployment",
        description: "Successfully deployed 3 multi-agent swarms for automated customer support.",
      },
      {
        title: "Pipeline Automation",
        description: "Automated CI/CD pipelines specifically for ML models, reducing deployment friction.",
      },
    ],
    techStack: ["AI_AGENT", "PYTHON", "LLM_OPS", "PYTORCH", "DOCKER"],
    startDate: "JAN 2023",
    endDate: "PRESENT",
    completion: 75,
    demoImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAY4OdQo6TAXDZAQCL3dyhLGYCmKTMQFIuB1tBlMx1C51wv5Byt8GFnEEwOpX6Ql85p_cWMTo2AcCk_ltJ4V9e1HxHXqeaYyduKTzWx9FUo3pskvwNg25k5Y2N37iQRYHIQ_VP3vVcT17tkZM0C03SQLZ4YZ_QBuuQXGl6I_ZmHtzzWHFcYC5Lb8dR-vFeD0yq_qdccDcfAjbGxFAEXEQEdEHAFgCBmiNyS61evLnQj1LJr3wgVCJFRF-jd-wkIIlrE115tQm41WjI",
  },
  {
    id: "dataflow-2021",
    period: "2021 - 2023",
    title: "Automation Lead",
    company: "DataFlow Systems",
    missionId: "3821-AB",
    clearanceLevel: "BETA",
    description:
      "Led automation initiatives across multiple departments, reducing manual work by 60%. Designed and implemented workflow automation systems using n8n and custom Python scripts.",
    achievements: [
      {
        title: "Workflow Optimization",
        description: "Reduced processing time by 50% through intelligent automation.",
      },
      {
        title: "Team Leadership",
        description: "Managed a team of 5 automation engineers.",
      },
    ],
    techStack: ["N8N", "PYTHON", "API_INTEGRATION", "POSTGRES"],
    startDate: "JAN 2021",
    endDate: "DEC 2023",
    completion: 100,
  },
  {
    id: "startup-2020",
    period: "2020 - 2021",
    title: "Junior Developer",
    company: "StartUp Inc.",
    missionId: "2912-CD",
    clearanceLevel: "GAMMA",
    description:
      "Developed full-stack applications using modern web technologies. Contributed to product development and feature implementation.",
    achievements: [
      {
        title: "Feature Development",
        description: "Built core features for the main product.",
      },
    ],
    techStack: ["REACT", "NODE", "TYPESCRIPT", "MONGODB"],
    startDate: "JAN 2020",
    endDate: "DEC 2021",
    completion: 100,
  },
  {
    id: "freelance-2019",
    period: "2019 - 2020",
    title: "Freelance Engineer",
    company: "Self-Employed",
    missionId: "1903-EF",
    clearanceLevel: "DELTA",
    description:
      "Worked on various client projects including web development, automation scripts, and system integrations.",
    achievements: [
      {
        title: "Client Projects",
        description: "Completed 15+ successful projects for various clients.",
      },
    ],
    techStack: ["PYTHON", "JAVASCRIPT", "HTML", "CSS"],
    startDate: "JAN 2019",
    endDate: "DEC 2020",
    completion: 100,
  },
];

export default function Timeline() {
  const router = useRouter();
  const [selectedExperience, setSelectedExperience] = useState<Experience>(experiences[0]);

  return (
    <div className="flex items-center justify-center h-full w-full p-3 md:p-4">
      <WindowContainer className="relative flex flex-col w-full max-w-5xl max-h-[calc(100vh-12rem)] md:max-h-[75vh] bg-[#102323]/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-50 opacity-10 scanline" />

        {/* Window Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#162a2a] to-[#102323] border-b border-primary/20 shrink-0">
          <div className="flex items-center gap-2">
            <Icon name="history" className="text-primary" size={16} />
            <h3 className="text-white text-sm font-bold tracking-[0.1em]">
              {/* TIMELINE_ARCHIVES_V2.0 */}
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

        {/* Window Body */}
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row min-h-0 max-h-full">
          {/* Left Sidebar: Timeline Navigation */}
          <aside className="w-full md:w-64 border-r border-border-color bg-surface-dark/50 flex flex-col overflow-y-auto flex-shrink-0 min-h-0">
            <div className="p-3 md:p-4 pb-2">
              <h3 className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-3">
                SELECT DATA POINT
              </h3>
            </div>
            <div className="flex flex-col px-2 md:px-4 pb-6">
              {experiences.map((exp, index) => {
                const isSelected = selectedExperience.id === exp.id;
                const isLast = index === experiences.length - 1;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setSelectedExperience(exp)}
                    className={`group relative flex gap-3 p-3 cursor-pointer rounded-lg transition-all ${
                      isSelected
                        ? "bg-[#0d1a1a] border border-primary/30 shadow-[0_0_15px_rgba(37,244,244,0.1)]"
                        : "hover:bg-white/5 border border-transparent hover:border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex flex-col items-center pt-1">
                      <div
                        className={`size-2.5 rounded-full ${
                          isSelected
                            ? "bg-primary shadow-[0_0_10px_#25f4f4]"
                            : "bg-border-color group-hover:bg-white/50 transition-colors"
                        }`}
                      />
                      {!isLast && (
                        <div
                          className={`w-px h-full mt-1.5 ${
                            isSelected
                              ? "bg-gradient-to-b from-primary/50 to-transparent"
                              : "bg-border-color"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <span
                        className={`text-[10px] font-bold tracking-wider ${
                          isSelected
                            ? "text-primary"
                            : "text-white/40 group-hover:text-primary/70 transition-colors"
                        }`}
                      >
                        {exp.period}
                      </span>
                      <span
                        className={`font-bold text-sm leading-tight ${
                          isSelected ? "text-white" : "text-white/80"
                        }`}
                      >
                        {exp.title}
                      </span>
                      <span
                        className={`text-xs ${
                          isSelected ? "text-white/60" : "text-white/50"
                        }`}
                      >
                        {exp.company}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                        <Icon name="chevron_right" size={14} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Content: Data Display */}
          <main className="flex-1 flex flex-col overflow-y-auto bg-[#0d1a1a]/50 relative min-h-0">
            {/* Terminal Header Status */}
            <div className="sticky top-0 bg-surface-dark/95 backdrop-blur z-10 border-b border-border-color px-4 md:px-6 py-3 flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <h2 className="text-white tracking-wide text-xs md:text-sm font-mono opacity-80">
                System User: Kadir //{" "}
                <span className="text-primary">Retrieving Mission Log #{selectedExperience.missionId}...</span>
              </h2>
            </div>

            {/* Main Details */}
            <div className="p-4 md:p-6 pb-12 max-w-4xl mx-auto w-full">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-6 border-b border-border-color pb-4 md:pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">
                      Mission: Active
                    </span>
                    <span className="text-white/40 text-[10px] font-mono">ID: {selectedExperience.missionId}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
                    {selectedExperience.title}
                  </h1>
                  <div className="flex items-center gap-1.5 text-white/60 text-sm md:text-base">
                    <Icon name="apartment" size={16} />
                    <span>{selectedExperience.company}</span>
                  </div>
                </div>
                {/* Clearance Level Badge */}
                <div className="flex items-center justify-center p-3 rounded-lg bg-surface-dark border border-border-color">
                  <div className="text-right">
                    <p className="text-[9px] text-white/40 font-mono uppercase">Clearance Level</p>
                    <p className="text-xl md:text-2xl font-bold text-primary tracking-widest">
                      {selectedExperience.clearanceLevel}
                    </p>
                  </div>
                  <div className="w-px h-6 md:h-8 bg-border-color mx-3 md:mx-4" />
                  <div className="text-primary">
                    <Icon name="verified_user" size={24} className="md:w-8 md:h-8" />
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Left Column: Description & Stats */}
                <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
                  {/* Description */}
                  <div className="bg-surface-dark rounded-lg border border-border-color p-4 md:p-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
                    <h3 className="text-white font-bold text-base md:text-lg mb-3 flex items-center gap-2">
                      <Icon name="description" size={18} className="text-primary" />
                      Mission Brief
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-xs md:text-sm whitespace-pre-line">
                      {selectedExperience.description}
                    </p>
                  </div>

                  {/* Key Achievements */}
                  <div>
                    <h3 className="text-white/80 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Icon name="trophy" size={16} className="text-primary" />
                      Key Outcomes
                    </h3>
                    <div className="space-y-2">
                      {selectedExperience.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-surface-dark border border-border-color hover:border-primary/30 transition-colors"
                        >
                          <Icon name="check_circle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-white font-medium text-xs md:text-sm">{achievement.title}</p>
                            <p className="text-white/50 text-xs">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Tech Stack & Metadata */}
                <div className="flex flex-col gap-4">
                  {/* Tech Stack Box */}
                  <div className="bg-surface-dark rounded-lg border border-border-color p-4">
                    <h3 className="text-white/80 font-bold text-[10px] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Icon name="memory" size={14} className="text-primary" />
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedExperience.techStack.map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center px-2 py-1 rounded bg-[#152e2e] border border-border-color text-[10px] font-mono text-primary hover:bg-primary hover:text-surface-dark transition-colors cursor-default"
                        >
                          [{tech}]
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Demo Image */}
                  {selectedExperience.demoImage && (
                    <div className="bg-surface-dark rounded-lg border border-border-color p-1 overflow-hidden group cursor-pointer">
                      <div className="relative h-32 md:h-40 w-full overflow-hidden rounded-lg bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt="Project demo"
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                          src={selectedExperience.demoImage}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                          <Icon
                            name="play_circle"
                            size={32}
                            className="text-white opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all"
                          />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-[9px] font-mono text-white/80 bg-black/60 backdrop-blur px-2 py-0.5 rounded inline-block">
                            PROJECT_DEMO.MP4
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Duration Stats */}
                  <div className="bg-surface-dark rounded-lg border border-border-color p-4">
                    <h3 className="text-white/80 font-bold text-[10px] uppercase tracking-widest mb-3">
                      Duration Log
                    </h3>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-white/50">Start Date</span>
                      <span className="text-white font-mono">{selectedExperience.startDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-white/50">End Date</span>
                      <span className="text-white font-mono text-primary">
                        {selectedExperience.endDate}
                      </span>
                    </div>
                    <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full shadow-[0_0_10px_#25f4f4]"
                        style={{ width: `${selectedExperience.completion}%` }}
                      />
                    </div>
                    <p className="text-[9px] text-right mt-1 text-primary/60 font-mono">
                      {selectedExperience.completion}% PROJECT COMPLETION
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Action */}
              <div className="mt-6 md:mt-8 flex justify-end">
                <button className="bg-primary hover:bg-[#1ce0e0] text-surface-dark px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-xs md:text-sm tracking-wide flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(37,244,244,0.3)]">
                  <Icon name="download" size={16} />
                  DOWNLOAD_FULL_LOGS
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* Status Bar Footer */}
        <div className="h-8 bg-[#102222] border-t border-primary/10 px-4 flex items-center justify-between text-[10px] text-primary/60 font-mono select-none shrink-0">
          <div className="flex gap-4">
            <span>Index: 82%</span>
            <span>Cache: 12MB</span>
            <span>Net: 1Gbps</span>
          </div>
          <div>
            Logged in as: <span className="text-primary">Kadir_Admin</span>
          </div>
        </div>
      </WindowContainer>
    </div>
  );
}

