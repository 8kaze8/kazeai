import { useDiceStore } from "@/store/diceStore";
import { useNavigationStore } from "@/store/navigationStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useSkillCheck() {
  const router = useRouter();
  const {
    isRolling,
    currentRoll,
    transitionType,
    navigateTo,
    rollDice,
    completeTransition,
  } = useDiceStore();
  const { setIsTransitioning } = useNavigationStore();

  const triggerRoll = (target: string) => {
    setIsTransitioning(true);
    rollDice(target);
  };

  useEffect(() => {
    if (!isRolling && navigateTo && currentRoll !== null) {
      // Wait for animation to complete
      const timer = setTimeout(() => {
        router.push(navigateTo);
        completeTransition();
        setIsTransitioning(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRolling, navigateTo, currentRoll]);

  return {
    triggerRoll,
    isRolling,
    currentRoll,
    transitionType,
  };
}

