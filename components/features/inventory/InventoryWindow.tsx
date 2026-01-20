"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { WindowContainer } from "@/components/ui/WindowContainer";

interface InventoryItem {
  id: string;
  name: string;
  level: number;
  stat: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  description: string;
  power: number;
  weight: string;
  durability: string;
}

const inventoryItems: InventoryItem[] = [
  {
    id: "python",
    name: "Python Script",
    level: 99,
    stat: "+50 Intelligence",
    icon: "code",
    rarity: "legendary",
    description:
      "A powerful ancient script capable of automating complex tasks and summoning AI entities. Highly versatile in combat and utility.",
    power: 99,
    weight: "0.5 kg",
    durability: "Infinite",
  },
  {
    id: "n8n",
    name: "n8n Node",
    level: 85,
    stat: "+30 Speed",
    icon: "hub",
    rarity: "epic",
    description:
      "Workflow automation node that connects systems seamlessly. Increases automation efficiency.",
    power: 85,
    weight: "0.3 kg",
    durability: "High",
  },
  {
    id: "zapier",
    name: "Zapier Amulet",
    level: 90,
    stat: "+40 Connection",
    icon: "bolt",
    rarity: "epic",
    description:
      "Magical amulet that creates instant connections between applications.",
    power: 90,
    weight: "0.2 kg",
    durability: "High",
  },
  {
    id: "typescript",
    name: "TypeScript Shield",
    level: 80,
    stat: "+25 Dexterity",
    icon: "shield",
    rarity: "rare",
    description:
      "Type-safe shield that protects against runtime errors and bugs.",
    power: 80,
    weight: "0.4 kg",
    durability: "Very High",
  },
  {
    id: "postgres",
    name: "Postgres Vault",
    level: 75,
    stat: "+20 Strength",
    icon: "database",
    rarity: "rare",
    description: "Secure vault for storing and retrieving structured data.",
    power: 75,
    weight: "1.0 kg",
    durability: "Very High",
  },
  {
    id: "gpt4",
    name: "GPT-4 Core",
    level: 95,
    stat: "+60 Wisdom",
    icon: "psychology",
    rarity: "legendary",
    description:
      "Advanced AI core that provides intelligent insights and solutions.",
    power: 95,
    weight: "0.1 kg",
    durability: "Infinite",
  },
];

export function InventoryWindow() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(
    inventoryItems[0]
  );
  const [filter, setFilter] = useState("all");

  return (
    <WindowContainer className="flex flex-col w-full max-w-4xl max-h-[calc(100vh-12rem)] md:max-h-[75vh] bg-[#102323]/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Window Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#162a2a] to-[#102323] border-b border-primary/20">
        <div className="flex items-center gap-2">
          <Icon name="backpack" className="text-primary" size={16} />
          <h3 className="text-white text-sm font-bold tracking-[0.1em]">
            INVENTORY [KAZE_OS]
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
        {/* Left Panel: Character Profile & Stats */}
        <div className="w-full md:w-64 bg-surface-dark/50 border-r border-primary/10 flex flex-col p-3 md:p-4 gap-3 md:gap-4 overflow-y-auto flex-shrink-0 min-h-0">
          {/* Character Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary shadow-[0_0_20px_rgba(37,244,244,0.2)] flex items-center justify-center">
                <Icon name="person" className="text-primary" size={40} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-background-dark border border-primary rounded-full p-1 flex items-center justify-center">
                <Icon name="verified" className="text-primary" size={12} />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-white text-lg md:text-xl font-bold tracking-tight">
                Kadir
              </h2>
              <p className="text-primary text-xs md:text-sm font-medium">
                Lvl. 5 Technomancer
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Class</span>
              <span className="text-white font-medium">AI Developer</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">EXP (Years)</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-20 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[70%]"></div>
                </div>
                <span className="text-primary font-bold">5.0</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Mana (Projects)</span>
              <span className="text-primary font-bold">120/150</span>
            </div>
          </div>

          {/* Equipment Slots */}
          <div className="pt-3 border-t border-primary/10">
            <p className="text-[10px] font-bold text-gray-500 mb-2 tracking-widest">
              EQUIPMENT
            </p>
            <div className="flex justify-center gap-3">
              <div className="w-10 h-10 bg-[#0d1a1a] border border-primary/20 rounded flex items-center justify-center group hover:border-primary/60 transition-colors cursor-help">
                <Icon
                  name="psychology"
                  className="text-primary/50 group-hover:text-primary"
                  size={16}
                />
              </div>
              <div className="w-10 h-10 bg-[#0d1a1a] border border-primary/20 rounded flex items-center justify-center group hover:border-primary/60 transition-colors cursor-help">
                <Icon
                  name="layers"
                  className="text-primary/50 group-hover:text-primary"
                  size={16}
                />
              </div>
              <div className="w-10 h-10 bg-[#0d1a1a] border border-primary/20 rounded flex items-center justify-center group hover:border-primary/60 transition-colors cursor-help">
                <Icon
                  name="code"
                  className="text-primary/50 group-hover:text-primary"
                  size={16}
                />
              </div>
            </div>
          </div>

          {/* Active Buffs */}
          <div className="pt-2 flex-1">
            <p className="text-[10px] font-bold text-gray-500 mb-2 tracking-widest">
              ACTIVE BUFFS
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 bg-[#0d1a1a] p-1.5 rounded border-l-2 border-green-500">
                <Icon name="bolt" className="text-green-500" size={14} />
                <div className="flex flex-col">
                  <span className="text-[10px] text-white font-medium">
                    Fast Learner
                  </span>
                  <span className="text-[9px] text-gray-400">
                    +20% Tech Adaptation
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#0d1a1a] p-1.5 rounded border-l-2 border-blue-500">
                <Icon name="coffee" className="text-blue-500" size={14} />
                <div className="flex flex-col">
                  <span className="text-[10px] text-white font-medium">
                    Caffeine Boost
                  </span>
                  <span className="text-[9px] text-gray-400">
                    +10% Coding Speed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

               {/* Right Panel: Inventory Grid */}
               <div className="flex-1 flex flex-col bg-background-dark/30 min-h-0">
                 {/* Filter Chips */}
                 <div className="p-2 md:p-3 border-b border-primary/10 flex-shrink-0">
            <div className="flex gap-2 flex-wrap">
              {["All Items", "Languages", "No-Code", "AI Models"].map(
                (filterName) => (
                  <button
                    key={filterName}
                    onClick={() => setFilter(filterName.toLowerCase())}
                    className={`flex items-center gap-x-1 rounded-lg px-2 py-1 transition-all ${
                      filter === filterName.toLowerCase()
                        ? "bg-primary text-background-dark"
                        : "bg-[#162a2a] border border-primary/20 hover:bg-[#1f3a3a] text-white"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {filterName}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Grid Content */}
          <div className="flex-1 overflow-y-auto p-2 md:p-3 min-h-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {inventoryItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`flex flex-col gap-2 p-2 rounded-lg bg-[#162a2a] border cursor-pointer transition-all duration-200 group relative ${
                    selectedItem?.id === item.id
                      ? "border-primary shadow-[0_0_10px_rgba(37,244,244,0.3)]"
                      : "border-white/5 hover:border-primary/50"
                  }`}
                >
                  <div className="absolute top-2 right-2 text-[10px] text-primary font-bold bg-background-dark/80 px-1 rounded">
                    Lvl {item.level}
                  </div>
                  <div className="w-full aspect-square bg-[#0f1919] rounded border border-white/5 flex items-center justify-center p-4">
                    <Icon name={item.icon} className="text-primary" size={40} />
                  </div>
                  <div className="px-1">
                    <p className="text-white text-sm font-medium truncate">
                      {item.name}
                    </p>
                    <p className="text-gray-400 text-xs truncate">{item.stat}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Item Details Panel */}
          {selectedItem && (
            <div className="flex-shrink-0 min-h-[120px] bg-[#0d1a1a] border-t border-primary/20 p-2 md:p-3 flex gap-2 md:gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#162a2a] border border-primary/40 flex-shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(37,244,244,0.1)]">
                <Icon
                  name={selectedItem.icon}
                  className="text-primary"
                  size={40}
                />
              </div>
              <div className="flex flex-col flex-1 justify-between min-w-0">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h2 className="text-white text-base md:text-lg font-bold leading-none mb-0.5 truncate">
                        {selectedItem.name}
                      </h2>
                      <p className="text-primary text-xs font-medium">
                        Rarity:{" "}
                        <span className="capitalize">{selectedItem.rarity}</span>{" "}
                        <span className="text-gray-500 mx-1">|</span> Type: Scroll
                      </p>
                    </div>
                    <button className="hidden sm:flex items-center gap-1 bg-primary text-background-dark px-2 py-1 rounded text-xs font-bold hover:bg-white transition-colors flex-shrink-0">
                      <Icon name="handyman" size={12} />
                      EQUIP
                    </button>
                  </div>
                  <p className="text-gray-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
                    {selectedItem.description}
                  </p>
                </div>
                <div className="flex gap-3 mt-1.5">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                      Power
                    </span>
                    <span className="text-white text-xs font-bold">
                      {selectedItem.power}/100
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                      Weight
                    </span>
                    <span className="text-white text-xs font-bold">
                      {selectedItem.weight}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                      Durability
                    </span>
                    <span className="text-white text-xs font-bold">
                      {selectedItem.durability}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
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

