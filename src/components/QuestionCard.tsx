"use client";

import type { Question } from "@/data/questions";
import { useQuizContext } from "@/lib/quiz-context";

type Props = {
  question: Question;
  selected: number | null;
  onSelect: (i: number) => void;
  onNext: () => void;
  isLast?: boolean;
};

export default function QuestionCard({
  question,
  selected,
  onSelect,
  onNext,
  isLast = false,
}: Props) {
  const isAnswered = selected !== null;
  const isCorrect = selected === question.correctIndex;
  const ctx = useQuizContext();

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
                onClick={() => onSelect(i)}
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

      {!isAnswered && ctx && (
        <button
          type="button"
          onClick={() => ctx.requestHint()}
          className="mt-5 text-xs uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-white"
        >
          Get a hint from Dr. Q →
        </button>
      )}

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
            onClick={onNext}
            className="rounded-full bg-indigo-500 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-indigo-600"
          >
            {isLast ? "Finish" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}
