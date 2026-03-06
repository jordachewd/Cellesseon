"use server";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { CreateUserParams, UpdateUserParams } from "@/types/UserData.d";
import { handleError } from "../utils/handleError";
import serializeForClient from "../utils/serialize-for-client";
import { auth } from "@clerk/nextjs/server";

// CREATE USER (called from Clerk webhook — auth verified via signature)
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    if (!newUser) {
      return serializeForClient({
        message: "User creation failed!",
        status: "Error",
        source: "createUser",
      });
    }

    return serializeForClient(newUser);
  } catch (error) {
    handleError({ error, source: "createUser" });
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const { userId: authedUserId } = await auth();
    if (!authedUserId) throw new Error("Unauthorized");
    if (authedUserId !== clerkId) throw new Error("Forbidden");

    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
      strict: false,
      upsert: true,
    });

    if (!updatedUser) {
      return serializeForClient({
        message: "User update failed!",
        status: "Error",
        source: "updateUser",
      });
    }

    return serializeForClient({
      mongoResponse: updatedUser,
      message: "User updated successfully (user.actions.tsx)",
      status: 200,
    });
  } catch (error) {
    return serializeForClient(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    const { userId: authedUserId } = await auth();
    if (!authedUserId) throw new Error("Unauthorized");
    if (authedUserId !== clerkId) throw new Error("Forbidden");

    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      return serializeForClient({
        message: "User does not exist!",
        status: "Error",
        source: "deleteUser",
      });
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? serializeForClient(deletedUser) : null;
  } catch (error) {
    handleError({ error, source: "deleteUser" });
  }
}

// READ by id
export async function getUserById(userId: string) {
  try {
    const { userId: authedUserId } = await auth();
    if (!authedUserId) throw new Error("Unauthorized");

    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    return serializeForClient(user);
  } catch (error) {
    handleError({ error, source: "getUserById" });
  }
}
