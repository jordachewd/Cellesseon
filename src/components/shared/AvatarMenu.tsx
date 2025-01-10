import { IconButton, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { useState } from "react";
import { TooltipArrow } from "./TooltipArrow";
import { useClerk, useUser } from "@clerk/clerk-react";
import SpinnerGrow from "./SpinnerGrow";
import Link from "next/link";

function stringAvatar(name: string) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function AvatarMenu() {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);
  const userName = user?.firstName + " " + user?.lastName;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  if (!isLoaded) {
    return (
      <div className="flex">
        <SpinnerGrow />
      </div>
    );
  }

  return (
    <div className="flex">
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
        sx={{ mt: "1rem" }}
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
        onClose={() => setAnchorElUser(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorElUser(null);
          }}
        >
          <Link href="/plans">
            <i className="bi bi-graph-up mr-4"></i>
            My plan
          </Link>
        </MenuItem>

        <MenuItem onClick={() => setAnchorElUser(null)}>
          <i className="bi bi-sliders2-vertical mr-4"></i>
          Settings
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => signOut({ redirectUrl: "/" })}>
          <i className="bi bi-box-arrow-right mr-4"></i>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
