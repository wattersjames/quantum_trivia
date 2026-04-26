import Link from "next/link";
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
      <Link
        href="/play"
        className="group absolute bottom-10 text-xs uppercase tracking-[0.4em] text-white/50 transition-colors hover:text-white sm:text-sm"
      >
        Enter the quantum
        <span className="mx-3 text-white/30">·</span>
        <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-white">
          click here
        </span>
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
      <Chat />
    </div>
  );
}
