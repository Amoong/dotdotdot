import MainCanvas from "./components/MainCanvas";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-screen max-w-xl flex-col items-center bg-slate-100">
        <h1 className="mb-1 text-2xl">DotDotDot</h1>
        <MainCanvas />
      </div>
    </main>
  );
}
