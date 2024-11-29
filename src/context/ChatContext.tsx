"use client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface SidebarContextType {
  isSbOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

interface ChatContextType {
  sidebarCtx: SidebarContextType;
}

const defaultContextValue: ChatContextType = {
  sidebarCtx: {
    isSbOpen: false,
    toggleSidebar: () => {},
    setSidebarOpen: () => {},
  },
};

const ChatContext = createContext<ChatContextType>(defaultContextValue);

interface ChatContextProviderProps {
  children: ReactNode;
}

export function ChatContextProvider({ children }: ChatContextProviderProps) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    setSidebarOpen(isLargeScreen);
  }, [isLargeScreen]);

  const context: ChatContextType = {
    sidebarCtx: {
      isSbOpen: isSidebarOpen,
      toggleSidebar: () => setSidebarOpen((prev) => !prev),
      setSidebarOpen,
    },
  };

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);

export default ChatContext;
