import { useCallback, useEffect, useRef } from "react";

const SQUARE_WIDTH = 6;

interface Props {
  width: number;
  height: number;
}

function BackgroundCanvas(props: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  const drawBackground = useCallback(() => {
    if (!ref.current || !ref.current.getContext) {
      return;
    }

    const ctx = ref.current.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.imageSmoothingEnabled = false;

    for (let i = 0; i < props.height / SQUARE_WIDTH; i++) {
      for (let j = 0; j < props.width / SQUARE_WIDTH; j++) {
        if ((i + j) % 2 === 0) {
          continue;
        }

        const x = j * SQUARE_WIDTH;
        const y = i * SQUARE_WIDTH;
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
      }
    }
  }, [props.height, props.width]);

  useEffect(() => {
    drawBackground();
  }, [drawBackground]);

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

export default BackgroundCanvas;
