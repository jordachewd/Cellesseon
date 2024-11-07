"use client";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import ChatWrapper from "@/components/layout/ChatWrapper";
import Header from "@/components/layout/Header";
import PageWrapper from "@/components/layout/PageWrapper";
import PromptWrapper from "@/components/layout/PromptWrapper";
import { Message } from "@/types";
import { Typography } from "@mui/material";
import { useState } from "react";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello there! How may I help you?",
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
    <PageWrapper>
      <Header />

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <ChatWrapper>
          <ChatBody messages={chat} />
        </ChatWrapper>
        <PromptWrapper>
          <ChatInput sendMessage={sendMessage} loading={isLoading} />
        </PromptWrapper>
        <div className="flex text-center self-center p-2">
          <Typography variant="subtitle1">
            Celeseon can make mistakes. So double-check it.
          </Typography>
        </div>
      </SignedIn>
    </PageWrapper>
  );
}
