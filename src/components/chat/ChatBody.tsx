import css from "./ChatBody.module.css";
import { Message } from "@/types";
import { Typography } from "@mui/material";
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
              <div className={`${css.title} ${isBot ? css.botTitle : ""}`}>
                {isBot ? (
                  <i
                    className={`bi bi-robot bg-jwdMarine-500 ${css.avatar}`}
                  ></i>
                ) : (
                  <i
                    className={`bi bi-person bg-jwdAqua-500 ${css.avatar}`}
                  ></i>
                )}

                <Typography variant="h5">
                  {isBot ? "celeseon" : "you"}
                </Typography>
              </div>

              <div className={`${css.content} ${isBot ? css.botContent : ""}`}>
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
                          priority
                          src={contentItem.image_url.url}
                          alt="Generated image"
                          width={480}
                          height={480}
                          className="my-4"
                          sizes="50vw"
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
        <div ref={bottomRef}></div>
      </div>
    </section>
  );
}
