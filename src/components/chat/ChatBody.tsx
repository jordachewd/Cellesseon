import css from "@/styles/chat/ChatBody.module.css";
import { Message } from "@/types";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingBubbles from "../shared/LoadingBubbles";
import ImageHolder from "../shared/ImageHolder";

interface ChatBodyProps {
  messages: Message[];
}

export default function ChatBody({ messages }: ChatBodyProps) {
  const parent = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length > 1) {
      if (parent.current) {
        autoAnimate(parent.current);
      }
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [parent, messages]);

  return (
    <section className={css.section}>
      <div className={css.wrapper} ref={parent}>
        {messages.map((message, i) => {
          const isBot = message.whois !== "user";
          return (
            <article
              key={i}
              className={`${css.article} ${isBot ? css.botArticle : ""}`}
            >
              {isBot ? (
                <i className={`bi bi-robot ${css.avatar}`}></i>
              ) : (
                <i className={`bi bi-person ${css.avatar}`}></i>
              )}

              <div className={css.content}>
                {Array.isArray(message.content) ? (
                  message.content.map((reply, idx) => {
                    if (reply.type === "text") {
                      return (
                        <ReactMarkdown key={idx} remarkPlugins={[remarkGfm]}>
                          {reply.text}
                        </ReactMarkdown>
                      );
                    } else if (reply.type === "image_url") {
                      return (
                        <ImageHolder
                          key={idx}
                          src={reply.image_url.url}
                          width={isBot ? 320 : 60}
                          height={isBot ? 320 : 60}
                        />
                      );
                    } else if (reply.type === "temp") {
                      return <LoadingBubbles key={idx} size="small" />;
                    }
                    return null;
                  })
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className={css.bottomRef} ref={bottomRef}></div>
    </section>
  );
}
