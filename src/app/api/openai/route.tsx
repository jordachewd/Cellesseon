import { NextResponse } from "next/server";
import { Messages } from "@/types";
import { generateResponse } from "@/lib/utils/openai/generateResponse";
import { generateTitle } from "@/lib/utils/openai/generateTitle";
import { CreateTaskParams, UpdateTaskParams } from "@/types/TaskData.d";
import { createTask, updateTask } from "@/lib/actions/task.actions";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { messages, taskId: providedTaskId } = (await req.json()) as Messages;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }

    // Verify user plan is active before calling OpenAI
    const userData = (await getUserById(userId)) as UserData | null;
    if (userData?.plan?.expiresOn) {
      const expiresOn = new Date(userData.plan.expiresOn);
      if (expiresOn < new Date()) {
        return NextResponse.json(
          { error: "Your plan has expired. Please upgrade to continue." },
          { status: 403 },
        );
      }
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
    console.error("OpenAI route error:", error);

    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 },
    );
  }
}
