"use client";

import { useRef } from "react";

interface Props {
  width: number;
  height: number;
}

function MainCanvas(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <canvas
      role="presentation"
      ref={canvasRef}
      className="image-ren w-full border-2 border-solid border-gray-300 bg-transparent"
      width={props.width}
      height={props.height}
    >
      Your browser does not support canvas. 😭
    </canvas>
  );
}

export default MainCanvas;
