import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState, MouseEvent } from "react";
import { TooltipArrow } from "./TooltipArrow";
import { useClerk, useUser } from "@clerk/clerk-react";
import getUserName, { stringAvatar } from "@/lib/utils/getUserName";

export default function AvatarMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  if (!user) return;

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const userName = getUserName({
    first_name: user?.firstName || "",
    last_name: user?.lastName || "",
    username: user?.username || "",
  });

  const userRole = user?.publicMetadata?.role;

  return (
    <div className="flex">
      <TooltipArrow title="My account" placement="bottom">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0, backgroundColor: "transparent!important" }}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          aria-controls={open ? "my-account" : undefined}
        >
          <Avatar
            {...stringAvatar(userName)}
            alt={userName}
            src={user?.imageUrl}
            className="mr-4"
          />
          <Typography variant="body2">{userName}</Typography>
        </IconButton>
      </TooltipArrow>

      <Menu
        keepMounted
        sx={{ mt: "1rem" }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
      >
        {userRole === "admin" && (
          <Link href="/dashboard">
            <MenuItem>
              <i className="bi bi-speedometer2 mr-4"></i>
              <span>Dashboard</span>
            </MenuItem>
          </Link>
        )}

        <Link href="/plans">
          <MenuItem>
            <i className="bi bi-graph-up mr-4"></i>
            <span>Plans</span>
          </MenuItem>
        </Link>

        <Link href="/profile">
          <MenuItem>
            <i className="bi bi-person mr-4"></i>
            <span>Profile</span>
          </MenuItem>
        </Link>

        <Divider />

        <MenuItem onClick={() => signOut({ redirectUrl: "/" })}>
          <i className="bi bi-box-arrow-right mr-4"></i>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
