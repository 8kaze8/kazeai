import { useAlbaStore } from "@/store/albaStore";
import { useEffect, useCallback } from "react";

export function useAlbaInteraction() {
  const { state, setState, showMessage, setPosition } = useAlbaStore();

  const handleHover = useCallback(() => {
    if (state === "sleeping") {
      setState("awake");
    }
  }, [state, setState]);

  const handleClick = useCallback(() => {
    setState("purring");
    showMessage();
    setTimeout(() => {
      setState("awake");
    }, 1000);
  }, [setState, showMessage]);

  const handleMouseMove = useCallback(() => {
    if (state === "awake") {
      setState("curious");
    }
  }, [state, setState]);

  useEffect(() => {
    if (state === "curious" || state === "awake") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [state, handleMouseMove]);

  // Idle walk animation
  useEffect(() => {
    if (state === "sleeping") {
      const timer = setTimeout(() => {
        const corners = [
          { x: window.innerWidth - 100, y: window.innerHeight - 100 },
          { x: 50, y: window.innerHeight - 100 },
          { x: window.innerWidth - 100, y: 50 },
          { x: 50, y: 50 },
        ];
        const randomCorner = corners[Math.floor(Math.random() * corners.length)];
        setState("walking");
        setPosition(randomCorner);
        setTimeout(() => {
          setState("sleeping");
        }, 2000);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [state, setState, setPosition]);

  return {
    handleHover,
    handleClick,
    state,
  };
}

