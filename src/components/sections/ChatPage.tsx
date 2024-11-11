"use client";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import Header from "@/components/layout/Header";
import AlertMessage, { AlertParams } from "../shared/AlertMessage";
import { Message } from "@/types";
import { useState } from "react";

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [alert, setAlert] = useState<AlertParams | null>(null);

  const [chat, setChat] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello there! How can I help you?",
    },
  ]);

  const sendMessage = async (prompt: Message) => {
    if (!prompt) return;

    setIsLoading(true);
    setChat((prev) => [...prev, prompt]);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chat.slice(1), prompt] }),
      });

      if (!response.ok) {
        setAlert({
          text: "Error fetching OpenAI API!",
        });
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();

      if (data.error) {
        console.log("DATA: ", data.error);
        setAlert({
          text: data.error.message,
        });
      }

      if (data.choices && data.choices[0].message) {
        const newChat: Message = {
          role: data.choices[0].message.role,
          content: data.choices[0].message.content,
        };

        setChat((prev) => [...prev, newChat]);
      }


    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  return (
    <>
      <Header />
      {alert && <AlertMessage message={alert} />}
      <ChatBody messages={chat} loading={isLoading} />
      <ChatInput sendMessage={sendMessage} loading={isLoading} />
    </>
  );
}
