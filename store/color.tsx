import { create } from "zustand";
import { devtools } from "zustand/middleware";

const DEFAULT_COLOR = {
  r: 255,
  g: 0,
  b: 0,
  a: 1,
};

type RGB = { r: number; g: number; b: number };
type RGBA = { r: number; g: number; b: number; a: number };

interface ColorState {
  baseRgb: RGB; // color from ColorBar
  opacity: number; // opacity from OpacityBar
  rgb: RGB; // color from Gradation
  color: RGBA; // combination of 'opacity' and 'rgb'
  setBaseRgb: (baseRgb: RGB) => void;
  setOpacity: (opacity: number) => void;
  setRgb: (rgb: RGB) => void;
}

export const useColorStore = create<ColorState, [["zustand/devtools", never]]>(
  devtools(
    (set) => ({
      baseRgb: { r: DEFAULT_COLOR.r, g: DEFAULT_COLOR.g, b: DEFAULT_COLOR.b },
      opacity: DEFAULT_COLOR.a,
      rgb: { r: DEFAULT_COLOR.r, g: DEFAULT_COLOR.g, b: DEFAULT_COLOR.b },
      color: DEFAULT_COLOR,
      setBaseRgb: (baseRgb: RGB) => {
        if (!validateRGB(baseRgb)) {
          console.error("color store: Invalid 'baseRgb'");
          return;
        }

        set((state) => ({
          baseRgb,
          color: { ...state.color, ...baseRgb },
        }));
      },
      setOpacity: (opacity: number) => {
        if (opacity < 0 || opacity > 1) {
          console.error("color store: Invalid 'opacity'");
          return;
        }

        set((state) => ({
          opacity,
          color: { ...state.color, a: opacity },
        }));
      },
      setRgb: (rgb: RGB) => {
        if (!validateRGB(rgb)) {
          console.error("color store: Invalid 'rgb'");
          return;
        }

        set((state) => ({
          rgb,
          color: { ...state.color, ...rgb },
        }));
      },
    }),
    { name: "color" },
  ),
);

function validateRGB(rgb: RGB) {
  if (
    rgb.r < 0 ||
    rgb.r > 255 ||
    rgb.g < 0 ||
    rgb.g > 255 ||
    rgb.b < 0 ||
    rgb.b > 255
  ) {
    return false;
  }

  return true;
}
