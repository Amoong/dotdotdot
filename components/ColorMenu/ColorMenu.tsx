"use client";

import { useEffect, useState } from "react";
import Pallet from "./Pallet";
import PalletToggleBtn from "./PalletToggleBtn";
import BackgroundCanvas from "@/components/BackgroundCanvas";

interface Props {
  className?: string;
}

function ColorMenu(props: Props) {
  const [palletVisible, setPalletVisible] = useState(true);

  useEffect(() => {}, []);

  const onClickToggleBtn = () => {
    setPalletVisible((prev) => !prev);
  };

  return (
    <div className={`relative h-8 w-8 ${props.className}`}>
      <BackgroundCanvas squreWidth={6} />
      <PalletToggleBtn onClick={onClickToggleBtn} />
      {palletVisible && <Pallet />}
    </div>
  );
}

export default ColorMenu;
