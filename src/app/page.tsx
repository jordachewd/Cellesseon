"use client";
import { getOpenAi } from "@/actions/openAi.actions";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import ChatWrapper from "@/components/layout/ChatWrapper";
import Header from "@/components/layout/Header";
import PageWrapper from "@/components/layout/PageWrapper";
import PromptWrapper from "@/components/layout/PromptWrapper";
import { Message } from "@/types";
import { Typography } from "@mui/material";
import { useState } from "react";

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

    console.log("prompt: ", prompt);

    setIsLoading(true);
    setChat((prev) => [...prev, prompt]);

    try {
      const chatContext = chat.slice(1);
      const response = await getOpenAi([...chatContext, prompt]);

      console.log("response: ", response);

    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <PageWrapper>
      <Header />
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
    </PageWrapper>
  );
}
