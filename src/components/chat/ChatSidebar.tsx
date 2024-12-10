import css from "@/styles/chat/ChatSidebar.module.css";
import Logo from "../shared/Logo";
import SidebarToggle from "../shared/SidebarToggle";
import { useChatContext } from "@/context/ChatContext";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import ToggleMode from "../shared/ToggleMode";

interface ChatSidebarProps {
  loading: boolean;
  newChat: () => void;
}

export default function ChatSidebar({ loading, newChat }: ChatSidebarProps) {
  const { sidebarCtx } = useChatContext();

  return (
    <aside className={`${css.wrapper} ${!sidebarCtx.isSbOpen && css.narrow}`}>
      <div className={css.topbar}>
        <Logo />
        <SidebarToggle icon="bi-arrow-left-short" title="Hide Menu" />
      </div>

      <nav className={css.navigation}>
        <Button
          size="small"
          variant="outlined"
          className="!py-2.5"
          disabled={loading}
          onClick={() => newChat()}
        >
          <i className="bi bi-plus-lg"></i>
          <span className="ml-3">New Chat</span>
        </Button>
        <div className={css.chats}>
          <Typography variant="body2">History</Typography>

          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            <span className="ml-3">Chat #1</span>
          </Link>

          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            <span className="ml-3">Chat #2</span>
          </Link>
          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            <span className="ml-3">Chat #3</span>
          </Link>
        </div>
      </nav>

      <div className={css.bottom}>
        <ToggleMode />
        {/*        <i className="bi bi-shield text-lg"></i>
        <span className="ml-3">Bottom</span> */}
      </div>
    </aside>
  );
}
