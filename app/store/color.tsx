import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ColorState {
  color: string;
  setColor: (color: string) => void;
}

export const useColorStore = create<ColorState, [["zustand/devtools", never]]>(
  devtools(
    (set) => ({
      color: "#ffffff",
      setColor: (color: string) => set(() => ({ color })),
    }),
    { name: "color" },
  ),
);
