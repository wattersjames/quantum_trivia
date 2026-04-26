"use client";

import { useCallback, useState } from "react";
import { questions as pool } from "@/data/questions";
import type { Question } from "@/data/questions";
import { pickRound } from "@/lib/quiz";
import { QuizProvider, type QuizContextValue } from "@/lib/quiz-context";
import Chat from "./Chat";
import QuestionCard from "./QuestionCard";
import ScoreScreen from "./ScoreScreen";

type Phase = "idle" | "playing" | "finished";
type Props = { roundSize?: number };

export default function Quiz({ roundSize = 100 }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingChatRequest, setPendingChatRequest] = useState<string | null>(
    null,
  );

  const requestHint = useCallback(() => {
    setPendingChatRequest("Can I get a hint?");
  }, []);
  const clearChatRequest = useCallback(() => {
    setPendingChatRequest(null);
  }, []);

  const start = () => {
    const round = pickRound(pool, roundSize);
    setQuestions(round);
    setAnswers(new Array(round.length).fill(null));
    setCurrentIndex(0);
    setPhase("playing");
  };

  const handleSelect = (choice: number) => {
    if (answers[currentIndex] !== null) return;
    const next = [...answers];
    next[currentIndex] = choice;
    setAnswers(next);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setPhase("finished");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentQuestion: Question | undefined =
    phase === "playing" ? questions[currentIndex] : undefined;
  const currentAnswer =
    phase === "playing" ? answers[currentIndex] : null;

  const contextValue: QuizContextValue | null = currentQuestion
    ? {
        question: currentQuestion,
        selectedIndex: currentAnswer,
        pendingChatRequest,
        requestHint,
        clearChatRequest,
      }
    : null;

  let body: React.ReactNode;
  if (phase === "idle") {
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
    body = (
      <ScoreScreen
        questions={questions}
        answers={answers}
        onRestart={() => setPhase("idle")}
      />
    );
  } else {
    body = (
      <div className="flex w-full flex-col items-center">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/40">
          Question {currentIndex + 1} / {questions.length}
        </p>
        <QuestionCard
          question={currentQuestion!}
          selected={currentAnswer}
          onSelect={handleSelect}
          onNext={handleNext}
          isLast={currentIndex === questions.length - 1}
        />
      </div>
    );
  }

  return (
    <QuizProvider value={contextValue}>
      {body}
      <Chat />
    </QuizProvider>
  );
}
