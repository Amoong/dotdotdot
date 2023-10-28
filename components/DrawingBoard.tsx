"use client";

import { useEffect, useRef, useState } from "react";
import GridCanvas from "./GridCanvas";
import MainCanvas from "./MainCanvas";
import BackgroundCanvas from "./BackgroundCanvas";

interface Props {
  pixelWidth: number;
  pixelHeight: number;
}

function DrawingBoard(props: Props) {
  const [girdWidth, setGridWidth] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);
  const [gridGap, setGridGap] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setGridWidth(ref.current.clientWidth);
    setGridHeight(ref.current.clientHeight);
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setGridGap(ref.current.clientWidth / props.pixelWidth);
  }, [props.pixelWidth]);

  return (
    <section
      ref={ref}
      className="relative aspect-square w-full max-w-2xl border-8 border-solid border-yellow-900"
    >
      <BackgroundCanvas squreWidth={6} />
      <GridCanvas width={girdWidth} height={gridHeight} gap={gridGap} />
      <MainCanvas width={props.pixelWidth} height={props.pixelHeight} />
    </section>
  );
}

export default DrawingBoard;
