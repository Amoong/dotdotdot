"use client";

import { useEffect, useRef, useState } from "react";
import GridCanvas from "./GridCanvas";
import MainCanvas from "./MainCanvas";

const GRID_GAP = 100;

interface Props {
  width: number;
  height: number;
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

    setGridWidth(ref.current.clientWidth * 2);
    setGridHeight(ref.current.clientHeight * 2);
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setGridGap((ref.current.clientWidth * 2) / GRID_GAP);
  }, [props.width]);

  return (
    <section ref={ref} className="relative w-full">
      <GridCanvas width={girdWidth} height={gridHeight} gap={gridGap} />
      <MainCanvas width={props.width} height={props.height} />
    </section>
  );
}

export default DrawingBoard;
