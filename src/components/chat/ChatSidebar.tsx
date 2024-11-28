import css from "./ChatSidebar.module.css";
import Logo from "../shared/Logo";
import SidebarToggle from "../shared/SidebarToggle";
import { useChatContext } from "@/context/ChatContext";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

interface ChatSidebarProps {
  loading: boolean;
  newChat: () => void;
}

export default function ChatSidebar({ loading, newChat }: ChatSidebarProps) {
  const { sidebarCtx } = useChatContext();
  return (
    <aside className={`${css.wrapper} ${sidebarCtx.isSbOpen && css.narrow}`}>
      <div className={css.topbar}>
        <Logo symbol={sidebarCtx.isSbOpen} />
        <SidebarToggle
          icon="bi-arrow-left-short"
          show={!sidebarCtx.isSbOpen}
          title="Hide Menu"
        />
      </div>

      <nav className={css.navigation}>
        <Button variant="outlined" disabled={loading} onClick={() => newChat()}>
          <i className="bi bi-plus-lg"></i>
          {!sidebarCtx.isSbOpen && <span className="ml-3">New Chat</span>}
        </Button>
        <div className={css.chats}>
          {!sidebarCtx.isSbOpen && (
            <Typography variant="h6">History</Typography>
          )}

          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            {!sidebarCtx.isSbOpen && <span className="ml-3">Chat #1</span>}
          </Link>

          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            {!sidebarCtx.isSbOpen && <span className="ml-3">Chat #2</span>}
          </Link>
          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            {!sidebarCtx.isSbOpen && <span className="ml-3">Chat #3</span>}
          </Link>
        </div>
      </nav>

      <div className={css.bottom}>
        <i className="bi bi-shield-check text-lg"></i>
        {!sidebarCtx.isSbOpen && <span className="ml-3">Bottom </span>}
      </div>
    </aside>
  );
}
