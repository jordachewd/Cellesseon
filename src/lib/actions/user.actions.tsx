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

    if (!newUser) {
      return JSON.parse(
        JSON.stringify({
          message: "User creation failed!",
          status: "Error",
          source: "createUser",
        })
      );
    }

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError({ error, source: "createUser" });
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

    if (!updatedUser) {
      return JSON.parse(
        JSON.stringify({
          message: "User update failed!",
          status: "Error",
          source: "updateUser",
        })
      );
    }

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
      return JSON.parse(
        JSON.stringify({
          message: "User does not exist!",
          status: "Error",
          source: "deleteUser",
        })
      );
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError({ error, source: "deleteUser" });
  }
}

// READ by id
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User does not exist!");

    return JSON.parse(JSON.stringify({ user }));
  } catch (error) {
    handleError({ error, source: "getUserById" });
  }
}

// READ by slug (username)
export async function getUserBySlug(slug: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ username: slug });

    if (!user) {
      return JSON.parse(
        JSON.stringify({
          message: "User does not exist!",
          status: "Error",
          source: "getUserBySlug",
          payLoad: slug,
        })
      );
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError({ error, source: "getUserBySlug" });
  }
}

// READ ALL USERS
export async function getAllUsers() {
  try {
    await connectToDatabase();

    const users = await User.find({});

    if (!users || users.length === 0) {
      return JSON.parse(
        JSON.stringify({
          message: "No users found!",
          status: "Error",
          source: "getAllUsers",
        })
      );
    }

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError({ error, source: "getAllUsers" });
  }
}
