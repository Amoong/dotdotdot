"use client";

import { useColorStore } from "@/store/color";
import RangeBar from "./RangeBar";
import { BAR_CANVAS_HEIGHT, BAR_CANVAS_WIDTH } from "./constants";

function ColorBar() {
  const setBaseRgb = useColorStore((state) => state.setBaseRgb);

  const drawPreviewColors = (ctx: CanvasRenderingContext2D) => {
    // 처음부터 끝까지 그라데이션으로 채우면 위 - 아래 끝 픽셀을 추출해도
    // 정확히 #ff0000 값이 안 나오고 근사치만 나와서
    // 위 - 아래 끝 부분이 확실하게 #ff0000으로 되도록 함

    const linearGradient = ctx.createLinearGradient(
      0,
      0,
      0,
      BAR_CANVAS_HEIGHT - 2,
    );

    ctx.fillStyle = "#ff0000";

    ctx.fillRect(0, 0, BAR_CANVAS_WIDTH, BAR_CANVAS_HEIGHT);

    linearGradient.addColorStop(0, "#ff0000");
    linearGradient.addColorStop(1 / 6, "#ffff00");
    linearGradient.addColorStop(2 / 6, "#00ff00");
    linearGradient.addColorStop(3 / 6, "#00ffff");
    linearGradient.addColorStop(4 / 6, "#0000ff");
    linearGradient.addColorStop(5 / 6, "#ff00ff");
    linearGradient.addColorStop(1, "#ff0000");

    ctx.fillStyle = linearGradient;

    ctx.fillRect(0, 1, BAR_CANVAS_WIDTH, BAR_CANVAS_HEIGHT - 1);
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
