/* UNUSED */

import { createContext, useContext, ReactNode } from "react";
import { UserData } from "@/types/UserData.d";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

interface ChatContextTypes {
  userData: UserData | undefined;
}

const defaultValues: ChatContextTypes = {
  userData: undefined,
};

const ChatContext = createContext<ChatContextTypes>(defaultValues);

interface ChatContextProviderProps {
  children: ReactNode;
}

export async function ChatContextProvider({
  children,
}: ChatContextProviderProps) {
  const { userId } = await auth();
  let userData: UserData | undefined = undefined;

  if (userId) {
    userData = await getUserById(userId);
  }

  const context: ChatContextTypes = {
    userData: userId && userData ? userData : undefined,
  };

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);

export default ChatContext;
