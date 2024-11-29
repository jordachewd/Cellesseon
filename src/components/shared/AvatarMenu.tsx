import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { TooltipArrow } from "./TooltipArrow";
import { useClerk, useUser } from "@clerk/clerk-react";
import SpinnerGrow from "./SpinnerGrow";

interface AvatarMenuProps {
  className?: string;
}

function stringAvatar(name: string) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function AvatarMenu({ className }: AvatarMenuProps) {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!isLoaded) {
    return (
      <div className={`flex ${className}`}>
        <SpinnerGrow />
      </div>
    );
  }

  const userName = user?.firstName + " " + user?.lastName;

  return (
    <div className={`flex ${className}`}>
      <TooltipArrow title="My account" placement="left">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          aria-controls={open ? "my-account" : undefined}
        >
          <Avatar
            {...stringAvatar(userName)}
            alt={userName || "User Name"}
            src={user?.imageUrl}
          />
        </IconButton>
      </TooltipArrow>
      <Menu
        keepMounted
        sx={{ mt: "1.5rem" }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <i className="bi bi-graph-up text-xs mr-3"></i>
          <Typography>My plan</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <i className="bi bi-sliders2-vertical text-xs mr-3"></i>
          <Typography>Settings</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => signOut({ redirectUrl: "/" })}>
          <i className="bi bi-box-arrow-right text-sm mr-3"></i>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
