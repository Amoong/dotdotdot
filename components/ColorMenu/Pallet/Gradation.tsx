import { useCallback, useEffect, useRef } from "react";
import { BAR_CANVAS_HEIGHT, CANVAS_SIZE_MULTIPLIER } from "./constants";
import { useColorStore } from "@/store/color";

const WIDTH = 244;

const CANVAS_WIDTH = WIDTH * CANVAS_SIZE_MULTIPLIER;

function Gradation() {
  const baseRgb = useColorStore((state) => state.baseRgb);
  const setRgb = useColorStore((state) => state.setRgb);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isPressedRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      return;
    }
    ctxRef.current = ctx;

    ctx.globalCompositeOperation = "source-over";

    ctx.clearRect(0, 0, CANVAS_WIDTH, BAR_CANVAS_HEIGHT);

    const gradient = ctx?.createLinearGradient(0, 0, 0, BAR_CANVAS_HEIGHT);

    // start color of gradient is not exact rgb(255, 255, 255)
    // so adjust a little bit of start position
    gradient.addColorStop(0.02, "rgb(255, 255, 255)");
    gradient.addColorStop(1, "rgb(0, 0, 0)");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, CANVAS_WIDTH, BAR_CANVAS_HEIGHT);

    ctx.globalCompositeOperation = "multiply";

    const gradient2 = ctx?.createLinearGradient(0, 0, CANVAS_WIDTH, 0);

    const { r, g, b } = baseRgb;

    // end color of gradient is not exact 'baseRgb'
    // so adjust a little bit of end position
    gradient2.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
    gradient2.addColorStop(0.98, `rgba(${r}, ${g}, ${b}, 1)`);

    ctx.fillStyle = gradient2;

    ctx.fillRect(0, 0, CANVAS_WIDTH, BAR_CANVAS_HEIGHT);
  }, [baseRgb]);

  const onPointerDown = (e: React.PointerEvent) => {
    isPressedRef.current = true;

    handleWithPointer(e.clientX, e.clientY);
  };

  const fetchColor = useCallback(
    (x: number, y: number) => {
      if (!ctxRef.current) {
        return;
      }

      const canvasX = x * CANVAS_SIZE_MULTIPLIER;
      const canvasY = y * CANVAS_SIZE_MULTIPLIER;

      const pixel = ctxRef.current.getImageData(canvasX, canvasY, 1, 1);

      setRgb({ r: pixel.data[0], g: pixel.data[1], b: pixel.data[2] });
    },
    [setRgb],
  );

  const handleWithPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!circleRef.current || !canvasRef.current) {
        return;
      }

      const { left, top, width, height } =
        canvasRef.current.getBoundingClientRect();

      const x = Math.max(0, Math.min(width, clientX - left));
      const y = Math.max(0, Math.min(height, clientY - top));

      fetchColor(x, y);

      const { width: circleW, height: circleH } =
        circleRef.current.getBoundingClientRect();

      const targetX = x - circleW / 2;
      const targetY = y - circleH / 2;

      circleRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`;
    },
    [fetchColor],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isPressedRef.current) {
        return;
      }

      handleWithPointer(e.clientX, e.clientY);
    },
    [handleWithPointer],
  );

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);

    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [onPointerMove]);

  const onPointerUp = useCallback(() => {
    isPressedRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointerup", onPointerUp);

    return () => window.removeEventListener("pointerup", onPointerUp);
  });

  return (
    <div
      onPointerDown={onPointerDown}
      className={`relative h-full w-[${WIDTH}]px overflow-hidden`}
    >
      <canvas
        className="h-full w-full"
        width={CANVAS_WIDTH}
        height={BAR_CANVAS_HEIGHT}
        ref={canvasRef}
      ></canvas>
      <div
        ref={circleRef}
        className="absolute left-0 top-0 h-3 w-3 rounded-full border-2 border-white shadow-[0_0_1px_1px_#aeaeae]"
      />
    </div>
  );
}

export default Gradation;
