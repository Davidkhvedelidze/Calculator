"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const initialAssistantMessage = {
  role: "assistant",
  content:
    "Hi! I'm your Must See Georgia travel planner. Tell me about the experience you want and I'll craft a bespoke itinerary for you.",
};

const bubbleClasses = {
  user: "self-end bg-brand text-white",
  assistant:
    "self-start bg-white   border border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialAssistantMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  const canSubmit = input.trim().length > 0 && !isLoading;

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages, isOpen]);

  const placeholder = useMemo(
    () =>
      isLoading
        ? "Designing your next Georgian adventure..."
        : "Share where, when, and what vibe you're after",
    [isLoading]
  );

  const handleToggle = () => {
    setIsOpen((value) => !value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    const userMessage = { role: "user", content: input.trim() };
    const optimisticMessages = [...messages, userMessage];
    setMessages(optimisticMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: optimisticMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact the travel assistant.");
      }

      const { message } = await response.json();
      if (message?.content) {
        setMessages((previous) => [...previous, message]);
      }
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "I'm sorry — I couldn't reach our planning service right now. Please check your connection or try again soon.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-10 sm:right-10">
      <button
        type="button"
        onClick={handleToggle}
        className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        aria-label={
          isOpen ? "Close travel planning chat" : "Open travel planning chat"
        }
      >
        {isOpen ? (
          <span className="text-lg font-semibold">×</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3h5.25m3.75 7.5 3-3V5.25A2.25 2.25 0 0 0 19.5 3h-15A2.25 2.25 0 0 0 2.25 5.25v9A2.25 2.25 0 0 0 4.5 16.5H9l4.5 4.5 3-3Z"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="pointer-events-auto flex w-full max-w-xs flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-xl dark:border-slate-700 dark:bg-slate-800 sm:max-w-sm">
          <div className="bg-brand px-4 py-3 text-white">
            <p className="text-sm uppercase tracking-wide text-brand-light">
              Chat with us
            </p>
            <p className="text-base font-semibold">
              Must See Georgia concierge
            </p>
          </div>

          <div
            ref={containerRef}
            className="flex max-h-80 flex-col gap-2 overflow-y-auto bg-slate-100 px-4 py-4 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-200"
          >
            {messages.map((message, index) => (
              <p
                key={`${message.role}-${index}`}
                className={`max-w-[85%] rounded-2xl px-4 py-2 leading-relaxed shadow-sm ${
                  bubbleClasses[message.role] ?? bubbleClasses.assistant
                }`}
              >
                {message.content}
              </p>
            ))}
            {isLoading && (
              <p className="self-start rounded-2xl bg-white px-4 py-2 text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-400">
                Mapping out an unforgettable route...
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200 bg-white p-3 dark:border-slate-600 dark:bg-slate-800"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Describe your travel plans
            </label>
            <textarea
              id="chat-input"
              name="message"
              rows={2}
              value={input}
              placeholder={placeholder}
              onChange={(event) => setInput(event.target.value)}
              className="mb-2 w-full resize-none rounded-2xl border border-slate-200 px-3 py-2 text-sm shadow-inner focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:border-brand-light dark:focus:ring-brand/30"
              disabled={isLoading}
            />
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Powered by AI · Must See Georgia</span>
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-600"
              >
                {isLoading ? "Planning..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
