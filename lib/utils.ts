import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ALBA_MESSAGES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomAlbaMessage(): string {
  return ALBA_MESSAGES[Math.floor(Math.random() * ALBA_MESSAGES.length)];
}

