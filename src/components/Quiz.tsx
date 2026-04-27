// The Quiz component is the heart of the trivia game on /play.
// It owns the round state (which questions, what's been answered, where we are)
// and switches between three phases: idle → playing → finished.
// It also publishes the current question to the chat widget via React Context,
// so Dr. Q can give context-aware hints and explanations.

// "use client" tells Next.js this is a Client Component (runs in the browser).
// Without it, Next.js tries to render on the server, where browser-only APIs
// like useState don't exist. Any file that uses React hooks needs this.
"use client";

import { useCallback, useState } from "react";
import { questions as pool } from "@/data/questions";
import type { Question } from "@/data/questions";
import { pickRound } from "@/lib/quiz";
import { QuizProvider, type QuizContextValue } from "@/lib/quiz-context";
import Chat from "./Chat";
import QuestionCard from "./QuestionCard";
import ScoreScreen from "./ScoreScreen";

// A "discriminated union" — Phase can only be one of these three strings.
// TypeScript will narrow the type as we check it, e.g. inside `if (phase === "playing")`.
type Phase = "idle" | "playing" | "finished";

// Props for the Quiz component. `?` marks roundSize as optional.
type Props = { roundSize?: number };

export default function Quiz({ roundSize = 100 }: Props) {
  // ─── State ────────────────────────────────────────────────────────────
  // useState returns a [currentValue, setterFunction] pair. Calling the setter
  // schedules a re-render with the new value. State is preserved between renders;
  // local variables would reset every time the component re-runs.

  const [phase, setPhase] = useState<Phase>("idle");

  // The questions chosen for THIS round (a random subset of the pool).
  const [questions, setQuestions] = useState<Question[]>([]);

  // Parallel array to `questions`. answers[i] is the index the player picked
  // for questions[i], or null if they haven't answered it yet.
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // When set to a string, the Chat widget will auto-open and send that text
  // as a message. Used by the "Get a hint" button in QuestionCard.
  const [pendingChatRequest, setPendingChatRequest] = useState<string | null>(
    null,
  );

  // ─── Callbacks shared with the chat widget ────────────────────────────
  // useCallback returns the same function reference between renders (as long
  // as its dependencies — the empty array — don't change). This matters because
  // we put these functions into the context value; without useCallback, every
  // render would create new functions, and consumers would think "state changed!"
  // and re-render unnecessarily.

  const requestHint = useCallback(() => {
    setPendingChatRequest("Can I get a hint?");
  }, []);
  const clearChatRequest = useCallback(() => {
    setPendingChatRequest(null);
  }, []);

  // ─── Round lifecycle handlers ─────────────────────────────────────────

  // Start a fresh round: pick random questions, reset answers, jump to question 0.
  const start = () => {
    const round = pickRound(pool, roundSize);
    setQuestions(round);
    setAnswers(new Array(round.length).fill(null));
    setCurrentIndex(0);
    setPhase("playing");
  };

  // Record the player's pick for the current question (only if not already answered).
  const handleSelect = (choice: number) => {
    if (answers[currentIndex] !== null) return;
    // Important: never mutate state directly. We build a NEW array with the change.
    // React compares old vs new by reference — mutating in place wouldn't trigger
    // a re-render.
    const next = [...answers];
    next[currentIndex] = choice;
    setAnswers(next);
  };

  // Advance to the next question, or finish the round if we're on the last.
  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setPhase("finished");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // ─── Derived values ───────────────────────────────────────────────────
  // These are computed from state on every render. They're not state themselves
  // — that would be redundant and a common bug source ("two sources of truth").

  const currentQuestion: Question | undefined =
    phase === "playing" ? questions[currentIndex] : undefined;
  const currentAnswer =
    phase === "playing" ? answers[currentIndex] : null;

  // Build the context value that the chat widget will read. When there's no
  // active question (idle / finished), we pass `null` so the chat behaves as
  // a general assistant rather than a game host.
  const contextValue: QuizContextValue | null = currentQuestion
    ? {
        question: currentQuestion,
        selectedIndex: currentAnswer,
        pendingChatRequest,
        requestHint,
        clearChatRequest,
      }
    : null;

  // ─── Render ───────────────────────────────────────────────────────────
  // We pick a `body` based on phase, then wrap everything in QuizProvider
  // so descendants (including the floating Chat) can read the context.

  let body: React.ReactNode;
  if (phase === "idle") {
    // The "Begin" screen. roundSize is the requested length, but if the pool
    // is smaller, we cap to whatever's available (so a 1-question pool gives
    // a 1-question round, not 100 copies of the same question).
    const size = Math.min(roundSize, pool.length);
    body = (
      <div className="text-center">
        <h1 className="mb-3 font-serif text-4xl italic text-white sm:text-5xl">
          Ready?
        </h1>
        <p className="mb-8 text-base text-white/70">
          {size} {size === 1 ? "question" : "questions"} on quantum physics.
          Score your way through.
        </p>
        <button
          type="button"
          onClick={start}
          className="rounded-full bg-indigo-500 px-10 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-indigo-600"
        >
          Begin
        </button>
      </div>
    );
  } else if (phase === "finished") {
    // End-of-round screen. ScoreScreen receives the round's questions and
    // answers, computes the score, and shows the "missed questions" review.
    body = (
      <ScoreScreen
        questions={questions}
        answers={answers}
        onRestart={() => setPhase("idle")}
      />
    );
  } else {
    // phase === "playing". Show the current question card with a small
    // progress label above it.
    body = (
      <div className="flex w-full flex-col items-center">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/40">
          Question {currentIndex + 1} / {questions.length}
        </p>
        <QuestionCard
          // The `!` is a non-null assertion. We know currentQuestion is defined
          // here because phase === "playing", but TypeScript can't follow that
          // through to this branch. The assertion silences the type error.
          question={currentQuestion!}
          selected={currentAnswer}
          onSelect={handleSelect}
          onNext={handleNext}
          isLast={currentIndex === questions.length - 1}
        />
      </div>
    );
  }

  // QuizProvider makes contextValue available to any descendant via
  // useQuizContext(). Both QuestionCard (for the hint button) and Chat
  // (to know which question is active) read from it.
  return (
    <QuizProvider value={contextValue}>
      {body}
      <Chat />
    </QuizProvider>
  );
}
