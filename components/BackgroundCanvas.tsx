import { useCallback, useEffect, useRef } from "react";

interface Props {
  squreWidth: number;
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

    const { width, height } = ref.current.getBoundingClientRect();

    ref.current.width = width;
    ref.current.height = height;

    for (let i = 0; i < height / props.squreWidth; i++) {
      for (let j = 0; j < width / props.squreWidth; j++) {
        if ((i + j) % 2 === 0) {
          continue;
        }

        const x = j * props.squreWidth;
        const y = i * props.squreWidth;
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(x, y, props.squreWidth, props.squreWidth);
      }
    }
  }, [props.squreWidth]);

  useEffect(() => {
    drawBackground();
  }, [drawBackground]);

  return (
    <canvas
      role="presentation"
      ref={ref}
      className="pixelated-canvas absolute left-0 top-0 -z-10 h-full w-full"
    ></canvas>
  );
}

export default BackgroundCanvas;
