"use client";

import { useState } from "react";
import Pallet from "./Pallet";

interface Props {
  className?: string;
}

function ColorMenu(props: Props) {
  const [palletVisible, setPalletVisible] = useState(true);

  return (
    <div className={`${props.className}`}>
      <button
        onClick={() => setPalletVisible(true)}
        className="h-8 w-8 rounded-sm border-2 border-solid border-gray-400 bg-teal-400"
      ></button>
      {palletVisible && <Pallet />}
    </div>
  );
}

export default ColorMenu;
