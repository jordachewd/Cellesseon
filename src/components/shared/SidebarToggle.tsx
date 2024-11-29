import { IconButton } from "@mui/material";
import { TooltipArrow } from "./TooltipArrow";
import { useChatContext } from "@/context/ChatContext";

interface SidebarToggleProps {
  title?: string | null;
  show?: boolean;
  icon: string;
}

export default function SidebarToggle({
  title = null,
  show = true,
  icon,
}: SidebarToggleProps) {
  const { sidebarCtx } = useChatContext();

  return show ? (
    <TooltipArrow
      placement="right"
      title={show ? title : null}
      className="!transition-all"
    >
      <IconButton size="small" onClick={() => sidebarCtx.toggleSidebar()}>
        <i className={`bi text-lg ${icon}`}></i>
      </IconButton>
    </TooltipArrow>
  ) : null;
}
