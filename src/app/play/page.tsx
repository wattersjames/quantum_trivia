import Link from "next/link";
import Chat from "@/components/Chat";

export default function Play() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-950 px-6 text-white">
      <h1 className="text-center font-serif text-5xl italic leading-tight tracking-tight sm:text-7xl">
        You&apos;ve entered
        <br />
        the quantum.
      </h1>
      <p className="mt-8 max-w-md text-center text-sm text-white/60 sm:text-base">
        The trivia game lives here. Coming soon — for now, ask Dr. Q for a
        question.
      </p>
      <Link
        href="/"
        className="group absolute top-10 left-10 text-xs uppercase tracking-[0.4em] text-white/40 transition-colors hover:text-white"
      >
        <span className="mr-2 inline-block transition-transform group-hover:-translate-x-1">
          ←
        </span>
        Back
      </Link>
      <Chat />
    </div>
  );
}
