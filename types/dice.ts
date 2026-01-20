export type DiceRollOutcome = "criticalFail" | "criticalSuccess" | "standard";

export interface DiceState {
  isRolling: boolean;
  currentRoll: number | null;
  rollHistory: number[];
  transitionType: DiceRollOutcome;
  navigateTo: string | null;
  rollDice: (target: string) => void;
  setRollResult: (roll: number) => void;
  completeTransition: () => void;
}

