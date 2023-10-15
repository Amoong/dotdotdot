"use client";

import { useEffect, useRef, useState } from "react";
import GridCanvas from "./GridCanvas";

interface Props {
  width: number;
  height: number;
}

function MainCanvas(props: Props) {
  const [girdWidth, setGridWidth] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);
  const [gridGap, setGridGap] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !canvasRef.current.getContext) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      return;
    }
    ctx.imageSmoothingEnabled = false;

    for (let i = 0; i < props.width; i++) {
      for (let j = 0; j < props.height; j++) {
        const color = (i + j) % 2 === 0 ? "white" : "dodgerblue";
        ctx.fillStyle = color;
        // ctx.fillRect(i, j, i + 1, j + 1);
      }
    }
  }, [props.width, props.height]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setGridWidth(ref.current.clientWidth * 2);
    setGridHeight(ref.current.clientHeight * 2);
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setGridGap((ref.current.clientWidth * 2) / props.width);
  }, [props.width]);

  return (
    <section ref={ref} className="relative w-full">
      <GridCanvas width={girdWidth} height={gridHeight} gap={gridGap} />
      <canvas
        role="presentation"
        ref={canvasRef}
        className="image-ren w-full border-2 border-solid border-gray-300"
        width={props.width}
        height={props.height}
      >
        Your browser does not support canvas. 😭
      </canvas>
    </section>
  );
}

export default MainCanvas;
