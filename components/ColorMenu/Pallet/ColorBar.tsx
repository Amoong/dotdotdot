"use client";

import { useColorStore } from "@/store/color";
import RangeBar from "./RangeBar";
import { BAR_CANVAS_HEIGHT, BAR_CANVAS_WIDTH } from "./constants";

function ColorBar() {
  const setBaseRgb = useColorStore((state) => state.setBaseRgb);

  const drawPreviewColors = (ctx: CanvasRenderingContext2D) => {
    const linearGradient = ctx.createLinearGradient(0, 0, 0, BAR_CANVAS_HEIGHT);

    // edge color of gradient is not exact #ff0000
    // so adjust edge point a little
    linearGradient.addColorStop(0.02, "#ff0000");
    linearGradient.addColorStop(1 / 6, "#ffff00");
    linearGradient.addColorStop(2 / 6, "#00ff00");
    linearGradient.addColorStop(3 / 6, "#00ffff");
    linearGradient.addColorStop(4 / 6, "#0000ff");
    linearGradient.addColorStop(5 / 6, "#ff00ff");
    linearGradient.addColorStop(0.98, "#ff0000");

    ctx.fillStyle = linearGradient;

    ctx.fillRect(0, 0, BAR_CANVAS_WIDTH, BAR_CANVAS_HEIGHT);
  };

  const onSliderMove = (info: {
    value: number;
    ctx: CanvasRenderingContext2D;
  }) => {
    const yPos = Math.min(
      info.value * BAR_CANVAS_HEIGHT,
      BAR_CANVAS_HEIGHT - 1,
    );

    const pixel = info.ctx.getImageData(2, yPos, 1, 1);
    const data = pixel.data;

    setBaseRgb({ r: data[0], g: data[1], b: data[2] });
  };

  return (
    <RangeBar
      drawPreviewColors={drawPreviewColors}
      onSliderMove={onSliderMove}
    />
  );
}

export default ColorBar;
