declare module "@3d-dice/dice-box" {
  class DiceBox {
    constructor(selector: string, options?: DiceBoxOptions);
    init(): Promise<void>;
    roll(notation: string): Promise<DiceResult[]>;
    clear(): void;
    onRollComplete?: (results: DiceResult[]) => void;
  }

  export default DiceBox;
  export { DiceBox };

  export interface DiceBoxOptions {
    assetPath?: string;
    theme?: string;
    themeColor?: string;
    scale?: number;
    gravity?: number;
    spinForce?: number;
    throwForce?: number;
    startingHeight?: number;
    settleTimeout?: number;
    lightIntensity?: number;
    shadowTransparency?: number;
  }

  export interface DiceResult {
    value: number;
    sides: number;
    theme?: string;
    groupId?: number;
    rollId?: number;
  }
}
