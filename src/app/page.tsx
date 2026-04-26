import Chat from "@/components/Chat";

export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-950 px-6 text-white">
      <div
        aria-label="The de Broglie equation: lambda equals h over p"
        className="flex items-center gap-6 font-serif italic leading-none tracking-tight sm:gap-10"
        style={{ fontSize: "clamp(5rem, 22vw, 18rem)" }}
      >
        <span>λ</span>
        <span className="not-italic font-light text-white/80">=</span>
        <span className="flex flex-col items-stretch text-center">
          <span className="px-[0.25em]">h</span>
          <span className="my-[0.08em] h-[0.06em] bg-current" />
          <span className="px-[0.25em]">p</span>
        </span>
      </div>
      <p className="absolute bottom-10 text-xs uppercase tracking-[0.4em] text-white/40 sm:text-sm">
        Louis de Broglie · 1924
      </p>
      <Chat />
    </div>
  );
}
