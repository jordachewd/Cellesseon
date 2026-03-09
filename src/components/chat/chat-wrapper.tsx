"use client";

import { useRef, useState } from "react";
import { Message } from "@/types";
import ChatHeader from "@/components/chat/chat-header";
import ChatIntro from "@/components/chat/chat-intro";
import ChatBody from "@/components/chat/chat-body";
import ChatInput from "@/components/chat/chat-input";
import AlertMessage, { AlertParams } from "@/components/shared/alert-message";
import { filterAssistantMsg } from "@/lib/utils/openai/filterAssistantMsg";

export default function ChatWrapper() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertParams | null>(null);
  const [startMsg, setStartMsg] = useState<string>("");
  const [dbTaskId, setDbTaskId] = useState<string | null>(null);
  const [task, setTask] = useState<Message[]>([]);
  const nextAlertId = useRef<number>(0);
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
        body: JSON.stringify({ messages: taskMessages, taskId: dbTaskId }),
      });
      const responseData = (await response.json().catch(() => null)) as {
        taskData?: Message;
        taskId?: string;
        error?: string;
      } | null;

      if (!response.ok) {
        const title = response.statusText || "Request failed";
        const text =
          typeof responseData?.error === "string" && responseData.error !== ""
            ? responseData.error
            : `Error status: ${response.status}`;
        showAlert(title, text);
        return;
      }

      if (!responseData) {
        showAlert("Error", "Invalid server response.");
        return;
      }

      const { taskData, taskId, error } = responseData;

      if (taskData) {
        setTask((prev) => [...prev.slice(0, -1), taskData]);
      }

      if (taskId) {
        setDbTaskId(taskId);
      }

      if (error) {
        showAlert("Error", error);
        return;
      }
    } catch (error) {
      console.error(error);
      setTask((prev) => prev.slice(0, -1));
    }

    setIsLoading(false);
  };

  const showAlert = (title: string, text: string) => {
    nextAlertId.current += 1;
    setAlert({ id: nextAlertId.current, title, text });
    setIsLoading(false);
    setTask((prev) => prev.slice(0, -1));
  };

  return (
    <main className="ChatWrapper relative z-0 flex h-full flex-1 flex-col">
      {alert && <AlertMessage message={alert} />}
      <ChatHeader setNewTask={() => setTask([])} />

      <section
        id="ChatWrapperContent"
        className={`cellesseon-scrollbar relative z-10 flex w-full flex-1 flex-col overflow-y-auto ${isNewTask ? "-mt-14 items-center justify-center space-y-4 px-4" : ""}`}
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
