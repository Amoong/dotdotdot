import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ColorState {
  baseColor: { r: number; g: number; b: number };
  opacity: number;
  color: string;
  setOpacity: (opacity: number) => void;
  setColor: (color: string) => void;
}

export const useColorStore = create<ColorState, [["zustand/devtools", never]]>(
  devtools(
    (set) => ({
      baseColor: { r: 255, g: 0, b: 0 },
      opacity: 1,
      color: "#ff0000",
      setOpacity: (opacity: number) =>
        set(() => ({
          opacity,
        })),
      setColor: (color: string) => set(() => ({ color })),
    }),
    { name: "color" },
  ),
);
