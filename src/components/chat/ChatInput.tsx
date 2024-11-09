import css from "./ChatInput.module.css";
import { useState } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Message } from "@/types";

interface ChatInputProps {
  sendMessage: (message: Message) => void;
  loading: boolean;
}

export default function ChatInput({ sendMessage, loading }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ role: "user", content: value });
    setValue("");
  };

  return (
    <section className={css.section}>

      <div className={css.prompt}>
        <input
          disabled={loading}
          className={css.input}
          placeholder="Ask Celeseon ..."
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        {loading ? (
          <LoadingSpinner text="" alignment="right" iconSize="text-xl" />
        ) : (
          <i className={`bi bi-send ${css.send}`} onClick={handleSubmit}></i>
        )}
      </div>

      <div className={css.bottom}>
        Celeseon can make mistakes. So double-check it.
      </div>
    </section>
  );
}
