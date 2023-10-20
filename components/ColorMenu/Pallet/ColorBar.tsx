"use client";

import RangeBar from "./RangeBar";
import { BAR_CANVAS_HEIGHT } from "./constants";

function ColorBar() {
  const drawPreviewColors = (ctx: CanvasRenderingContext2D) => {
    const linearGradient = ctx.createLinearGradient(0, 0, 0, BAR_CANVAS_HEIGHT);
    linearGradient.addColorStop(0, "#ff0000");
    linearGradient.addColorStop(1 / 6, "#ffff00");
    linearGradient.addColorStop(2 / 6, "#00ff00");
    linearGradient.addColorStop(3 / 6, "#00ffff");
    linearGradient.addColorStop(4 / 6, "#0000ff");
    linearGradient.addColorStop(5 / 6, "#ff00ff");
    linearGradient.addColorStop(1, "#ff0000");

    ctx.fillStyle = linearGradient;

    ctx.fillRect(0, 0, BAR_CANVAS_HEIGHT, BAR_CANVAS_HEIGHT);
  };

  return <RangeBar drawPreviewColors={drawPreviewColors} />;
}

export default ColorBar;
