import type { Question } from "@/data/questions";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function shuffleChoices(question: Question): Question {
  // Pair each choice with its original index, shuffle the pairs, then rebuild.
  // This way `correctIndex` follows the correct answer to its new slot, even if
  // two choices happened to share text.
  const indexed = question.choices.map((choice, originalIndex) => ({
    choice,
    originalIndex,
  }));
  const shuffled = shuffle(indexed);
  return {
    ...question,
    choices: shuffled.map((x) => x.choice),
    correctIndex: shuffled.findIndex(
      (x) => x.originalIndex === question.correctIndex,
    ),
  };
}

export function pickRound(pool: Question[], n: number): Question[] {
  return shuffle(pool)
    .slice(0, Math.min(n, pool.length))
    .map(shuffleChoices);
}

export type RoundResult = {
  correct: number;
  total: number;
  missed: { question: Question; pickedIndex: number | null }[];
};

export function scoreRound(
  questions: Question[],
  answers: (number | null)[],
): RoundResult {
  let correct = 0;
  const missed: RoundResult["missed"] = [];
  questions.forEach((q, i) => {
    const picked = answers[i];
    if (picked === q.correctIndex) {
      correct++;
    } else {
      missed.push({ question: q, pickedIndex: picked });
    }
  });
  return { correct, total: questions.length, missed };
}
