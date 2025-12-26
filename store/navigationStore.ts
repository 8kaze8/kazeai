import { create } from "zustand";

interface NavigationState {
  currentSection: string;
  isTransitioning: boolean;
  setCurrentSection: (section: string) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentSection: "/",
  isTransitioning: false,
  setCurrentSection: (section: string) => set({ currentSection: section }),
  setIsTransitioning: (isTransitioning: boolean) =>
    set({ isTransitioning }),
}));

