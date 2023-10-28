import { useCallback, useEffect, useRef } from "react";
import { PALLET_WIDTH } from "./constants";
import { useColorStore } from "@/store/color";
import { useRgba } from "@/hooks/useRgba";

const HEIGHT = 25;

const CANVAS_WIDTH = PALLET_WIDTH;
const CANVAS_HEIGHT = HEIGHT;

function ColorInfo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const color = useColorStore((state) => state.color);
  const rgba = useRgba();

  const getFontColor = useCallback(() => {
    const { r, g, b, a } = color;

    if (a < 0.5) {
      return "#000";
    }

    if (r + g + b < 300) {
      return "#fff";
    } else {
      return "#000";
    }
  }, [color]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

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

    ctx.fillStyle = rgba;

    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = getFontColor();

    ctx.font = "15px consolas";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const x = CANVAS_WIDTH / 2;
    const y = CANVAS_HEIGHT / 2;

    ctx.fillText(rgba, x, y);
  }, [rgba, getFontColor]);

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
