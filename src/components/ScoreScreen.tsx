import type { Question } from "@/data/questions";
import { scoreRound } from "@/lib/quiz";

type Props = {
  questions: Question[];
  answers: (number | null)[];
  onRestart: () => void;
};

export default function ScoreScreen({ questions, answers, onRestart }: Props) {
  const { correct, total, missed } = scoreRound(questions, answers);
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-sm">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-white/40">
          Final score
        </p>
        <div className="font-serif text-7xl italic leading-none text-white">
          {correct}
          <span className="text-white/30"> / {total}</span>
        </div>
        <p className="mt-3 text-xl text-white/70">{pct}%</p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-8 rounded-full bg-indigo-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-indigo-600"
        >
          Play again
        </button>
      </div>

      {missed.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-[0.3em] text-white/50">
            Questions you missed ({missed.length})
          </h2>
          {missed.map(({ question, pickedIndex }) => (
            <div
              key={question.id}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <p className="font-serif text-lg italic text-white">
                {question.prompt}
              </p>
              <p className="mt-3 text-sm text-rose-300">
                You picked:{" "}
                <span className="text-white">
                  {pickedIndex === null
                    ? "—"
                    : question.choices[pickedIndex]}
                </span>
              </p>
              <p className="mt-1 text-sm text-emerald-300">
                Correct:{" "}
                <span className="text-white">
                  {question.choices[question.correctIndex]}
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {question.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
