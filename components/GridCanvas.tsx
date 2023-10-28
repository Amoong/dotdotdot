import { useCallback, useEffect, useRef } from "react";

interface Props {
  width: number;
  height: number;
  gap: number;
}

function GridCanvas(props: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  const drawGrid = useCallback(() => {
    if (!ref.current || !ref.current.getContext) {
      return;
    }

    const ctx = ref.current.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1.5;

    for (let i = 0; i < props.height / props.gap; i++) {
      for (let j = 0; j < props.width / props.gap; j++) {
        const x = j * props.gap;
        const y = i * props.gap;
        ctx.strokeRect(x, y, props.gap, props.gap);
      }
    }
  }, [props.height, props.width, props.gap]);

  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  return (
    <canvas
      role="presentation"
      ref={ref}
      width={props.width}
      height={props.height}
      className="pixelated-canvas absolute left-0 top-0 -z-10 w-full"
    ></canvas>
  );
}

export default GridCanvas;
