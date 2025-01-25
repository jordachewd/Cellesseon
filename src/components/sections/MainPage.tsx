"use client";
import css from "@/styles/sections/MainPage.module.css";
import Header from "@/components/layout/Header";
import ChatIntro from "../chat/ChatIntro";
import ChatSidebar from "../chat/ChatSidebar";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import AlertMessage, { AlertParams } from "../shared/AlertMessage";
import getAiCompletition from "@/lib/utils/getAiCompletition";
import { useEffect, useState } from "react";
import { UserData } from "@/types/UserData.d";
import { getUserById } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { Message } from "@/types";

export default function MainPage() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertParams | null>(null);
  const [startMsg, setStartMsg] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserData = async (userId: string) => {
    if (!userId) return;
    const userData: UserData = await getUserById(userId);
    setUserData(userData);
  };

  useEffect(() => {
    if (user) {
      getUserData(user.id);
    }
  }, [user]);

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
