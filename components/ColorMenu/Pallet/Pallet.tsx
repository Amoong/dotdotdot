"use client";

import ColorBar from "./ColorBar";
import ColorInfo from "./ColorInfo";
import Gradation from "./Gradation";
import OpacityBar from "./OpacityBar";

function Pallet() {
  return (
    <section className="mt-1 w-80 overflow-hidden rounded-lg  border-gray-200 shadow-lg shadow-black">
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
