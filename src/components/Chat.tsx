"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { useQuizContext } from "@/lib/quiz-context";

const MIN_WIDTH = 280;
const MIN_HEIGHT = 320;
const DEFAULT_WIDTH = 352; // 22rem
const DEFAULT_HEIGHT = 512; // 32rem

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [size, setSize] = useState({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });
  const { messages, status, sendMessage, setMessages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const quizContext = useQuizContext();

  // Resize: chat is anchored to the bottom-right of the viewport, so the
  // top-left corner is the natural drag target. We capture a starting frame
  // (mouse + size) on pointer-down and update size as the pointer moves.
  // setPointerCapture keeps the drag working even if the cursor leaves the
  // tiny handle div mid-drag.
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startW: number;
    startH: number;
  } | null>(null);

  const onResizeStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onResizeMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    // Moving up-left grows the chat; subtract current pos from start pos.
    const dx = dragRef.current.startX - e.clientX;
    const dy = dragRef.current.startY - e.clientY;
    const maxW = window.innerWidth - 48;
    const maxH = window.innerHeight - 48;
    setSize({
      width: Math.max(MIN_WIDTH, Math.min(maxW, dragRef.current.startW + dx)),
      height: Math.max(MIN_HEIGHT, Math.min(maxH, dragRef.current.startH + dy)),
    });
  };

  const onResizeEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  // Reset the conversation whenever the player advances to a different question.
  // Without this, prior question's exchanges bleed into the next, and Dr. Q
  // gets confused about which question is being discussed.
  const currentQuestionId = quizContext?.question.id;
  useEffect(() => {
    if (currentQuestionId) setMessages([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionId]);

  const buildBody = () => ({
    questionContext: quizContext
      ? {
          question: quizContext.question,
          selectedIndex: quizContext.selectedIndex,
        }
      : null,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status !== "ready") return;
    sendMessage({ text: input }, { body: buildBody() });
    setInput("");
  };

  const pendingRequest = quizContext?.pendingChatRequest ?? null;
  useEffect(() => {
    if (!pendingRequest || status !== "ready" || !quizContext) return;
    setOpen(true);
    quizContext.clearChatRequest();
    sendMessage({ text: pendingRequest }, { body: buildBody() });
    // We intentionally don't include quizContext / sendMessage / buildBody in
    // deps — we only want to fire when the trigger or readiness changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingRequest, status]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Open chat with Dr. Q"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path d="M12 3a9 9 0 0 0-9 9c0 1.6.42 3.1 1.16 4.4L3 21l4.7-1.13A9 9 0 1 0 12 3Z" />
        </svg>
      </button>
    );
  }

  return (
    <div
      style={{ width: size.width, height: size.height }}
      className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
    >
      {/* Resize handle: top-left corner. Drag to grow the chat up-and-left. */}
      <div
        onPointerDown={onResizeStart}
        onPointerMove={onResizeMove}
        onPointerUp={onResizeEnd}
        onPointerCancel={onResizeEnd}
        role="separator"
        aria-label="Resize chat"
        className="absolute top-0 left-0 z-20 h-5 w-5 cursor-nwse-resize touch-none"
      >
        <svg
          viewBox="0 0 16 16"
          className="h-full w-full text-white/60 hover:text-white"
        >
          <path
            d="M 3 8 L 8 3 M 3 12 L 12 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <header className="flex items-center justify-between bg-gradient-to-br from-indigo-500 to-purple-600 px-4 py-3 pl-7 text-white">
        <div>
          <div className="text-sm font-semibold">Dr. Q</div>
          <div className="text-xs opacity-80">Quantum trivia host</div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="rounded-full p-1 hover:bg-white/20"
          aria-label="Close chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12 4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586 6.225 4.811Z" />
          </svg>
        </button>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm"
      >
        {messages.length === 0 && (
          <div className="text-zinc-500 dark:text-zinc-400">
            {quizContext
              ? "Stuck on this one? Ask Dr. Q for a hint — or have him explain the physics after you've answered."
              : "Ask Dr. Q for a quantum trivia question, a hint, or to explain something weird about the quantum world."}
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-indigo-500 px-3 py-2 text-white"
                : "mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-zinc-100 px-3 py-2 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
            }
          >
            {m.parts
              .filter((p) => p.type === "text")
              .map((p, i) => (
                <span key={i} className="whitespace-pre-wrap">
                  {p.text}
                </span>
              ))}
          </div>
        ))}
        {(status === "submitted" || status === "streaming") && (
          <div className="mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-zinc-100 px-3 py-2 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
            </span>
          </div>
        )}
        {status === "error" && (
          <div className="text-xs text-red-500">
            Something went wrong. Try again in a moment.
          </div>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="border-t border-zinc-200 p-3 dark:border-zinc-800"
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Dr. Q..."
            disabled={status !== "ready"}
            className="flex-1 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <button
            type="submit"
            disabled={status !== "ready" || !input.trim()}
            className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
