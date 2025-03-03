import { NextResponse } from "next/server";
import { Messages } from "@/types";
import { generateResponse } from "@/lib/utils/openai/generateResponse";
import { generateTitle } from "@/lib/utils/openai/generateTitle";
import { CreateTaskParams, UpdateTaskParams } from "@/types/TaskData.d";
import { createTask, updateTask } from "@/lib/actions/task.actions";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { messages, taskId: providedTaskId } = (await req.json()) as Messages;
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated.");
    }

    let taskId = providedTaskId;

    if (!taskId) {
      const generatedTitle = await generateTitle(messages);
      const { title, usage } = JSON.parse(generatedTitle as string);

      const newTask = await createTask({
        userId,
        title,
        messages,
        usage,
      } as CreateTaskParams);

      if (!newTask) {
        throw new Error("Task creation failed.");
      }

      taskId = newTask._id;
    }

    if (!taskId) {
      throw new Error("Task ID is undefined.");
    }

    const aiResponse = await generateResponse({ messages, taskId });
    const { taskData, taskUsage } = JSON.parse(aiResponse as string);

    console.log("Generated Task Data:", taskData.content);

    await updateTask(taskId, {
      messages: [...messages, taskData],
      usage: taskUsage || 0,
    } as UpdateTaskParams);

    return NextResponse.json({ taskData, taskId });
  } catch (error) {
    const errMsg = error instanceof Error && error.message;
    const aiError = {
      title: "AI API endpoint error!",
      error: errMsg || "Unexpected error occurred.",
      status: 500,
    };

    return NextResponse.json({ aiError });
  }
}
