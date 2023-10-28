"use client";

import { useEffect, useState } from "react";
import Pallet from "./Pallet";
import PalletToggleBtn from "./PalletToggleBtn";

interface Props {
  className?: string;
}

function ColorMenu(props: Props) {
  const [palletVisible, setPalletVisible] = useState(false);

  useEffect(() => {}, []);

  const onClickToggleBtn = () => {
    setPalletVisible((prev) => !prev);
  };

  return (
    <div className={`relative h-8 w-8 ${props.className}`}>
      <PalletToggleBtn onClick={onClickToggleBtn} />
      {palletVisible && <Pallet />}
    </div>
  );
}

export default ColorMenu;
