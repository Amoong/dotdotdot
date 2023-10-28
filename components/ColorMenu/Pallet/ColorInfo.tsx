import { useEffect, useRef } from "react";
import { PALLET_WIDTH } from "./constants";
import { RGBA, useColorStore } from "@/store/color";

const HEIGHT = 25;

const CANVAS_WIDTH = PALLET_WIDTH;
const CANVAS_HEIGHT = HEIGHT;

function ColorInfo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const color = useColorStore((state) => state.color);

  const getFontColor = (rgba: RGBA) => {
    const { r, g, b, a } = rgba;

    if (a < 0.5) {
      return "#000";
    }

    if (r + g + b < 300) {
      return "#fff";
    } else {
      return "#000";
    }
  };

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

    const { r, g, b, a } = color;
    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;

    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = getFontColor(color);

    ctx.font = "15px consolas";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const x = CANVAS_WIDTH / 2;
    const y = CANVAS_HEIGHT / 2;

    ctx.fillText(rgba, x, y);
  }, [color]);

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
