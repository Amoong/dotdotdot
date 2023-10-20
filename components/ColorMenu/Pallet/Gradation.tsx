import { useEffect, useRef } from "react";
import { BAR_CANVAS_HEIGHT } from "./constants";

const WIDTH = 244;

const CANVAS_WIDTH = WIDTH * 2;

function Gradation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.globalCompositeOperation = "multiply";

    const gradient = ctx?.createLinearGradient(0, 0, 0, BAR_CANVAS_HEIGHT);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(70, 70, 70, 1)");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, CANVAS_WIDTH, BAR_CANVAS_HEIGHT);

    const gradient2 = ctx?.createLinearGradient(0, 0, CANVAS_WIDTH, 0);
    gradient2.addColorStop(0, "rgba(255, 255, 255, 0)");
    gradient2.addColorStop(1, "rgba(255, 0, 0, 1)");

    ctx.fillStyle = gradient2;

    ctx.fillRect(0, 0, CANVAS_WIDTH, BAR_CANVAS_HEIGHT);
  }, []);

  return (
    <div className={`relative h-full w-${WIDTH}px`}>
      <canvas
        className="h-full w-full"
        width={CANVAS_WIDTH}
        height={BAR_CANVAS_HEIGHT}
        ref={canvasRef}
      ></canvas>
      <div className="shadow-[0_0_4px_4px_rgb(0,0,0) absolute left-0 top-0 h-3 w-3 rounded-full border-2 border-white" />
    </div>
  );
}

export default Gradation;
