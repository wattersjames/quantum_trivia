"use client";

import { useState } from "react";
import type { Question } from "@/data/questions";

type Props = { question: Question };

export default function QuestionCard({ question }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const isAnswered = selected !== null;
  const isCorrect = selected === question.correctIndex;

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
      <p className="mb-6 font-serif text-2xl italic leading-snug text-white sm:text-3xl">
        {question.prompt}
      </p>

      <ul className="space-y-3">
        {question.choices.map((choice, i) => {
          const isThisSelected = selected === i;
          const isThisCorrect = i === question.correctIndex;

          let cls =
            "w-full rounded-xl border px-5 py-3 text-left text-base transition-all";

          if (!isAnswered) {
            cls +=
              " border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10 cursor-pointer";
          } else if (isThisCorrect) {
            cls += " border-emerald-400 bg-emerald-500/30 text-white";
          } else if (isThisSelected) {
            cls += " border-rose-400 bg-rose-500/30 text-white";
          } else {
            cls += " border-white/10 bg-white/5 text-white/40";
          }

          return (
            <li key={i}>
              <button
                type="button"
                disabled={isAnswered}
                onClick={() => setSelected(i)}
                className={cls}
              >
                <span className="mr-3 font-mono text-sm text-white/60">
                  {String.fromCharCode(65 + i)}
                </span>
                {choice}
              </button>
            </li>
          );
        })}
      </ul>

      {isAnswered && (
        <div className="mt-6 space-y-4">
          <div
            className={
              isCorrect
                ? "rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-emerald-100"
                : "rounded-xl border border-rose-400/40 bg-rose-500/10 p-4 text-rose-100"
            }
          >
            <div className="mb-1 text-sm font-semibold uppercase tracking-wider">
              {isCorrect ? "Correct" : "Not quite"}
            </div>
            <p className="text-sm leading-relaxed text-white/90">
              {question.explanation}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSelected(null)}
            className="text-xs uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white"
          >
            Try again →
          </button>
        </div>
      )}
    </div>
  );
}
