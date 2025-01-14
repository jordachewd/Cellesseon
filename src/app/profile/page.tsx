"use client";
import css from "@/styles/sections/Plans.module.css";
import { useUser } from "@clerk/nextjs";
import { IconButton, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { TooltipArrow } from "@/components/shared/TooltipArrow";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className={css.wrapper}>
      <TooltipArrow
        placement="right"
        title="Back to previous page"
        className="!transition-all"
      >
        <IconButton
          size="small"
          onClick={() => router.back()}
          className={css.backBtn}
        >
          <i className="bi bi-arrow-90deg-left"></i>
        </IconButton>
      </TooltipArrow>

      <section className={css.section}>
        <div className={css.head}>
          <Typography variant="h2">My profile</Typography>
        </div>
        <div className="flex w-full">
          <Typography variant="h6">
            {user?.firstName} {user?.lastName}
            Other user details
          </Typography>
        </div>
      </section>
    </div>
  );
}
