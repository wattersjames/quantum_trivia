import { convertToModelMessages, streamText, type UIMessage } from "ai";
import type { Question } from "@/data/questions";

export const maxDuration = 30;

const BASE_SYSTEM_PROMPT = `You are Dr. Q, the quirky host of "Quantum Trivia" — a game show where every question is rooted in real quantum physics.

Personality:
- Witty, warm, and a little theatrical, like a physicist who moonlights as a stand-up comic.
- Lean into quantum metaphors playfully ("let's collapse this superposition of answer choices...").
- Concise — 1 to 3 sentences per reply unless the player asks for depth.

Behavior:
- If the player asks for a question (and you have no game context), give one multiple-choice quantum physics question (A/B/C/D) and wait for their answer before revealing.
- If they answer, score it and explain the real physics in plain language.
- If they ask for a hint, give a nudge without spoiling the answer.
- Stay accurate — never make up physics. If unsure, say so.
- Keep it fun, not pedantic.`;

type QuestionContext = {
  question: Pick<Question, "prompt" | "choices" | "correctIndex" | "explanation">;
  selectedIndex: number | null;
};

function buildSystemPrompt(context: QuestionContext | null | undefined): string {
  if (!context) return BASE_SYSTEM_PROMPT;

  const { question, selectedIndex } = context;
  const correctLetter = String.fromCharCode(65 + question.correctIndex);
  const correctText = question.choices[question.correctIndex];
  const choiceLines = question.choices
    .map((c, i) => `${String.fromCharCode(65 + i)}. ${c}`)
    .join("\n");

  let answerStatus: string;
  if (selectedIndex === null) {
    answerStatus = `The player has NOT YET answered. Do NOT reveal the correct letter or the answer text. If they ask for the answer outright, decline playfully and offer a hint instead. Hints should nudge their thinking — point at the relevant concept or eliminate one obviously wrong choice — without naming the correct answer.`;
  } else {
    const pickedLetter = String.fromCharCode(65 + selectedIndex);
    const pickedText = question.choices[selectedIndex];
    const isCorrect = selectedIndex === question.correctIndex;
    answerStatus = isCorrect
      ? `The player answered ${pickedLetter} ("${pickedText}") — CORRECT. They've already seen the official explanation; you can elaborate on the physics, give related fun facts, or answer follow-up questions.`
      : `The player answered ${pickedLetter} ("${pickedText}") — INCORRECT. The correct answer was ${correctLetter} ("${correctText}"). They've seen the official explanation; help them understand WHY their pick was wrong and why the correct one is right, without being condescending.`;
  }

  return `${BASE_SYSTEM_PROMPT}

---
GAME CONTEXT — the CURRENT question the player is looking at right now:

"${question.prompt}"

${choiceLines}

Correct: ${correctLetter}. ${correctText}
Official explanation: ${question.explanation}

${answerStatus}

IMPORTANT — this is the only question that matters right now. If a player just says "hint" or "help" or "explain" without naming a question, ALWAYS assume they mean THIS question. Never ask "which question?" — the question is the one shown above. If past chat messages reference a different question, those are stale; focus on the current GAME CONTEXT.

When discussing this question, draw on the official explanation but add depth, analogies, or related context. Don't repeat the explanation verbatim — riff on it.`;
}

export async function POST(req: Request) {
  const {
    messages,
    questionContext,
  }: { messages: UIMessage[]; questionContext?: QuestionContext | null } =
    await req.json();

  const result = streamText({
    model: "anthropic/claude-haiku-4.5",
    system: buildSystemPrompt(questionContext),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
