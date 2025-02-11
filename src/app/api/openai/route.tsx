import {
  getChatCompletion,
  generateTaskTitle,
} from "@/lib/actions/openai.actions";
import { NextResponse } from "next/server";
import { Message, Messages } from "@/types";
import { auth } from "@clerk/nextjs/server";

import { CreateTaskParams } from "@/types/TaskData.d";
import { createTask } from "@/lib/actions/task.actions";

/* This route should run on the Edge Runtime. */
export const runtime = "edge";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = (await req.json()) as Messages;
    const messages = body.messages as Message[];
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated.");
    }

    // const isNewTask = await getTaskById(userId);
    // console.log("\x1b[33m%s\x1b[0m", "isNewTask: ", isNewTask);

    const chatResp = await getChatCompletion(messages as Message[]);

   // console.log("\x1b[33m%s\x1b[0m", "chatResp: ", chatResp);
    console.log("\x1b[33m%s\x1b[0m", "=======================================");

    if ("taskData" in chatResp) {
      const { taskData } = chatResp;
      const usage =
        "taskUsage" in chatResp ? (chatResp.taskUsage as number) : 0;

      const getTaskTitle = await generateTaskTitle([taskData] as Message[]);

      const newTaskContent: CreateTaskParams = {
        userId,
        usage,
        title: "title" in getTaskTitle ? getTaskTitle.title : "New Task",
        messages: [...messages, ...[taskData]] as Message[],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log("\x1b[33m%s\x1b[0m", "newTaskContent: ", newTaskContent);

      const newTask = await createTask(newTaskContent);
      console.log("\x1b[33m%s\x1b[0m", "createTask: ", newTask);
    }

    return NextResponse.json(chatResp);
  } catch (error) {
    const errMessage =
      error instanceof Error
        ? error.message
        : "Unexpected AI endpoint route error.";

    console.log("\x1b[31m%s\x1b[0m", "AI ERROR: ", errMessage);

    return NextResponse.json({
      taskError: {
        title: "AI endpoint route error!",
        error: errMessage,
        status: 500,
      },
    });
  }
}
