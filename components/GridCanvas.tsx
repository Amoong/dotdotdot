import { useCallback, useEffect, useRef } from "react";

interface Props {
  width: number;
  height: number;
  gap: number;
}

function GridCanvas(props: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  const initGridCanvas = useCallback(() => {
    if (!ref.current || !ref.current.getContext) {
      return;
    }

    const ctx = ref.current.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.imageSmoothingEnabled = false;

    for (let i = 0; i < props.height / props.gap; i++) {
      for (let j = 0; j < props.width / props.gap; j++) {
        if ((i + j) % 2 === 0) {
          continue;
        }

        const x = j * props.gap;
        const y = i * props.gap;
        ctx.fillStyle = "#c0c2c5";
        ctx.fillRect(x, y, props.gap, props.gap);
      }
    }
  }, [props.height, props.width, props.gap]);

  useEffect(() => {
    initGridCanvas();
  }, [initGridCanvas]);

  return (
    <canvas
      role="presentation"
      ref={ref}
      width={props.width}
      height={props.height}
      className="pixelated-canvas absolute left-0 top-0 -z-10 w-full border-2 border-solid border-black"
    ></canvas>
  );
}

export default GridCanvas;
