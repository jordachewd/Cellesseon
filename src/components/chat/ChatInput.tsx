import css from "./ChatInput.module.css";
import { useState } from "react";
import { Message } from "@/constants";
import LoadingSpinner from "../shared/LoadingSpinner";

interface ChatInputProps {
  sendMessage: (message: Message) => void;
  loading: boolean;
}

export default function ChatInput({ sendMessage, loading }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
  };

  return (
    <div className={css.container}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <input
            className={css.prompt}
            placeholder="Ask anything in your mind ..."
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

          <i className={`bi bi-send ${css.send}`} onClick={handleSubmit}></i>
        </>
      )}
    </div>
  );
}
