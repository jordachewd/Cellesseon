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

    const newMessage: Message = { role: "assistant", content: "" };
    setChat((prev) => [...prev, newMessage]);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chat.slice(1), prompt] }),
      });

      if (!response.body) {
        setAlert({
          text: "ReadableStream not supported in response!",
        });
        throw new Error("ReadableStream not supported in response");
      }

      console.log("response: ", response);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (chunk.includes("[DONE]")) {
          setIsLoading(false);
          break;
        }

        newMessage.content += chunk;
        setChat((prev) => {
          const updatedChat = [...prev];
          updatedChat[updatedChat.length - 1] = { ...newMessage };
          return updatedChat;
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        text: "Error streaming OpenAI API response!",
      });
      setIsLoading(false);
    }
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
