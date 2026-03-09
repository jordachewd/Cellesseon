"use client";

import getFullName, { getNameLetters } from "@/lib/utils/getFullName";
import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { TooltipArrow } from "./tooltip-arrow";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import LogoutBtn from "./logout-btn";

export default function AvatarMenu() {
  const { user } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onOutsideClick = (event: globalThis.MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", onOutsideClick);
    return () => window.removeEventListener("click", onOutsideClick);
  }, []);

  if (!user) return null;

  const { username, firstName, lastName, publicMetadata, imageUrl } = user;
  const fullName = getFullName({
    firstName: firstName || "",
    lastName: lastName || "",
    username: username || "",
  });
  const initials = getNameLetters(fullName).children;

  const handleToggleUserMenu = (event: ReactMouseEvent<HTMLElement>) => {
    event.preventDefault();
    setOpen((prevState) => !prevState);
  };

  const handleCloseUserMenu = () => setOpen(false);

  return (
    <div className="AvatarMenu relative flex" ref={wrapperRef}>
      <TooltipArrow title="Account" placement="bottom">
        <button
          type="button"
          onClick={handleToggleUserMenu}
          className="inline-flex rounded-full bg-transparent p-0"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          aria-controls={open ? "my-account" : undefined}
          aria-label="Account menu"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-lightPrimary-500 text-[13px] font-semibold text-white shadow-[0px_0px_5px_0px_rgba(122,75,204,0.3)]">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </span>
        </button>
      </TooltipArrow>

      {open && (
        <div
          id="my-account"
          className="absolute right-0 top-full z-40 mt-2 min-w-[180px] rounded-lg bg-lightBackground-100 py-2 shadow-[0px_0px_6px_0px_rgba(122,75,204,0.2)] dark:bg-jwdMarine-900"
        >
          {publicMetadata.role === "admin" && (
            <Link
              href="/dashboard"
              className="flex min-w-[180px] items-center px-5 py-2 text-sm transition-all duration-300 ease-in-out hover:text-white dark:hover:text-lightBackground-200"
              onClick={handleCloseUserMenu}
            >
              <i className="bi bi-speedometer2 mr-4"></i>
              <span>Dashboard</span>
            </Link>
          )}

          <Link
            href="/plans"
            className="flex min-w-[180px] items-center px-5 py-2 text-sm transition-all duration-300 ease-in-out hover:text-white dark:hover:text-lightBackground-200"
            onClick={handleCloseUserMenu}
          >
            <i className="bi bi-graph-up mr-4"></i>
            <span>Plans</span>
          </Link>

          <Link
            href="/profile"
            className="flex min-w-[180px] items-center px-5 py-2 text-sm transition-all duration-300 ease-in-out hover:text-white dark:hover:text-lightBackground-200"
            onClick={handleCloseUserMenu}
          >
            <i className="bi bi-person mr-4"></i>
            <span>Profile</span>
          </Link>

          <hr className="my-1 border-jwdAqua-100/20" />

          <div className="flex min-w-[180px] items-center px-5 py-2 text-sm">
            <LogoutBtn />
          </div>
        </div>
      )}
    </div>
  );
}
