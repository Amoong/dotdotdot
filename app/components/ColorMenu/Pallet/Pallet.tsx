"use client";

import { useEffect, useRef } from "react";

function Pallet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

    const linearGradient = ctx.createLinearGradient(0, 0, 0, 150);
    linearGradient.addColorStop(0, "#ff0000");
    linearGradient.addColorStop(1 / 6, "#ffff00");
    linearGradient.addColorStop(2 / 6, "#00ff00");
    linearGradient.addColorStop(3 / 6, "#00ffff");
    linearGradient.addColorStop(4 / 6, "#0000ff");
    linearGradient.addColorStop(5 / 6, "#ff00ff");
    linearGradient.addColorStop(1, "#ff0000");

    ctx.fillStyle = linearGradient;

    ctx.fillRect(0, 0, 150, 150);
  }, []);

  return (
    <section className="p-2">
      <div className="flex">
        <div className="relative flex w-8 flex-col items-center">
          <canvas
            className="w-10/12"
            ref={canvasRef}
            role="presentation"
            width={25}
            height={150}
          ></canvas>
          <div className="absolute top-0 h-1 w-full border-[1px] border-solid border-white opacity-70 shadow-[0_0_1px_1px_rgba(0,0,0,0.2)]" />
        </div>
        <div className="relative flex w-8 flex-col items-center">
          <canvas
            className="w-10/12"
            ref={canvasRef}
            role="presentation"
            width={25}
            height={150}
          ></canvas>
          <div className="absolute top-0 h-1 w-full border-[1px] border-solid border-white opacity-70 shadow-[0_0_1px_1px_rgba(0,0,0,0.2)]" />
        </div>
      </div>
    </section>
  );
}

export default Pallet;
