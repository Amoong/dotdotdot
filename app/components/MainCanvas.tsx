"use client";

import { useEffect, useRef } from "react";

function MainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !canvasRef.current.getContext) {
      console.log(1);
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      console.log(2);
      return;
    }
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(2, 2, 5, 5);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="main-canvas"
      className="image-ren aspect-square w-full border-2 border-solid border-orange-200"
      width={20}
      height={20}
    >
      Your browser does not support canvas. 😭
    </canvas>
  );
}

export default MainCanvas;
