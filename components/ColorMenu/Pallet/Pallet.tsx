"use client";

import { useRef } from "react";
import ColorBar from "./ColorBar";
import OpacityBar from "./OpacityBar";

function Pallet() {
  return (
    <section className="p-2">
      <div className="flex">
        <OpacityBar />
        <ColorBar />
      </div>
    </section>
  );
}

export default Pallet;
