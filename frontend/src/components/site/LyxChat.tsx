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

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const reply = await askLyx(text);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
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
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] gradient-lyx blur-2xl"
        style={{ animation: "lyx-halo 6s ease-in-out infinite" }}
      />
      <div className="overflow-hidden rounded-[1.75rem] border border-hairline bg-card shadow-glow sm:rounded-4xl">
        <div className="flex items-center gap-2.5 border-b border-hairline px-4 py-3.5 sm:px-6 sm:py-4">
          <span className="relative flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">Lyx</p>
            <p className="text-xs text-muted-foreground">Nandith&apos;s AI assistant</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Online
          </span>
        </div>

        <div
          ref={scrollRef}
          className="h-[46vh] min-h-[300px] overflow-y-auto px-4 py-5 sm:h-[420px] sm:px-6 sm:py-6"
        >
          {messages.length === 0 && !loading ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="max-w-sm text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
                Ask anything about Nandith&apos;s work, skills or experience. Every answer comes
                from his verified portfolio.
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {messages.map((m, i) => (
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
                      <div className="space-y-3 [&_a]:text-primary [&_a]:underline [&_li]:ml-4 [&_li]:list-disc [&_strong]:font-semibold [&_ul]:space-y-1.5">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-3xl bg-surface px-4 py-4">
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
                </div>
              )}
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
