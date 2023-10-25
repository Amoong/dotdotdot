import { useCallback, useEffect, useRef } from "react";
import { BAR_CANVAS_HEIGHT } from "./constants";
import { useColorStore } from "@/store/color";

const WIDTH = 244;

const CANVAS_WIDTH = WIDTH * 2;

function Gradation() {
  const baseColor = useColorStore((state) => state.baseColor);

  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    ctx.clearRect(0, 0, CANVAS_WIDTH, BAR_CANVAS_HEIGHT);

    ctx.globalCompositeOperation = "multiply";

    const gradient = ctx?.createLinearGradient(0, 0, 0, BAR_CANVAS_HEIGHT);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, CANVAS_WIDTH, BAR_CANVAS_HEIGHT);

    const gradient2 = ctx?.createLinearGradient(0, 0, CANVAS_WIDTH, 0);

    const { r, g, b } = baseColor;

    gradient2.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
    gradient2.addColorStop(1, `rgba(${r}, ${g}, ${b}, 1)`);

    ctx.fillStyle = gradient2;

    ctx.fillRect(0, 0, CANVAS_WIDTH, BAR_CANVAS_HEIGHT);
  }, [baseColor]);

  const onPointerDown = (e: React.PointerEvent) => {
    isPressedRef.current = true;

    moveCircle(e.clientX, e.clientY);
  };

  const moveCircle = (clientX: number, clientY: number) => {
    if (!circleRef.current || !canvasRef.current) {
      return;
    }

    const { left, top, width, height } =
      canvasRef.current.getBoundingClientRect();

    const x = Math.max(0, Math.min(width, clientX - left));
    const y = Math.max(0, Math.min(height, clientY - top));

    const { width: circleW, height: circleH } =
      circleRef.current.getBoundingClientRect();

    const targetX = x - circleW / 2;
    const targetY = y - circleH / 2;

    circleRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`;
  };

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isPressedRef.current) {
      return;
    }

    moveCircle(e.clientX, e.clientY);
  }, []);

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
      className={`relative h-full w-${WIDTH}px overflow-hidden`}
    >
      <canvas
        className="h-full w-full"
        width={CANVAS_WIDTH}
        height={BAR_CANVAS_HEIGHT}
        ref={canvasRef}
      ></canvas>
      <div
        ref={circleRef}
        className="shadow-[0_0_4px_4px_rgb(0,0,0) absolute left-0 top-0 h-3 w-3 rounded-full border-2 border-white"
      />
    </div>
  );
}

export default Gradation;
