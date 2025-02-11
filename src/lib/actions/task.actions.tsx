"use server";
import { CreateTaskParams, UpdateTaskParams } from "@/types/TaskData.d";
import { connectToDatabase } from "../database/mongoose";
import { revalidatePath } from "next/cache";
import { handleError } from "@/lib/utils/handleError";
import Task from "../database/models/tasks.model";

// CREATE TASK
export async function createTask(task: CreateTaskParams) {
  try {
    await connectToDatabase();
    const newTask = await Task.create(task);

    return JSON.parse(JSON.stringify(newTask));
  } catch (error) {
    handleError({ error, source: "createTask" });
  }
}

// READ TASK by ID
export async function getTaskById(userId: string) {
  try {
    await connectToDatabase();
    const task = await Task.findOne({ clerkId: userId });

    return JSON.parse(JSON.stringify(task));
  } catch (error) {
    handleError({ error, source: "getTaskById" });
  }
}

// UPDATE TASK
export async function updateTask(taskId: number, task: UpdateTaskParams) {
  try {
    await connectToDatabase();
    const updatedTask = await Task.findOneAndUpdate({ taskId }, task, {
      new: true,
    });

    //if (!updatedTask) throw new Error("Task update failed");

    return JSON.parse(JSON.stringify(updatedTask));
  } catch (error) {
    handleError({ error, source: "updateTask" });
  }
}

// DELETE TASK
export async function deleteTask(taskId: number) {
  try {
    await connectToDatabase();

    const taskToDelete = await Task.findOne({ taskId });

    /*     if (!taskToDelete) {
      throw new Error("Task not found. / deleteTask()");
    } */

    const deletedTask = await Task.findByIdAndDelete(taskToDelete._id);
    revalidatePath("/");

    return deletedTask ? JSON.parse(JSON.stringify(deletedTask)) : null;
  } catch (error) {
    handleError({ error, source: "deleteTask" });
  }
}
