"use client";
import css from "./MainPage.module.css";
import { Message } from "@/types";
import { useState } from "react";
import getOpenAiApi from "@/utils/getOpenAi";
import Header from "@/components/layout/Header";
import ChatIntro from "../chat/ChatIntro";
import ChatSidebar from "../chat/ChatSidebar";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import AlertMessage, { AlertParams } from "../shared/AlertMessage";

export default function MainPage() {
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
      const response = await getOpenAiApi({
        messages: [...chat.slice(1), prompt],
      });

      if (!response.ok) {
        const errText = response.statusText;
        setAlert({
          title: `Error ${response.status}`,
          text: `${errText ? errText : "Error fetching OpenAI API!"}`,
        });
        setIsLoading(false);

        setChat((prev) => prev.slice(0, -1));
        return;
      }

      const data = await response.json();
      if (data.error) {
        setAlert({
          title: data.title,
          text:
            typeof data.error === "string"
              ? data.error
              : "Unknown error occurred",
        });
        setIsLoading(false);

        setChat((prev) => prev.slice(0, -1));
        return;
      }

      if (data.choices && data.choices[0]?.message) {
        const gpt4o = data.choices[0].message;
        const dalle = data.dalle?.data[0];
        const newContent: Message["content"] = [
          {
            type: "text",
            text: gpt4o.content || dalle?.revised_prompt || "",
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
          whois: gpt4o.role,
          role: dalle ? "user" : gpt4o.role,
          content: newContent,
        };

        setChat((prev) => [...prev.slice(0, -1), newChat]);
      }
    } catch (error) {
      console.error(error);
      setChat((prev) => prev.slice(0, -1));
    }
    setIsLoading(false);
  };

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
