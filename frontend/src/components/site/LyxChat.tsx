import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp } from "lucide-react";

import { streamLyx } from "@/lib/lyx";
import { suggestedQuestions } from "@/data/portfolio";
import { cn } from "@/lib/utils";


type Message = {
  role: "user" | "assistant";
  content: string;
};


export function LyxChat() {

  // =========================================================
  // STATE
  // =========================================================

  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);


  // =========================================================
  // REFS
  // =========================================================

  const scrollRef = useRef<HTMLDivElement>(null);

  const abortControllerRef =
    useRef<AbortController | null>(null);


  // =========================================================
  // AUTO SCROLL
  // =========================================================

  useEffect(() => {

    const element = scrollRef.current;

    if (!element) {
      return;
    }

    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });

  }, [messages, loading]);


  // =========================================================
  // SEND MESSAGE
  // =========================================================

  const send = async (raw: string) => {

    const text = raw.trim();


    // Don't send empty messages

    if (!text || loading) {
      return;
    }


    // =======================================================
    // CLEAR INPUT
    // =======================================================

    setInput("");


    // =======================================================
    // ADD USER MESSAGE
    // =======================================================

    setMessages((current) => [

      ...current,

      {
        role: "user",
        content: text,
      },

    ]);


    // =======================================================
    // ADD EMPTY ASSISTANT MESSAGE
    //
    // The streamed response will be added to this message.
    // =======================================================

    setMessages((current) => [

      ...current,

      {
        role: "assistant",
        content: "",
      },

    ]);


    // =======================================================
    // START LOADING
    // =======================================================

    setLoading(true);


    // =======================================================
    // ABORT CONTROLLER
    // =======================================================

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;


    try {

      // =====================================================
      // STREAM RESPONSE FROM FASTAPI
      // =====================================================

      await streamLyx(

        text,

        (chunk: string) => {

          // =================================================
          // APPEND STREAMING CHUNK
          // =================================================

          setMessages((current) => {

            if (current.length === 0) {
              return current;
            }


            const updated = [...current];

            const lastIndex =
              updated.length - 1;


            const lastMessage =
              updated[lastIndex];


            // Safety check

            if (
              !lastMessage ||
              lastMessage.role !== "assistant"
            ) {
              return current;
            }


            updated[lastIndex] = {

              ...lastMessage,

              content:
                lastMessage.content + chunk,

            };


            return updated;

          });

        },

        controller.signal,

      );


    } catch (error) {

      // =====================================================
      // ERROR HANDLING
      // =====================================================

      console.error(
        "Lyx streaming error:",
        error,
      );


      // Don't show an error when the request
      // was intentionally cancelled.

      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {

        return;

      }


      // =====================================================
      // REPLACE ASSISTANT MESSAGE WITH ERROR
      // =====================================================

      setMessages((current) => {

        const updated = [...current];

        const lastIndex =
          updated.length - 1;


        const lastMessage =
          updated[lastIndex];


        if (
          lastMessage &&
          lastMessage.role === "assistant"
        ) {

          updated[lastIndex] = {

            ...lastMessage,

            content:
              "I couldn't reach the Lyx service right now. Make sure the backend is running and reachable.",

          };

        }


        return updated;

      });


    } finally {

      // =====================================================
      // CLEANUP
      // =====================================================

      setLoading(false);

      abortControllerRef.current = null;

    }

  };


  // =========================================================
  // STOP GENERATION
  // =========================================================

  const stopGeneration = () => {

    abortControllerRef.current?.abort();

    setLoading(false);

  };


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="overflow-hidden rounded-3xl border border-hairline bg-background">


      {/* =====================================================
          CHAT AREA
      ====================================================== */}

      <div
        ref={scrollRef}
        className="h-[420px] overflow-y-auto px-5 py-6 sm:px-6"
      >

        {messages.length === 0 && !loading ? (

          // ===================================================
          // EMPTY STATE
          // ===================================================

          <div className="flex h-full flex-col items-center justify-center text-center">

            <p className="max-w-sm text-[17px] leading-relaxed text-muted-foreground">

              Ask anything about Nandith's work, skills or
              experience. Answers come only from his verified
              portfolio.

            </p>

          </div>

        ) : (

          // ===================================================
          // MESSAGES
          // ===================================================

          <div className="space-y-5">

            {messages.map((message, index) => {

              const isLastMessage =
                index === messages.length - 1;

              const isStreaming =
                loading &&
                isLastMessage &&
                message.role === "assistant";


              return (

                <div
                  key={index}
                  className={cn(
                    "flex",

                    message.role === "user"
                      ? "justify-end"
                      : "justify-start",
                  )}
                >

                  <div
                    className={cn(
                      "max-w-[85%] rounded-3xl px-4 py-3 text-[15px] leading-relaxed",

                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface text-surface-foreground",
                    )}
                  >

                    {message.role === "assistant" ? (

                      <div
                        className="
                          space-y-3
                          [&_a]:text-primary
                          [&_a]:underline
                          [&_li]:ml-4
                          [&_li]:list-disc
                          [&_strong]:font-semibold
                          [&_ul]:space-y-1.5
                        "
                      >

                        {/* ===================================
                            STREAMING RESPONSE
                            
                            While streaming, display plain
                            text instead of Markdown.

                            This prevents incomplete Markdown
                            tables/lists from constantly being
                            re-parsed.
                        ==================================== */}

                        {isStreaming ? (

                          <span className="whitespace-pre-wrap">

                            {message.content}

                            {/* Blinking cursor */}

                            <span
                              className="
                                ml-1
                                inline-block
                                h-4
                                w-1
                                animate-pulse
                                bg-primary
                                align-middle
                              "
                            />

                          </span>

                        ) : (

                          /* =================================
                             FINAL RESPONSE

                             Once streaming finishes,
                             render Markdown normally.
                          ================================== */

                          <ReactMarkdown>

                            {message.content}

                          </ReactMarkdown>

                        )}

                      </div>

                    ) : (

                      // =======================================
                      // USER MESSAGE
                      // =======================================

                      message.content

                    )}

                  </div>

                </div>

              );

            })}


            {/* =================================================
                THINKING INDICATOR

                Only show it when the assistant has not received
                its first streaming chunk yet.
            ================================================== */}

            {loading &&
              messages.length > 0 &&
              messages[messages.length - 1]?.role === "assistant" &&
              messages[messages.length - 1]?.content === "" && (

                <div className="flex justify-start">

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-3xl
                      bg-surface
                      px-4
                      py-4
                    "
                  >

                    {[0, 1, 2].map((i) => (

                      <span
                        key={i}

                        className="
                          size-1.5
                          rounded-full
                          bg-muted-foreground
                        "

                        style={{
                          animation:
                            "lyx-pulse 1.2s ease-in-out infinite",

                          animationDelay:
                            `${i * 0.15}s`,
                        }}

                      />

                    ))}

                  </div>

                </div>

              )}

          </div>

        )}

      </div>


      {/* =====================================================
          INPUT AREA
      ====================================================== */}

      <div
        className="
          border-t
          border-hairline
          px-5
          py-4
          sm:px-6
        "
      >


        {/* ===================================================
            SUGGESTED QUESTIONS
        ==================================================== */}

        {messages.length === 0 && (

          <div
            className="
              mb-3
              flex
              flex-wrap
              gap-2
            "
          >

            {suggestedQuestions.map((question) => (

              <button
                key={question}

                onClick={() =>
                  void send(question)
                }

                disabled={loading}

                className="
                  rounded-full
                  border
                  border-hairline
                  px-3.5
                  py-1.5
                  text-[13px]
                  text-muted-foreground
                  transition-colors
                  hover:border-primary
                  hover:text-foreground
                  disabled:pointer-events-none
                  disabled:opacity-50
                "
              >

                {question}

              </button>

            ))}

          </div>

        )}


        {/* ===================================================
            INPUT FORM
        ==================================================== */}

        <form

          onSubmit={(event) => {

            event.preventDefault();

            void send(input);

          }}

          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-hairline
            bg-background
            px-4
            py-2
            focus-within:border-primary
          "
        >


          {/* =================================================
              INPUT
          ================================================== */}

          <input

            value={input}

            onChange={(event) =>
              setInput(event.target.value)
            }

            placeholder="Ask Lyx about Nandith…"

            aria-label="Ask Lyx a question"

            disabled={loading}

            className="
              flex-1
              bg-transparent
              py-1.5
              text-[15px]
              outline-none
              placeholder:text-muted-foreground
              disabled:opacity-50
            "

          />


          {/* =================================================
              STOP BUTTON WHILE STREAMING
          ================================================== */}

          {loading ? (

            <button

              type="button"

              onClick={stopGeneration}

              aria-label="Stop generating"

              className="
                flex
                size-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-primary
                text-primary-foreground
                transition-opacity
                hover:opacity-80
              "
            >

              <span
                className="
                  size-2.5
                  rounded-sm
                  bg-current
                "
              />

            </button>

          ) : (

            /* ===============================================
               SEND BUTTON
            ================================================ */

            <button

              type="submit"

              disabled={!input.trim()}

              aria-label="Send message"

              className="
                flex
                size-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-primary
                text-primary-foreground
                transition-opacity
                disabled:opacity-30
              "
            >

              <ArrowUp className="size-4" />

            </button>

          )}

        </form>

      </div>

    </div>

  );

}