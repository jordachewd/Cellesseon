import { Message } from "@/types";
import { useEffect, useMemo, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingBubbles from "../shared/loading-bubbles";
import ImageHolder from "@/components/shared/image-holder";
import AudioPlayer from "@/components/shared/audio-player";

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

  const listMessages = useMemo(() => {
    return messages.map((message, i) => {
      const { whois, content } = message;
      const isBot = whois !== "user";

      return (
        <article
          key={i}
          className={`animate-fade-up animate-once animate-duration-500 flex items-start space-x-3 ${isBot ? "animate-delay-300 flex-row space-x-3" : "flex-row-reverse space-x-reverse"}`}
        >
          <i
            className={`bi bi-${isBot ? "robot" : "person"} rounded-full p-2 text-base leading-none shadow ${isBot ? "bg-lightPrimary-100 dark:bg-darkPrimary-500/40" : "bg-lightSecondary-200 text-lightText-500 dark:bg-darkSecondary-500 dark:text-darkText-500"}`}
          ></i>

          <div className={`chat-markdown ${isBot ? "chat-markdown--bot" : ""}`}>
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
                      src={reply.image_url?.url || ""}
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
      <div
        className="mx-auto flex w-full max-w-screen-lg flex-1 flex-col space-y-4 p-6 lg:px-0 lg:pb-10 lg:pt-20"
        ref={parent}
      >
        {listMessages}
      </div>
      <div className="flex h-2 w-full" ref={bottomRef}></div>
    </>
  );
}
