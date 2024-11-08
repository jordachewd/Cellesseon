"use client";
import css from "./ChatPage.module.css";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { Message } from "@/types";
import { useState } from "react";

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello there! How can I help you today?",
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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.choices && data.choices[0].message) {
        const newChat: Message = {
          role: data.choices[0].message.role,
          content: data.choices[0].message.content,
        };
        console.log("newChat: ", newChat);
        setChat((prev) => [...prev, newChat]);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  return (
    <section className={css.section}>
      <Header />
      <ChatBody messages={chat} loading={isLoading} />
   
        <ChatInput sendMessage={sendMessage} loading={isLoading} />
     
      <Footer />
    </section>
  );
}
