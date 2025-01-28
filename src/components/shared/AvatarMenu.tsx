import { IconButton, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import getFullName, { getNameLetters } from "@/lib/utils/getFullName";
import { useState, MouseEvent } from "react";
import { TooltipArrow } from "./TooltipArrow";
import { useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";

export default function AvatarMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  if (!user) return null;

  const { username, firstName, lastName, publicMetadata, imageUrl } = user;
  const fullName = getFullName({
    firstName: firstName || "",
    lastName: lastName || "",
    username: username || "",
  });

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/" });
  };

  return (
    <div className="flex">
      <TooltipArrow title="Account" placement="bottom">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0, backgroundColor: "transparent!important" }}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          aria-controls={open ? "my-account" : undefined}
        >
          <Avatar
            alt={fullName}
            src={imageUrl}
            sx={{ width: 28, height: 28 }}
            {...getNameLetters(fullName)}
          />
        </IconButton>
      </TooltipArrow>

      <Menu
        keepMounted
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
        onClose={handleCloseUserMenu}
      >
        {publicMetadata.role === "admin" && (
          <Link href="/dashboard">
            <MenuItem>
              <i className="bi bi-speedometer2 mr-4"></i>
              <span>Dashboard</span>
            </MenuItem>
          </Link>
        )}

        <MenuItem>
          <i className="bi bi-graph-up mr-4"></i>
          <span>Plans</span>
        </MenuItem>

        <Link href="/profile">
          <MenuItem>
            <i className="bi bi-person mr-4"></i>
            <span>Profile</span>
          </MenuItem>
        </Link>

        <Divider />

        <MenuItem onClick={handleSignOut}>
          <i className="bi bi-box-arrow-right mr-4"></i>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
