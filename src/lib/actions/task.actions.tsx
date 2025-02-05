"use server";
import Tasks from "../database/models/tasks.model";
import { CreateTaskParams, UpdateTaskParams } from "@/types/TaskData.d";
import { connectToDatabase } from "@/lib/database/mongoose";
import { revalidatePath } from "next/cache";
import { handleError } from "@/lib/utils/handleError";

// CREATE TASK
export async function createTask(task: CreateTaskParams) {
  try {
    await connectToDatabase();
    const newTask = await Tasks.create(task);
    return JSON.parse(JSON.stringify(newTask));
  } catch (error) {
    handleError({ error, source: "connectToDatabase" });
  }
}

// READ TASK by ID
export async function getTaskById(taskId: number) {
  try {
    await connectToDatabase();

    const task = await Tasks.findOne({ _id: taskId });
    if (!task) throw new Error("Task not found / getTaskById().");

    return JSON.parse(JSON.stringify(task));
  } catch (error) {
    handleError({ error, source: "getTaskById" });
  }
}

// UPDATE TASK
export async function updateTask(taskId: number, task: UpdateTaskParams) {
  try {
    await connectToDatabase();

    const updatedTask = await Tasks.findOneAndUpdate({ taskId }, task, {
      new: true,
    });

    if (!updatedTask) throw new Error("Task update failed");

    return JSON.parse(JSON.stringify(updatedTask));
  } catch (error) {
    handleError({ error, source: "updateTask" });
  }
}

// DELETE TASK
export async function deleteTask(taskId: number) {
  try {
    await connectToDatabase();

    const taskToDelete = await Tasks.findOne({ taskId });

    if (!taskToDelete) {
      throw new Error("Task not found. / deleteTask()");
    }

    const deletedTask = await Tasks.findByIdAndDelete(taskToDelete._id);
    revalidatePath("/");

    return deletedTask ? JSON.parse(JSON.stringify(deletedTask)) : null;
  } catch (error) {
    handleError({ error, source: "deleteTask" });
  }
}
