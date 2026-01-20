import { create } from "zustand";
import type { DiceState, DiceRollOutcome } from "@/types/dice";
import { CRITICAL_FAIL, CRITICAL_SUCCESS } from "@/lib/constants";

export const useDiceStore = create<DiceState>((set) => ({
  isRolling: false,
  currentRoll: null,
  rollHistory: [],
  transitionType: "standard",
  navigateTo: null,
  rollDice: (target: string) => {
    set({
      isRolling: true,
      currentRoll: null,
      transitionType: "standard",
      navigateTo: target,
    });
  },
  setRollResult: (roll: number) => {
    let transitionType: DiceRollOutcome = "standard";

    if (roll === CRITICAL_FAIL) {
      transitionType = "criticalFail";
    } else if (roll === CRITICAL_SUCCESS) {
      transitionType = "criticalSuccess";
    }

    set({
      currentRoll: roll,
      transitionType,
      rollHistory: [...useDiceStore.getState().rollHistory, roll],
    });
  },
  completeTransition: () => {
    set({
      isRolling: false,
      currentRoll: null,
      navigateTo: null,
      transitionType: "standard",
    });
  },
}));
