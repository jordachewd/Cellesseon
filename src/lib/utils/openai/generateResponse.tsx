import { chatTools, openAiClient, systemMsg } from "@/constants/openai";
import { ContentItem, Message, MessageRole } from "@/types";
import { generateImage } from "./generateImage";
import { generateAudio } from "./generateAudio";
import manageErrors from "./manageErrors";
import { auth } from "@clerk/nextjs/server";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/chat/completions.mjs";
// import { generateTaskTitle } from "./generateTaskTitle";
// import { CreateTaskParams } from "@/types/TaskData.d";
// import { createTask, updateTask } from "@/lib/actions/task.actions";

interface GenerateResponseParams {
  taskId: string | null;
  messages: Message[];
}

export async function generateResponse({
  messages,
  taskId,
}: GenerateResponseParams) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated.");
    }

    const chatData = await openAiClient.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.1,
      messages: [...systemMsg, ...messages] as ChatCompletionMessageParam[],
      tools: chatTools as ChatCompletionTool[],
    });

    if (!chatData.choices?.length) {
      throw new Error("No choices returned from Chat Completion API.");
    }

    const { message, finish_reason } = chatData.choices[0];
    const toolCalls = message.tool_calls;

    if (finish_reason === "tool_calls" && toolCalls) {
      const { name: fnName, arguments: args } = toolCalls[0].function;
      const fnArgs = JSON.parse(args);

      if (fnName === "generateImage") {
        return await generateImage({
          prompt: fnArgs.prompt as string,
          role: message.role as MessageRole,
        });
      }

      if (fnName === "generateAudio") {
        return await generateAudio(
          Array.isArray(fnArgs) ? fnArgs : ([fnArgs] as Message[]),
          message.role as MessageRole
        );
      }
    }

    const taskContent: ContentItem[] = [
      { type: "text", text: message.content },
    ];

    const respData: Message = {
      whois: message.role,
      role: message.role,
      content: taskContent,
    };

    /*    
     const taskUsage = chatData.usage?.total_tokens ?? 0;
    
    if (taskId) {
      const updateDbTask = {
        messages: [...messages, respData] as Message[],
        usage: taskUsage,
        updatedAt: new Date(),
      };

      const updatedTask = await updateTask(taskId, updateDbTask);
      console.log("\x1b[33m%s\x1b[0m", "updatedTask: ", updatedTask);

      return { respData, taskId };
    } else {
      const getTitle = await generateTaskTitle([respData] as Message[]);
      const taskTitle = "title" in getTitle ? getTitle.title : "New Task";

      const dbNewTask: CreateTaskParams = {
        userId,
        usage: taskUsage,
        title: taskTitle,
        messages: [...messages, respData] as Message[],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newTask = await createTask(dbNewTask);
      console.log("\x1b[33m%s\x1b[0m", "createTask: ", newTask);

      return { respData, taskId: newTask._id };
    } */

    return { taskData: respData, taskId };
  } catch (error) {
    return manageErrors({
      title: "AI chat completion error!",
      error,
    });
  }
}
