import css from "./ChatBody.module.css";
import { Message } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatBodyProps {
  messages: Message[];
}

export default function ChatBody({ messages }: ChatBodyProps) {
  return (
    <div className={css.section}>
      {messages.map((message, i) => {
        const isReply = message.role === "assistant" || message.role === "system";
        
        return (
          <div key={i} className={`${css.message} ${isReply && css.aiReply}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
}
