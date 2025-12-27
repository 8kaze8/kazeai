export type AlbaState = "sleeping" | "awake" | "walking" | "purring" | "curious" | "angry";

export interface AlbaStoreState {
  state: AlbaState;
  position: { x: number; y: number };
  message: string | null;
  setState: (state: AlbaState) => void;
  setPosition: (pos: { x: number; y: number }) => void;
  showMessage: (msg?: string) => void;
}

