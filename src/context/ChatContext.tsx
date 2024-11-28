"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface SidebarContextType {
  isSbOpen: boolean;
  updateSb: () => void;
}

interface ChatContextType {
  sidebarCtx: SidebarContextType;
}

const defaultContextValue: ChatContextType = {
  sidebarCtx: {
    isSbOpen: true,
    updateSb: () => {},
  },
};

const ChatContext = createContext<ChatContextType>(defaultContextValue);

interface ChatContextProviderProps {
  children: ReactNode;
}

export function ChatContextProvider({ children }: ChatContextProviderProps) {
  const [openNav, setOpenNav] = useState<boolean>(false);

  const context: ChatContextType = {
    sidebarCtx: {
      isSbOpen: openNav,
      updateSb: () => setOpenNav((prevOpenNav) => !prevOpenNav),
    },
  };

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);

export default ChatContext;
