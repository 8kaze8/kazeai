import { useAlbaStore } from "@/store/albaStore";
import { useEffect, useCallback } from "react";

export function useAlbaInteraction() {
  const { state, setState, showMessage, setPosition } = useAlbaStore();
  const clickCountRef = { current: 0 };
  const clickTimerRef = { current: null as NodeJS.Timeout | null };

  const handleHover = useCallback(() => {
    if (state === "sleeping") {
      setState("awake");
    }
  }, [state, setState]);

  const handleClick = useCallback(() => {
    // Reset timer if exists
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    // Increment click count
    clickCountRef.current += 1;

    // Move Alba to edge to avoid blocking content
    const { position } = useAlbaStore.getState();
    const margin = 20;
    const taskbarHeight = 56;
    const spriteSize = 128;
    const currentX = position.x;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Check if already at an edge (within margin threshold)
    const isAtLeftEdge = currentX <= margin + 10;
    const isAtRightEdge = currentX >= screenWidth - spriteSize - margin - 10;
    const isAtTopEdge = position.y <= margin + 10;
    const isAtBottomEdge =
      position.y >= screenHeight - taskbarHeight - spriteSize - margin - 10;

    let newX: number;
    let newY: number;

    // If at an edge, move to a nearby position (not all the way to opposite side)
    if (isAtLeftEdge) {
      // At left edge, move a bit to the right (not all the way)
      newX = Math.min(screenWidth / 3, currentX + 200);
      newY = Math.max(
        margin,
        Math.min(screenHeight - margin - taskbarHeight - spriteSize, position.y)
      );
    } else if (isAtRightEdge) {
      // At right edge, move a bit to the left (not all the way)
      newX = Math.max((screenWidth * 2) / 3 - spriteSize, currentX - 200);
      newY = Math.max(
        margin,
        Math.min(screenHeight - margin - taskbarHeight - spriteSize, position.y)
      );
    } else if (isAtTopEdge) {
      // At top edge, move a bit down (not all the way)
      newX = currentX;
      newY = Math.min(screenHeight / 3, position.y + 150);
    } else if (isAtBottomEdge) {
      // At bottom edge, move a bit up (not all the way)
      newX = currentX;
      newY = Math.max(margin, position.y - 150);
    } else {
      // Not at edge, move to closest edge (left or right) - shorter distance
      const moveToLeft = currentX < screenWidth / 2;
      const targetX = moveToLeft ? margin : screenWidth - spriteSize - margin;
      // Move only partway (about 60% of the distance)
      const distance = targetX - currentX;
      newX = currentX + distance * 0.6;
      newY = Math.max(
        margin,
        Math.min(screenHeight - margin - taskbarHeight - spriteSize, position.y)
      );
    }

    // Smooth transition to edge
    setPosition({ x: newX, y: newY });

    // If clicked 3+ times in 2 seconds, get angry
    if (clickCountRef.current >= 3) {
      setState("angry");
      showMessage("Hey! Stop that! 😾");
      clickCountRef.current = 0;

      // Stay angry for 20 seconds, then go back to awake
      setTimeout(() => {
        setState("awake");
      }, 20000);
    } else {
      // Normal click - purr
      setState("purring");
      showMessage();
      setTimeout(() => {
        setState("awake");
      }, 1000);
    }

    // Reset click count after 2 seconds
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);
  }, [setState, showMessage, setPosition]);

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      // Don't respond during angry state
      if (state === "angry") return;

      const { position } = useAlbaStore.getState();
      const distance = Math.sqrt(
        Math.pow(e.clientX - (position.x + 64), 2) +
          Math.pow(e.clientY - (position.y + 64), 2)
      );

      // Only become curious if mouse is close (within 150px) and not sleeping/angry
      if ((state === "awake" || state === "sleeping") && distance < 150) {
        setState("curious");
      } else if (state === "curious" && distance >= 150) {
        setState("awake");
      }
    },
    [state, setState]
  );

  // Idle timeout - if no mouse movement for 5 seconds, go to sleep
  // Don't trigger during angry state
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    if (state === "awake" || state === "curious") {
      const handleActivity = () => {
        if (idleTimer) clearTimeout(idleTimer);

        // Fixed idle time of 5 seconds
        const idleTime = 5000;
        idleTimer = setTimeout(() => {
          if (state === "awake" || state === "curious") {
            setState("sleeping");
          }
        }, idleTime);
      };

      handleActivity();
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("click", handleActivity);

      return () => {
        if (idleTimer) clearTimeout(idleTimer);
        window.removeEventListener("mousemove", handleActivity);
        window.removeEventListener("click", handleActivity);
      };
    }
  }, [state, setState]);

  useEffect(() => {
    // Don't respond to mouse movement during angry state
    if (state === "awake" || state === "sleeping" || state === "curious") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [state, handleMouseMove]);

  // Continuous walking animation - Alba explores the screen
  useEffect(() => {
    let walkInterval: NodeJS.Timeout;

    const startWalking = () => {
      // Random position on screen (avoid edges and taskbar)
      const margin = 200; // Keep away from edges
      const taskbarHeight = 56;
      const randomX =
        margin + Math.random() * (window.innerWidth - margin * 2 - 128);
      const randomY =
        margin +
        Math.random() * (window.innerHeight - margin * 2 - taskbarHeight - 128);

      setState("walking");
      setPosition({ x: randomX, y: randomY });

      // After walking, go to sleep or stay awake
      setTimeout(() => {
        setState(Math.random() > 0.5 ? "sleeping" : "awake");
      }, 3000);
    };

    // Start walking immediately, then every 8-12 seconds
    // Don't walk during angry state
    if (state === "sleeping" || state === "awake") {
      const delay = state === "sleeping" ? 5000 : 8000 + Math.random() * 4000;
      walkInterval = setTimeout(startWalking, delay);
    }

    return () => {
      if (walkInterval) clearTimeout(walkInterval);
    };
  }, [state, setState, setPosition]);

  return {
    handleHover,
    handleClick,
    state,
  };
}
