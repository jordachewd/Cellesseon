import css from "./ChatBody.module.css";
import { Message } from "@/types";
import { Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingSpinner from "../shared/LoadingSpinner";

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
  }, [parent]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className={css.section} ref={parent}>
      {messages.map((message, i) => {
        const isBot = message.role !== "user";
        return (
          <div
            key={`message-${i}`}
            className={`${css.message} ${isBot ? css.bot : ""}`}
          >
            {isBot ? (
              <i className={`bi bi-robot bg-jwdAqua ${css.avatar}`}></i>
            ) : (
              <i className={`bi bi-person bg-jwdMarine ${css.avatar}`}></i>
            )}

            <div className={css.content}>
              <Typography variant="h5">{isBot ? "Celeseon" : "You"}</Typography>
              <div className={css.msg}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        );
      })}

      {loading && <LoadingSpinner />}
      <div ref={bottomRef} className="h-1"></div>
    </section>
  );
}
