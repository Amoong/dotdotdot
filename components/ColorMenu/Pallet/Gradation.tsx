import { useEffect, useRef } from "react";

const WIDTH = 150 * 2;
const HEIGHT = 100 * 2;

function Gradation() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = ref.current.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.globalCompositeOperation = "multiply";

    const gradient = ctx?.createLinearGradient(0, 0, 0, HEIGHT);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(70, 70, 70, 1)");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const gradient2 = ctx?.createLinearGradient(0, 0, WIDTH, 0);
    gradient2.addColorStop(0, "rgba(255, 255, 255, 0)");
    gradient2.addColorStop(1, "rgba(255, 0, 0, 1)");

    ctx.fillStyle = gradient2;

    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }, []);

  return (
    <div className="h-full">
      <canvas
        className="h-full"
        width={WIDTH}
        height={HEIGHT}
        ref={ref}
      ></canvas>
    </div>
  );
}

export default Gradation;
