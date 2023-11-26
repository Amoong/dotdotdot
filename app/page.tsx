import ColorMenu from "@/components/ColorMenu";
import DrawingBoard from "@/components/DrawingBoard";
import { Metadata } from "next";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex w-screen max-w-xl flex-col items-center bg-transparent px-3">
        <h1 className="mb-5 text-2xl">DotDotDot</h1>
        <DrawingBoard pixelWidth={20} pixelHeight={20} />
        <ColorMenu className="mt-3 self-start" />
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "DotDotDot",
};
