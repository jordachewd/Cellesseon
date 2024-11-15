"use client";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import Header from "@/components/layout/Header";
import AlertMessage, { AlertParams } from "../shared/AlertMessage";
import { Message } from "@/types";
import { useState } from "react";

export default function MainPage() {
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

    console.log("SEND: ", [...chat.slice(1), prompt]);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chat.slice(1), prompt],
        }),
      });

      if (!response.ok) {
        console.log("Response: ", response);
        setAlert({
          text: "Error fetching OpenAI API!",
        });
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();

      if (data.error) {
        console.log("Data ERROR: ", data);
        setAlert({
          text:
            typeof data.error === "string"
              ? data.error
              : "Unknown error occurred",
        });
        setIsLoading(false);
        return;
      }

      console.log("data: ", data);

      if (data.choices && data.choices[0]?.message) {
        const gpt4o = data.choices[0].message;
        const dalle = data.dalle?.data[0];

        const newContent: Message["content"] = [
          {
            type: "text",
            text: gpt4o.content || dalle.revised_prompt,
          },
        ];

        if (dalle) {
          newContent.push({
            type: "image_url",
            image_url: {
              url: dalle.url,
            },
          });
        }

        const newChat: Message = {
          role: dalle ? "user" : gpt4o.role,
          content: newContent,
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
