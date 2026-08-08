import { useEffect, useRef, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { askLyx } from "@/lib/lyx";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function LyxChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async (value: string) => {
    const text = value.trim();

    if (!text || loading) {
      return;
    }

    setInput("");
    setLoading(true);

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: text,
      },
      {
        role: "assistant",
        content: "",
      },
    ]);

    let fullResponse = "";

    try {
      await askLyx(text, (chunk) => {
        fullResponse += chunk;

        setMessages((current) => {
          const updated = [...current];

          const lastIndex = updated.length - 1;

          if (lastIndex >= 0) {
            updated[lastIndex] = {
              role: "assistant",
              content: fullResponse,
            };
          }

          return updated;
        });
      });
    } catch (error) {
      console.error("Lyx error:", error);

      setMessages((current) => {
        const updated = [...current];

        const lastIndex = updated.length - 1;

        if (lastIndex >= 0) {
          updated[lastIndex] = {
            role: "assistant",
            content:
              "I couldn't reach the Lyx service right now. Please try again.",
          };
        }

        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-hairline bg-background">
      <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </div>

        <div>
          <h3 className="font-medium">Lyx</h3>
          <p className="text-xs text-muted-foreground">
            Portfolio assistant
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="h-[420px] overflow-y-auto px-5 py-6"
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <p className="max-w-sm text-[17px] leading-relaxed text-muted-foreground">
              Ask anything about Nandith&apos;s work, skills or experience.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              const isLast = index === messages.length - 1;

              return (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    isUser ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-[15px] leading-relaxed",
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface text-surface-foreground",
                    )}
                  >
                    {message.content}

                    {loading && !isUser && isLast ? (
                      <span className="ml-1 inline-block h-4 w-1 animate-pulse rounded-full bg-current align-middle" />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-hairline px-5 py-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void send(input);
          }}
          className="flex items-center gap-2 rounded-full border border-hairline bg-background px-4 py-2 focus-within:border-primary"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Lyx about Nandith…"
            aria-label="Ask Lyx a question"
            disabled={loading}
            className="flex-1 bg-transparent py-1.5 text-[15px] outline-none placeholder:text-muted-foreground"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-30"
          >
            <ArrowUp className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}