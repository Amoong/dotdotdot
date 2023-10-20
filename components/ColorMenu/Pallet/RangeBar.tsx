"use client";

import { useEffect, useRef } from "react";
import { BAR_CANVAS_HEIGHT, BAR_CANVAS_WIDTH, BAR_WIDTH } from "./constants";

interface Props {
  drawPreviewColors: (ctx: CanvasRenderingContext2D) => void;
}

function RangeBar({ drawPreviewColors }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

    drawPreviewColors(ctx);
  }, [drawPreviewColors]);

  return (
    <div
      className={`relative flex h-full w-[${BAR_WIDTH}] flex-col items-center`}
    >
      <canvas
        className="h-full w-full"
        ref={canvasRef}
        role="presentation"
        width={BAR_CANVAS_WIDTH}
        height={BAR_CANVAS_HEIGHT}
      ></canvas>
      <div className="absolute top-0 h-1 w-[120%] border-[1px] border-solid border-white opacity-70 shadow-[0_0_1px_1px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

export default RangeBar;
