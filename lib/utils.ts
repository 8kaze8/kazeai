import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomAlbaMessage(): string {
  const messages = [
    "Kadir is currently coding workflows...",
    "n8n automation in progress!",
    "Rolling for initiative...",
    "Checking hydroponic sensors...",
    "Meow! 🐱",
    "Building something cool...",
    "D20 roll: Natural 20!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

