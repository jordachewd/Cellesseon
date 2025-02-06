"use client";
import classNames from "classnames";
import { useState } from "react";
import { Message } from "@/types";
import css from "@/styles/chat/ChatWrapper.module.css";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatIntro from "@/components/chat/ChatIntro";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import AlertMessage, { AlertParams } from "@/components/shared/AlertMessage";

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
      const taskMessages = [...chat.slice(1), prompt] as Message[];
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: taskMessages }),
      });

      if (response.status !== 200) {
        handleError(response.statusText, `Error status: ${response.status}`);
        return;
      }

      const responseData = await response.json();
      console.log("ChatWrapper responseData: ", responseData);

      if (responseData.taskError) {
        const { title, error } = responseData.taskError;
        handleError(title, error);
        return;
      } else if (responseData.taskData) {
        setChat((prev) => [...prev.slice(0, -1), responseData.taskData]);
      }
    } catch (error) {
      console.error(error);
      setChat((prev) => prev.slice(0, -1));
    }

    setIsLoading(false);
  };

  const handleError = (title: string, text: string) => {
    setAlert({ title, text });
    setIsLoading(false);
    setChat((prev) => prev.slice(0, -1));
  };

  const isChatEmpty = chat.length === 0;

  return (
    <main className={css.main}>
      {alert && <AlertMessage message={alert} />}
      <ChatHeader setNewTask={() => setChat([])} />

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
        sendMessage={sendMessage}
        loading={isLoading}
        startPrompt={startMsg}
      />
    </main>
  );
}
