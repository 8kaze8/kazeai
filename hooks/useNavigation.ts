import { useRouter } from "next/navigation";
import { useSkillCheck } from "./useSkillCheck";
import { useNavigationStore } from "@/store/navigationStore";

export function useNavigation() {
  const router = useRouter();
  const { triggerRoll } = useSkillCheck();
  const { setCurrentSection } = useNavigationStore();

  const navigate = (path: string, useDice: boolean = true) => {
    if (useDice) {
      triggerRoll(path);
    } else {
      router.push(path);
      setCurrentSection(path);
    }
  };

  return { navigate };
}

