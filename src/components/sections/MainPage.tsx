"use client";
import css from "@/styles/layout/PageWrapper.module.css";
import Header from "@/components/layout/Header";
import ChatIntro from "../chat/ChatIntro";
import ChatSidebar from "../chat/ChatSidebar";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import AlertMessage, { AlertParams } from "../shared/AlertMessage";
import getAiCompletition from "@/lib/utils/getAiCompletition";
import { useState } from "react";
import { UserData } from "@/types/UserData.d";
import { Message } from "@/types";

interface MainPageProps {
  userData: UserData;
}

export default function MainPage({ userData }: MainPageProps) {
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

  return (
    <div className={css.wrapper}>
      <ChatSidebar userData={userData} />
      <div className={css.section}>
        <Header isSignedIn />
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
