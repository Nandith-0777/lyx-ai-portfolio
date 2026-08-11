import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Sparkles } from "lucide-react";
import { askLyx } from "@/lib/lyx";
import { suggestedQuestions } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

export function LyxChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const onFocus = () => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 500);
    };
    window.addEventListener("lyx:focus", onFocus);
    return () => window.removeEventListener("lyx:focus", onFocus);
  }, []);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;
    setInput("");

    // Add the user message and an empty assistant message we'll fill in as chunks arrive
    setMessages((m) => [...m, { role: "user", content: text }, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      await askLyx(text, (chunk) => {
        setMessages((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          next[next.length - 1] = { role: "assistant", content: last.content + chunk };
          return next;
        });
      });
    } catch {
      setMessages((m) => [
        ...m.slice(0, -1),
        {
          role: "assistant",
          content:
            "I couldn't reach the Lyx service right now. Make sure the backend is running and reachable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative" ref={cardRef}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] gradient-lyx blur-2xl"
        style={{ animation: "lyx-halo 6s ease-in-out infinite" }}
      />
      <div className="overflow-hidden rounded-[1.75rem] border border-hairline bg-card shadow-glow sm:rounded-4xl">
        <div className="flex items-center gap-3 border-b border-hairline bg-surface/40 px-4 py-3.5 sm:px-6 sm:py-4">
          <span className="relative flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
            <span
              aria-hidden
              className="absolute -inset-1 rounded-full bg-primary/25"
              style={{ animation: "lyx-halo 6s ease-in-out infinite" }}
            />
            <Sparkles className="relative size-4" />
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-semibold tracking-tight">Lyx</p>
            <p className="text-[12.5px] text-muted-foreground">Nandith&apos;s AI assistant</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-hairline bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Online
          </span>
        </div>

        <div
          ref={scrollRef}
          className="h-[38vh] min-h-[260px] overflow-y-auto px-4 py-6 sm:h-[360px] sm:px-6"
        >
          {messages.length === 0 && !loading ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="gradient-lyx flex size-12 items-center justify-center rounded-2xl border border-hairline">
                <Sparkles className="size-5 text-primary" />
              </span>
              <p className="headline mt-4 text-[19px] sm:text-[21px]">Ask me anything.</p>
              <p className="mt-2 max-w-[34ch] text-[14.5px] leading-relaxed text-muted-foreground sm:text-[15px]">
                Work, skills, projects or experience — every answer comes straight from Nandith&apos;s
                verified portfolio.
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {messages.map((m, i) => {
                const isLastAssistant =
                  m.role === "assistant" && i === messages.length - 1;
                const showTyping = isLastAssistant && loading && m.content.length === 0;

                return (
                  <div
                    key={i}
                    className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[88%] rounded-3xl px-4 py-3 text-[15px] leading-relaxed sm:max-w-[85%]",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface text-surface-foreground",
                      )}
                    >
                      {m.role === "assistant" ? (
                        showTyping ? (
                          <div className="flex items-center gap-1.5 py-1">
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                className="size-1.5 rounded-full bg-muted-foreground"
                                style={{
                                  animation: "lyx-pulse 1.2s ease-in-out infinite",
                                  animationDelay: `${i * 0.15}s`,
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3 [&_a]:text-primary [&_a]:underline [&_li]:ml-4 [&_li]:list-disc [&_strong]:font-semibold [&_ul]:space-y-1.5">
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                          </div>
                        )
                      ) : (
                        m.content
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t border-hairline px-4 py-3.5 sm:px-6 sm:py-4">
          {messages.length === 0 && (
            <div className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => void send(q)}
                  className="shrink-0 rounded-full border border-hairline px-3.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 rounded-full border border-hairline bg-background px-4 py-2 focus-within:border-primary"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Lyx about Nandith…"
              aria-label="Ask Lyx a question"
              className="min-w-0 flex-1 bg-transparent py-1.5 text-[16px] outline-none placeholder:text-muted-foreground sm:text-[15px]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-30 sm:size-8"
            >
              <ArrowUp className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}