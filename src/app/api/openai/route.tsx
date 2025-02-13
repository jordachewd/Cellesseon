import { NextResponse } from "next/server";
import { Message, Messages } from "@/types";
import { generateResponse } from "@/lib/utils/openai/generateResponse";
import { generateTitle } from "@/lib/utils/openai/generateTitle";
import { CreateTaskParams, UpdateTaskParams } from "@/types/TaskData.d";
import { createTask, updateTask } from "@/lib/actions/task.actions";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated.");
    }

    const body = (await req.json()) as Messages;
    const messages = body.messages as Message[];
    const taskId = body.taskId as string | null;

    const aiResp = (await generateResponse({ messages, taskId })) as string;
    const { taskData, taskUsage, aiError } = JSON.parse(aiResp);

    console.log("\x1b[36m%s\x1b[0m", "aiResp: ", JSON.parse(aiResp));
    console.log("\x1b[35m%s\x1b[0m", "taskData: ", taskData.content);

    if (aiError) {
      return NextResponse.json({ aiError });
    }

    if (taskId) {
      await updateTask(taskId, {
        messages: [...messages, taskData] as Message[],
        usage: taskUsage as number,
        updatedAt: new Date(),
      } as UpdateTaskParams);

      //  console.log("\x1b[34m%s\x1b[0m", "updatedTask: ", updatedTask);
      console.log("\x1b[34m%s\x1b[0m", "updatedTask");

      return NextResponse.json({ taskData, taskId });
    } else {
      const getTitle = (await generateTitle([taskData] as Message[])) as string;
      const { title, usage, aiError } = JSON.parse(getTitle);

      if (aiError) {
        return NextResponse.json({ aiError });
      }

      const newTask = await createTask({
        userId,
        createdAt: new Date(),
        usage: usage as number,
        title: title as string,
        messages: [...messages, taskData] as Message[],
      } as CreateTaskParams);

      const taskId = newTask._id;

      //   console.log("\x1b[36m%s\x1b[0m", "createTask: ", newTask);
      console.log("\x1b[36m%s\x1b[0m", "createTask");

      return NextResponse.json({ taskData, taskId, aiError });
    }
  } catch (error) {
    const errMsg = error instanceof Error && error.message;
    const aiError = {
      title: "AI endpoint route error!",
      error: errMsg || "Unexpected error occurred.",
      status: 500,
    };

    return NextResponse.json({ aiError });
  }
}
