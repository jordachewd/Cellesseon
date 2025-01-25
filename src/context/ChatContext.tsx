"use client";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface ChatProviderProps {
  children: ReactNode;
}

interface UserCtx {
  isSignedIn: boolean;
}

interface SidebarCtx {
  isSbOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

interface ChatContextType {
  userCtx: UserCtx;
  sidebarCtx: SidebarCtx;
}

const defaultContextValue: ChatContextType = {
  userCtx: {
    isSignedIn: false, /* unused!!! */
  },
  sidebarCtx: {
    isSbOpen: false,
    toggleSidebar: () => {},
    setSidebarOpen: () => {},
  },
};

const ChatContext = createContext<ChatContextType>(defaultContextValue);

export function ChatContextProvider({ children }: ChatProviderProps) {
  const theme = useTheme();
  const { isSignedIn } = useUser();
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    setSidebarOpen(isLgScreen);
  }, [isLgScreen]);

  const context: ChatContextType = {
    userCtx: {
      isSignedIn: isSignedIn || false,
    },
    sidebarCtx: {
      isSbOpen: sidebarOpen,
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
