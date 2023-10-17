"use client";

import { useEffect, useRef } from "react";

interface Props {
  width: number;
  height: number;
}

function MainCanvas(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

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

    ctx.fillRect(x, y, 1, 1);
  };

  return (
    <canvas
      role="presentation"
      ref={canvasRef}
      className="image-ren w-full border-2 border-solid border-gray-400 bg-transparent"
      width={props.width}
      height={props.height}
      onMouseDown={onMouseDown}
    >
      Your browser does not support canvas. 😭
    </canvas>
  );
}

export default MainCanvas;
