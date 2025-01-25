import css from "@/styles/chat/ChatSidebar.module.css";
import Logo from "../shared/Logo";
import SidebarToggle from "../shared/SidebarToggle";
import Link from "next/link";
import AvatarMenu from "../shared/AvatarMenu";
import { useChatContext } from "@/context/ChatContext";
import { Button, Typography } from "@mui/material";
import { UserData } from "@/types/UserData.d";
import PlanPromo from "../shared/PlanPromo";

interface ChatSidebarProps {
  userData: UserData | null;
  loading: boolean;
  newChat: () => void;
}

export default function ChatSidebar({
  userData,
  loading,
  newChat,
}: ChatSidebarProps) {
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
          <span className="ml-3">New Task</span>
        </Button>

        <div className={css.chats}>
          <Typography variant="body2">History</Typography>

          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            <span className="ml-3">Task #1</span>
          </Link>

          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            <span className="ml-3">Task #2</span>
          </Link>
          <Link href="/">
            <i className="bi bi-chat-dots text-lg"></i>
            <span className="ml-3">Task #3</span>
          </Link>
        </div>
      </nav>

      {userData && (
        <div className="px-3 py-4">
          <PlanPromo userPlan={userData.plan} />
        </div>
      )}

      <div className={css.bottom}>
        <AvatarMenu />
      </div>
    </aside>
  );
}
