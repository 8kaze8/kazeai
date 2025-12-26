import { useDiceStore } from "@/store/diceStore";
import { useNavigationStore } from "@/store/navigationStore";

export function useSkillCheck() {
  const {
    isRolling,
    currentRoll,
    transitionType,
    rollDice,
  } = useDiceStore();
  const { setIsTransitioning } = useNavigationStore();

  const triggerRoll = (target: string) => {
    setIsTransitioning(true);
    rollDice(target);
  };

  return {
    triggerRoll,
    isRolling,
    currentRoll,
    transitionType,
  };
}

