"use client";

import ColorBar from "./ColorBar";
import ColorInfo from "./ColorInfo";
import Gradation from "./Gradation";
import OpacityBar from "./OpacityBar";

function Pallet() {
  return (
    <section className="w-80">
      <ColorInfo />
      <div className="flex h-40 gap-2 p-2">
        <Gradation />
        <OpacityBar />
        <ColorBar />
      </div>
    </section>
  );
}

export default Pallet;
