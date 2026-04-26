"use client";

import { createContext, useContext } from "react";
import type { Question } from "@/data/questions";

export type QuizContextValue = {
  question: Question;
  selectedIndex: number | null;
  pendingChatRequest: string | null;
  requestHint: () => void;
  clearChatRequest: () => void;
};

const QuizContext = createContext<QuizContextValue | null>(null);

export const QuizProvider = QuizContext.Provider;

export function useQuizContext(): QuizContextValue | null {
  return useContext(QuizContext);
}
