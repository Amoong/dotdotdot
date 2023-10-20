import { useEffect, useRef } from "react";
import { PALLET_WIDTH } from "./constants";

const HEIGHT = 25;

const CANVAS_WIDTH = PALLET_WIDTH;
const CANVAS_HEIGHT = HEIGHT;

function ColorInfo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

    const color = "#ff0000";

    const squareLength = 8;

    for (let i = 0; i <= PALLET_WIDTH; i++) {
      for (let j = 0; j <= CANVAS_HEIGHT; j++) {
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

    ctx.fillStyle = color;

    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // color 값에 따라 폰트 잘 보이는 색상으로 바뀌게
    ctx.fillStyle = "#000";

    ctx.font = "15px consolas";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const x = CANVAS_WIDTH / 2;
    const y = CANVAS_HEIGHT / 2;

    ctx.fillText(color, x, y);
  }, []);

  return (
    <div className={`h-[${HEIGHT}px] w-full`}>
      <canvas
        className="w-full"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={canvasRef}
      ></canvas>
    </div>
  );
}

export default ColorInfo;
