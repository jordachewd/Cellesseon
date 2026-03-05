import { TooltipArrow } from "./tooltip-arrow";

interface SidebarToggleProps {
  title?: string | null;
  show?: boolean;
  icon: string;
  toggleSidebar: () => void;
}

export default function SidebarToggle({
  title = null,
  show = true,
  icon,
  toggleSidebar,
}: SidebarToggleProps) {
  return show ? (
    <TooltipArrow
      placement="right"
      title={show ? title : null}
      className="transition-all"
    >
      <button
        type="button"
        onClick={() => toggleSidebar()}
        className="icon-btn"
        aria-label={title || "Toggle sidebar"}
      >
        <i className={`bi ${icon}`}></i>
      </button>
    </TooltipArrow>
  ) : null;
}
