import { Tooltip, TooltipProps } from "@/components/shared/mui";

export const TooltipArrow = ({ children, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow enterDelay={500}>
    {children}
  </Tooltip>
);
