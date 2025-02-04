"use client";
import css from "@/styles/chat/ChatWrapper.module.css";
import ChatIntro from "../chat/ChatIntro";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import AlertMessage, { AlertParams } from "../shared/AlertMessage";
import getAiCompletition from "@/lib/openai/getAiCompletition";
import { useState } from "react";
import { Message } from "@/types";
import ChatHeader from "./ChatHeader";
import classNames from "classnames";

export default function ChatWrapper() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertParams | null>(null);
  const [startMsg, setStartMsg] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([]);

  const sendMessage = async (prompt: Message) => {
    if (!prompt) return;
    setIsLoading(true);
    setStartMsg("");

    const tempChat: Message = {
      whois: "assistant",
      role: "user",
      content: [{ type: "temp", text: "Thinking ..." }],
    };

    setChat((prev) => [...prev, prompt, tempChat]);

    try {
      const response = await getAiCompletition({
        messages: [...chat.slice(1), prompt],
      });

      console.log(response);

      if (response.data.error) {
        setAlert({
          title: response.data.error,
          text: `Error status: ${response.data.status}`,
        });
        setIsLoading(false);
        setChat((prev) => prev.slice(0, -1));
        return;
      }

      if (response.openai) {
        setChat((prev) => [...prev.slice(0, -1), response.openai]);
      }
    } catch (error) {
      console.error(error);
      setChat((prev) => prev.slice(0, -1));
    }

    setIsLoading(false);
  };

  const handleNewTask = () => {
    setChat([]);
  };

  const isChatEmpty = chat.length === 0;

  return (
    <main className={css.main}>
      {alert && <AlertMessage message={alert} />}
      <ChatHeader setNewTask={handleNewTask} isInUse={isChatEmpty} />

      <section
        id="ChatWrapperContent"
        className={classNames(css.content, isChatEmpty && css.intro)}
      >
        {isChatEmpty ? (
          <ChatIntro sendPrompt={(prompt) => setStartMsg(prompt)} />
        ) : (
          <ChatBody messages={chat} />
        )}
      </section>

      <ChatInput
        loading={isLoading}
        startPrompt={startMsg}
        sendMessage={sendMessage}
      />
    </main>
  );
}
