"use client";
import ChatInput from "@/components/chat/ChatInput";
import ChatWrapper from "@/components/layout/ChatWrapper";
import Header from "@/components/layout/Header";
import PageWrapper from "@/components/layout/PageWrapper";
import PromptWrapper from "@/components/layout/PromptWrapper";
import { Message } from "@/constants";
import { useState } from "react";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chat, setChat] = useState<Message[]>([]);

  const sendMessage = (message: Message) => {
    console.log("prompt: ", message);
    setChat((prev) => [...prev, message]);

    // await Promise.resolve(setChat( (prev) => [...prev, message] ))
    // mutation.mutate();
  };

  return (
    <PageWrapper>
      <Header />
      <ChatWrapper>Chat Body Here</ChatWrapper>
      <PromptWrapper>
        <ChatInput sendMessage={sendMessage} loading={false} />
      </PromptWrapper>
    </PageWrapper>
  );
}
