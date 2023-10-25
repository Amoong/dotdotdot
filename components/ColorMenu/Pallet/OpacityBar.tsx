"use client";

import { useColorStore } from "@/store/color";
import RangeBar from "./RangeBar";
import { BAR_CANVAS_HEIGHT, BAR_CANVAS_WIDTH } from "./constants";

function OpacityBar() {
  const baseColor = useColorStore((state) => state.baseColor);
  const setOpacity = useColorStore((state) => state.setOpacity);

  const drawPreviewColors = (ctx: CanvasRenderingContext2D) => {
    const squareLength = BAR_CANVAS_WIDTH / 5.5;

    for (let i = 0; i <= BAR_CANVAS_WIDTH; i++) {
      for (let j = 0; j <= BAR_CANVAS_HEIGHT; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillStyle = "#e2e2e2";
        } else {
          ctx.fillStyle = "#ffffff";
        }

        ctx.fillRect(
          i * squareLength,
          j * squareLength,
          squareLength,
          squareLength,
        );
      }
    }

    const linearGradient = ctx.createLinearGradient(0, 0, 0, BAR_CANVAS_HEIGHT);

    const { r, g, b } = baseColor;

    linearGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
    linearGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    ctx.fillStyle = linearGradient;

    ctx.fillRect(0, 0, BAR_CANVAS_HEIGHT, BAR_CANVAS_HEIGHT);
  };

  const onSliderMove = (info: { value: number }) => {
    setOpacity(info.value);
  };

  return (
    <RangeBar
      drawPreviewColors={drawPreviewColors}
      onSliderMove={onSliderMove}
    />
  );
}

export default OpacityBar;
