import { Tooltip, TooltipProps } from "@mui/material";

export const TooltipArrow = ({ children, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow enterDelay={500}>
    {children}
  </Tooltip>
);
