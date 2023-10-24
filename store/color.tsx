import { create } from "zustand";
import { devtools } from "zustand/middleware";

type BaseColor = { r: number; g: number; b: number };
interface ColorState {
  baseColor: BaseColor;
  opacity: number;
  color: string;
  setBaseColor: (baseColor: BaseColor) => void;
  setOpacity: (opacity: number) => void;
  setColor: (color: string) => void;
}

export const useColorStore = create<ColorState, [["zustand/devtools", never]]>(
  devtools(
    (set) => ({
      baseColor: { r: 255, g: 0, b: 0 },
      opacity: 1,
      color: "#ff0000",
      setBaseColor: (baseColor: BaseColor) => set(() => ({ baseColor })),
      setOpacity: (opacity: number) =>
        set(() => ({
          opacity,
        })),
      setColor: (color: string) => set(() => ({ color })),
    }),
    { name: "color" },
  ),
);
