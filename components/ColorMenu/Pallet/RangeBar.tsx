"use client";

import { useCallback, useEffect, useRef } from "react";
import { BAR_CANVAS_HEIGHT, BAR_CANVAS_WIDTH, BAR_WIDTH } from "./constants";

interface Props {
  drawPreviewColors: (ctx: CanvasRenderingContext2D) => void;
}

function RangeBar({ drawPreviewColors }: Props) {
  const pressedRef = useRef(false);

  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

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

  const onPointerUp = useCallback(() => {
    pressedRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointerup", onPointerUp);

    return () => window.removeEventListener("pointerup", onPointerUp);
  }, [onPointerUp]);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!pressedRef.current || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const y = e.clientY - rect.top;

    moveSlider(y);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);

    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [onPointerMove]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;

    pressedRef.current = true;

    moveSlider(y);
  };

  const moveSlider = (y: number) => {
    if (!sliderRef.current || !ref.current) {
      return;
    }

    const yPos = Math.max(0, Math.min(ref.current.clientHeight, y));

    sliderRef.current.style.transform = `translateY(${yPos}px)`;
  };

  return (
    <div
      ref={ref}
      className={`relative flex h-full w-[${BAR_WIDTH}] flex-col items-center`}
      onPointerDown={onPointerDown}
    >
      <canvas
        className="h-full w-full"
        ref={canvasRef}
        role="presentation"
        width={BAR_CANVAS_WIDTH}
        height={BAR_CANVAS_HEIGHT}
      ></canvas>
      <div
        ref={sliderRef}
        className="absolute top-0 h-1 w-[120%] origin-center border-[1px] border-solid border-white opacity-70 shadow-[0_0_1px_1px_rgba(0,0,0,0.2)]"
      />
    </div>
  );
}

export default RangeBar;
