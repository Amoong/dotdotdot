"use client";

import RangeBar from "./RangeBar";
import { BAR_HEIGHT, BAR_WIDTH } from "./constants";

function OpacityBar() {
  const drawPreviewColors = (ctx: CanvasRenderingContext2D) => {
    const color = "#ff0000";

    const squareLength = BAR_WIDTH / 5.5;

    for (let i = 0; i <= BAR_WIDTH; i++) {
      for (let j = 0; j <= BAR_HEIGHT; j++) {
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

    const linearGradient = ctx.createLinearGradient(0, 0, 0, BAR_HEIGHT);
    linearGradient.addColorStop(0, color + "ff");
    linearGradient.addColorStop(1, color + "00");

    ctx.fillStyle = linearGradient;

    ctx.fillRect(0, 0, BAR_HEIGHT, BAR_HEIGHT);
  };

  return <RangeBar drawPreviewColors={drawPreviewColors} />;
}

export default OpacityBar;
