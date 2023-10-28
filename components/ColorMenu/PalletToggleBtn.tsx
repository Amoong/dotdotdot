import { useRgba } from "@/hooks/useRgba";
import { useEffect, useRef } from "react";
import BackgroundCanvas from "../BackgroundCanvas";

interface Props {
  onClick: () => void;
}

export default function PalletToggleBtn(props: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const rgba = useRgba();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.style.backgroundColor = rgba;
  }, [rgba]);

  return (
    <button
      ref={ref}
      onClick={props.onClick}
      className="relative h-full w-full rounded-sm border-2 border-solid border-gray-400 bg-teal-400"
    >
      <BackgroundCanvas squreWidth={4} />
    </button>
  );
}
