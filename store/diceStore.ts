import { create } from "zustand";
import type { DiceState, DiceRollOutcome } from "@/types/dice";
import { DICE_MIN, DICE_MAX, CRITICAL_FAIL, CRITICAL_SUCCESS } from "@/lib/constants";

export const useDiceStore = create<DiceState>((set) => ({
  isRolling: false,
  currentRoll: null,
  rollHistory: [],
  transitionType: "standard",
  navigateTo: null,
  rollDice: (target: string) => {
    const roll = Math.floor(Math.random() * (DICE_MAX - DICE_MIN + 1)) + DICE_MIN;
    let transitionType: DiceRollOutcome = "standard";

    if (roll === CRITICAL_FAIL) {
      transitionType = "criticalFail";
    } else if (roll === CRITICAL_SUCCESS) {
      transitionType = "criticalSuccess";
    }

    set({
      isRolling: true,
      currentRoll: roll,
      transitionType,
      navigateTo: target,
      rollHistory: [...useDiceStore.getState().rollHistory, roll],
    });
  },
  completeTransition: () => {
    set({
      isRolling: false,
      currentRoll: null,
      navigateTo: null,
    });
  },
}));

