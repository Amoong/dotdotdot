"use client";

import { useEffect, useRef } from "react";
import { BAR_HEIGHT, BAR_WIDTH } from "./constants";

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
    <div className="relative flex w-8 flex-col items-center">
      <canvas
        className="w-10/12"
        ref={canvasRef}
        role="presentation"
        width={BAR_WIDTH}
        height={BAR_HEIGHT}
      ></canvas>
      <div className="absolute top-0 h-1 w-full border-[1px] border-solid border-white opacity-70 shadow-[0_0_1px_1px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

export default RangeBar;
