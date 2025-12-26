import { Variants } from "framer-motion";

export const diceRoll: Variants = {
  initial: { rotateX: 0, rotateY: 0, rotateZ: 0 },
  rolling: {
    rotateX: [0, 360, 720],
    rotateY: [0, 360, 720],
    rotateZ: [0, 180, 360],
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

export const criticalFail: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    y: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const criticalSuccess: Variants = {
  glow: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      repeat: 2,
    },
  },
};

export const standardTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

