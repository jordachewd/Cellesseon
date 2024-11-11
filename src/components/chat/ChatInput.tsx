import css from "./ChatInput.module.css";
import { useState } from "react";
import { Message } from "@/types";
import { TextField } from "@mui/material";

interface ChatInputProps {
  sendMessage: (message: Message) => void;
  loading: boolean;
}

export default function ChatInput({ sendMessage, loading }: ChatInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt === "") return;
    sendMessage({ role: "user", content: prompt });
    setPrompt("");
  };

  return (
    <section className={css.section}>
      <TextField
        fullWidth
        value={prompt}
        disabled={loading}
        label="Ask celeseon..."
        helperText="Celeseon can make mistakes. So double-check it."
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      {loading ? (
        <i className={`bi bi-arrow-repeat ${css.spinner}`}></i>
      ) : (
        <i className={`bi bi-send ${css.send}`} onClick={handleSubmit}></i>
      )}
    </section>
  );
}
