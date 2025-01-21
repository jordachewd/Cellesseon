"use client";
import css from "@/styles/sections/MainPage.module.css";
import { Message } from "@/types";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Header from "@/components/layout/Header";
import ChatIntro from "../chat/ChatIntro";
import ChatSidebar from "../chat/ChatSidebar";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import AlertMessage, { AlertParams } from "../shared/AlertMessage";
import getAiCompletition from "@/lib/utils/getAiCompletition";
import SpinnerGrow from "../shared/SpinnerGrow";

export default function MainPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertParams | null>(null);
  const [startMsg, setStartMsg] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([]);
  const { isLoaded } = useUser();

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

  if (!isLoaded) {
    return (
      <div className={`${css.wrapper} justify-center`}>
        <SpinnerGrow size="large" />
      </div>
    );
  }

  return (
    <div className={css.wrapper}>
      <ChatSidebar newChat={() => setChat([])} loading={isLoading} />
      <div className={css.section}>
        <Header />
        {alert && <AlertMessage message={alert} />}

        {chat.length ? (
          <ChatBody messages={chat} />
        ) : (
          <ChatIntro sendPrompt={(prompt) => setStartMsg(prompt)} />
        )}

        <ChatInput
          sendMessage={sendMessage}
          loading={isLoading}
          startPrompt={startMsg}
        />
      </div>
    </div>
  );
}
