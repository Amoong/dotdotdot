"use client";

import ColorBar from "./ColorBar";
import Gradation from "./Gradation";
import OpacityBar from "./OpacityBar";

function Pallet() {
  return (
    <section className="p-2">
      <div className="flex h-40 gap-1">
        <Gradation />
        <OpacityBar />
        <ColorBar />
      </div>
    </section>
  );
}

export default Pallet;
