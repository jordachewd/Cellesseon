"use server";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { CreateUserParams, UpdateUserParams } from "@/types/UserData.d";
import { handleError } from "../utils/handleError";

// CREATE USER
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
      strict: false,
      upsert: true,
    });

    if (!updatedUser)
      throw new Error("User update failed. Check: 'user.action'.");

    return JSON.parse(
      JSON.stringify({
        mongoResponse: updatedUser,
        message: "User updated successfully (user.actions.tsx)",
        status: 200,
      })
    );
  } catch (error) {
    return JSON.parse(JSON.stringify(error));
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user & AWS folder
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// READ by id
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// READ by slug (username)
export async function getUserBySlug(slug: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ username: slug });

    if (!user) {
      throw new Error("User not found");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// READ ALL USERS
export async function getAllUsers() {
  try {
    await connectToDatabase();

    const users = await User.find({});

    if (!users || users.length === 0) throw new Error("No users found");

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE PLAN
export async function updatePlan(userId: string, plan: string) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { role: plan } },
      { new: true }
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}
