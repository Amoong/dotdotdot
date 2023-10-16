import DrawingBoard from "./components/DrawingBoard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex w-screen max-w-xl flex-col items-center bg-transparent">
        <h1 className="mb-5 text-2xl">DotDotDot</h1>
        <DrawingBoard width={20} height={20} />
      </div>
    </main>
  );
}
