import css from "./ChatBody.module.css";
import { Message } from "@/types";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingSpinner from "../shared/LoadingSpinner";
import Image from "next/image";

interface ChatBodyProps {
  messages: Message[];
  loading: boolean;
}

export default function ChatBody({ messages, loading }: ChatBodyProps) {
  const parent = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current);
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [parent, messages]);

  return (
    <section className={css.section} ref={parent}>
      <div className={css.wrapper}>
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
                  message.content.map((contentItem, idx) => {
                    if (contentItem.type === "text") {
                      return (
                        <ReactMarkdown key={idx} remarkPlugins={[remarkGfm]}>
                          {contentItem.text}
                        </ReactMarkdown>
                      );
                    } else if (contentItem.type === "image_url") {
                      return (
                        <Image
                          key={idx}
                          priority={idx === 0}
                          src={contentItem.image_url.url}
                          alt="Generated image"
                          width={isBot ? 400 : 60}
                          height={isBot ? 400 : 60}
                          className={`my-4 ${isBot ? 'rounded-xl': 'rounded-lg'}`}
                          sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${
                            isBot ? "400px" : "60px"
                          }`}
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      );
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
        {loading && <LoadingSpinner />}
        <div className="flex w-full" ref={bottomRef}></div>
      </div>
    </section>
  );
}
