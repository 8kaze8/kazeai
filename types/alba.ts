export type AlbaState = "sleeping" | "awake" | "walking" | "purring" | "curious" | "angry" | "eating";
export type AlbaDirection = "left" | "right";

export interface AlbaStoreState {
  state: AlbaState;
  position: { x: number; y: number };
  direction: AlbaDirection;
  message: string | null;
  setState: (state: AlbaState) => void;
  setPosition: (pos: { x: number; y: number }) => void;
  setDirection: (dir: AlbaDirection) => void;
  showMessage: (msg?: string) => void;
}

