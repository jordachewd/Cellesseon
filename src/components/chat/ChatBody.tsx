import css from "@/styles/chat/ChatBody.module.css";
import { Message } from "@/types";
import { useEffect, useMemo, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingBubbles from "../shared/LoadingBubbles";
import ImageHolder from "@/components/shared/ImageHolder";
import AudioPlayer from "@/components/shared/AudioPlayer";

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
  }, [messages]);

  // Memoize messages rendering
  const listMessages = useMemo(() => {
    return messages.map((message, i) => {
      const { whois, content } = message;
      const isBot = whois !== "user";

      return (
        <article
          key={i}
          className={`${css.article} ${isBot ? css.botArticle : ""}`}
        >
          <i
            className={`bi bi-${isBot ? "robot" : "person"} ${css.avatar}`}
          ></i>

          <div className={css.content}>
            {Array.isArray(content) ? (
              content.map((reply, idx) => {
                if (reply.type === "text") {
                  return (
                    <ReactMarkdown key={idx} remarkPlugins={[remarkGfm]}>
                      {reply.text}
                    </ReactMarkdown>
                  );
                }

                if (reply.type === "image_url") {
                  return (
                    <ImageHolder
                      key={idx}
                      hasTools={isBot}
                      src={reply.image_url || ""}
                      width={isBot ? 320 : 128}
                      height={isBot ? 320 : 128}
                    />
                  );
                }

                if (reply.type === "audio_url") {
                  return (
                    <AudioPlayer key={idx} audioSrc={reply.audio_url || null} />
                  );
                }

                if (reply.type === "temp") {
                  return <LoadingBubbles key={idx} size="small" />;
                }

                return null;
              })
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            )}
          </div>
        </article>
      );
    });
  }, [messages]);

  return (
    <>
      <div className={css.wrapper} ref={parent}>
        {listMessages}
      </div>
      <div className={css.bottomRef} ref={bottomRef}></div>
    </>
  );
}
