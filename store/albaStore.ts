import { create } from "zustand";
import type { AlbaStoreState, AlbaState, AlbaDirection } from "@/types/alba";
import { getRandomAlbaMessage } from "@/lib/utils";

export const useAlbaStore = create<AlbaStoreState>((set) => ({
  state: "sleeping",
  position: { x: 0, y: 0 },
  direction: "right",
  message: null,
  setState: (state: AlbaState) => set({ state }),
  setPosition: (pos: { x: number; y: number }) => set({ position: pos }),
  setDirection: (dir: AlbaDirection) => set({ direction: dir }),
  showMessage: (msg?: string) => {
    const message = msg || getRandomAlbaMessage();
    set({ message });
    setTimeout(() => {
      set({ message: null });
    }, 3000);
  },
}));

