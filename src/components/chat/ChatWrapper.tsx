"use client";
import classNames from "classnames";
import { useState } from "react";
import { Message } from "@/types";
import css from "@/styles/chat/ChatWrapper.module.css";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatIntro from "@/components/chat/ChatIntro";
import ChatBody from "@/components/chat/ChatBody";
import ChatInput from "@/components/chat/ChatInput";
import AlertMessage, { AlertParams } from "@/components/shared/AlertMessage";

export default function ChatWrapper() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertParams | null>(null);
  const [startMsg, setStartMsg] = useState<string>("");
  const [task, setTask] = useState<Message[]>([]);
  const isNewTask = task.length === 0;

  const sendMessage = async (prompt: Message) => {
    if (!prompt) return;
    setIsLoading(true);
    setStartMsg("");

    const tempPrompt: Message = {
      whois: "assistant",
      role: "user",
      content: [{ type: "temp", text: "Thinking ..." }],
    };

    setTask((prev) => [...prev, prompt, tempPrompt]);

    try {
      const taskMessages = filterAssistantMsg([...task, prompt] as Message[]);

      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: taskMessages }),
      });

      if (response.status !== 200) {
        showAlert(response.statusText, `Error status: ${response.status}`);
        return;
      }

      const responseData = await response.json();
      const { taskData, taskError } = responseData;

      if (taskData) {
        setTask((prev) => [...prev.slice(0, -1), taskData]);
      }

      if (taskError) {
        const { title, error } = taskError;
        showAlert(title, error);
        return;
      }
    } catch (error) {
      console.error(error);
      setTask((prev) => prev.slice(0, -1));
    }

    setIsLoading(false);
  };

  const showAlert = (title: string, text: string) => {
    setAlert({ title, text });
    setIsLoading(false);
    setTask((prev) => prev.slice(0, -1));
  };

  console.log("tasks", task);

  return (
    <main className={css.main}>
      {alert && <AlertMessage message={alert} />}
      <ChatHeader setNewTask={() => setTask([])} />

      <section
        id="ChatWrapperContent"
        className={classNames(css.content, isNewTask && css.intro)}
      >
        {isNewTask ? (
          <ChatIntro sendPrompt={(prompt) => setStartMsg(prompt)} />
        ) : (
          <ChatBody messages={task} />
        )}
      </section>

      <ChatInput
        sendMessage={sendMessage}
        loading={isLoading}
        startPrompt={startMsg}
      />
    </main>
  );
}

function filterAssistantMsg(messages: Message[]) {
  return messages.map((message) => {
    if (message.whois === "assistant") {
      return {
        ...message,
        content: Array.isArray(message.content)
          ? message.content.filter((item) => item.type !== "image_url")
          : message.content,
      };
    }
    return message;
  });
}
