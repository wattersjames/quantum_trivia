import Link from "next/link";
import Chat from "@/components/Chat";
import Quiz from "@/components/Quiz";

export default function Play() {
  return (
    <div className="relative flex flex-1 flex-col items-center overflow-hidden bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-950 px-6 py-24 text-white">
      <Link
        href="/"
        className="group absolute top-10 left-10 text-xs uppercase tracking-[0.4em] text-white/40 transition-colors hover:text-white"
      >
        <span className="mr-2 inline-block transition-transform group-hover:-translate-x-1">
          ←
        </span>
        Back
      </Link>

      <div className="my-auto flex w-full flex-col items-center">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            Quantum Trivia
          </p>
        </div>

        <Quiz roundSize={100} />
      </div>

      <Chat />
    </div>
  );
}
