"use client";

import { useRgba } from "@/hooks/useRgba";
import { useEffect, useRef } from "react";

interface Props {
  width: number;
  height: number;
}

function MainCanvas(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rgba = useRgba();

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    ctxRef.current = canvasRef.current.getContext("2d");
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ctxRef.current) {
      return;
    }

    const ctx = ctxRef.current;

    const { top, left, width } = e.currentTarget.getBoundingClientRect();

    const ratio = width / props.width;

    const x = Math.floor((e.clientX - left) / ratio);
    const y = Math.floor((e.clientY - top) / ratio);

    ctx.fillStyle = rgba;

    ctx.clearRect(x, y, 1, 1);
    ctx.fillRect(x, y, 1, 1);
  };

  return (
    <canvas
      role="presentation"
      ref={canvasRef}
      className="pixelated-canvas h-full w-full bg-transparent"
      width={props.width}
      height={props.height}
      onMouseDown={onMouseDown}
    >
      Your browser does not support canvas. 😭
    </canvas>
  );
}

export default MainCanvas;
