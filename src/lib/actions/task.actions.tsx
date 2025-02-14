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

    if (!newTask) {
      throw new Error("Task creation failed!");
    }

    return JSON.parse(JSON.stringify(newTask));
  } catch (error) {
    handleError({ error, source: "createTask" });
  }
}

// UPDATE TASK
export async function updateTask(taskId: string, task: UpdateTaskParams) {
  try {
    await connectToDatabase();

    const updateFields = { ...task, updatedAt: new Date() };
    delete updateFields.usage;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      {
        $inc: { usage: task.usage },
        $set: updateFields,
      },
      { new: true }
    );

    if (!updatedTask) {
      throw new Error("Task update failed!");
    }

    return JSON.parse(JSON.stringify(updatedTask));
  } catch (error) {
    handleError({ error, source: "updateTask" });
  }
}

// READ TASK by ID
export async function getTaskById(userId: string) {
  try {
    await connectToDatabase();
    const task = await Task.findOne({ clerkId: userId });

    if (!task) {
      throw new Error("Task not found!");
    }

    return JSON.parse(JSON.stringify(task));
  } catch (error) {
    handleError({ error, source: "getTaskById" });
  }
}

// DELETE TASK
export async function deleteTask(taskId: number) {
  try {
    await connectToDatabase();

    const taskToDelete = await Task.findOne({ taskId });

    if (!taskToDelete) {
      throw new Error("Task not found!");
    }

    const deletedTask = await Task.findByIdAndDelete(taskToDelete._id);

    if (!deletedTask) {
      throw new Error("Task deletion failed!");
    }

    revalidatePath("/");

    return JSON.parse(JSON.stringify(deletedTask));
  } catch (error) {
    handleError({ error, source: "deleteTask" });
  }
}
