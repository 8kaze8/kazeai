"use client";

import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";
import { motion } from "framer-motion";
import { DesktopIcon } from "./DesktopIcon";

interface DesktopIconsProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function DesktopIcons({ currentPath, onNavigate }: DesktopIconsProps) {
  const [mounted, setMounted] = useState(false);
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [hasDragged, setHasDragged] = useState<Record<string, boolean>>({});
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Load saved positions from localStorage
    const saved = localStorage.getItem('desktop-icon-positions');
    if (saved) {
      try {
        setIconPositions(JSON.parse(saved));
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  // Save positions to localStorage
  useEffect(() => {
    if (Object.keys(iconPositions).length > 0) {
      localStorage.setItem('desktop-icon-positions', JSON.stringify(iconPositions));
    }
  }, [iconPositions]);

  // Stagger entrance animation
  useEffect(() => {
    if (mounted && iconsRef.current) {
      const iconElements = iconsRef.current.querySelectorAll('.desktop-icon');
      iconElements.forEach((element, index) => {
        animate(element, {
          scale: [0, 1],
          opacity: [0, 1],
          delay: index * 100,
          duration: 600,
          easing: 'easeOutElastic(1, .8)',
        });
      });
    }
  }, [mounted]);

  const icons = [
    {
      id: "skill-tree",
      path: "/skills",
      label: "Skill Tree",
      icon: "account_tree",
      color: "text-[#a6e3a1]",
      hoverColor: "text-[#a6e3a1]",
      hexColor: "#a6e3a1",
      badge: 3,
    },
    {
      id: "quest-log",
      path: "/projects",
      label: "Quest Log",
      icon: "history_edu",
      color: "text-[#cba6f7]",
      hoverColor: "text-[#cba6f7]",
      hexColor: "#cba6f7",
    },
    {
      id: "timeline-archives",
      path: "/timeline",
      label: "Timeline Archives",
      icon: "history",
      color: "text-blue-400",
      hoverColor: "text-blue-400",
      hexColor: "#60a5fa",
    },
    {
      id: "research-lab",
      path: "/about",
      label: "Research Lab",
      icon: "layers",
      color: "text-green-400",
      hoverColor: "text-green-400",
      hexColor: "#4ade80",
    },
    {
      id: "comms-link",
      path: "/contact",
      label: "Comms Link",
      icon: "satellite_alt",
      color: "text-[#f9e2af]",
      hoverColor: "text-[#f9e2af]",
      hexColor: "#f9e2af",
    },
  ];

  return (
    <div 
      ref={iconsRef}
      className="relative flex flex-row md:flex-col gap-4 md:gap-6 flex-wrap justify-start items-start w-full md:w-auto z-10"
    >
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon}
          savedPosition={iconPositions[icon.id] || { x: 0, y: 0 }}
          onPositionChange={(id, pos) => {
            setIconPositions(prev => ({
              ...prev,
              [id]: pos,
            }));
          }}
          onNavigate={onNavigate}
          mounted={mounted}
          hasDragged={hasDragged[icon.id] || false}
          setHasDragged={(id, value) => {
            setHasDragged(prev => ({ ...prev, [id]: value }));
          }}
        />
      ))}
    </div>
  );
}
