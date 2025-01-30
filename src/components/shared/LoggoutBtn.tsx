"use client";
import { useClerk } from "@clerk/nextjs";

export default function LoggoutBtn() {
  const { signOut } = useClerk();
  return (
    <span className="flex flex-1" onClick={() => signOut({ redirectUrl: "/" })}>
      <i className="bi bi-box-arrow-right mr-4"></i>
      Logout
    </span>
  );
}
