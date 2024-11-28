import { useEffect, useState } from "react";
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
  const [opacity, setOpacity] = useState("opacity-100");
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (!show) {
      setIsVisible(false);
      const timeout = setTimeout(() => {
        setOpacity("opacity-0");
      }, 100);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setIsVisible(true);
      const timeout1 = setTimeout(() => {
        setOpacity("opacity-100");
      }, 100);

      return () => {
        clearTimeout(timeout1);
      };
    }
  }, [show]);

  return isVisible ? (
    <TooltipArrow
      placement="right"
      title={show ? title : null}
      className={`!transition-all ${show && opacity}`}
    >
      <IconButton
        onClick={() => sidebarCtx.updateSb()}
        sx={{ p: 0, paddingX: "5px" }}
      >
        <i className={`bi text-lg ${icon}`}></i>
      </IconButton>
    </TooltipArrow>
  ) : null;
}
