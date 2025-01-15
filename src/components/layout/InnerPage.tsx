"use client";
import css from "@/styles/layout/InnerPage.module.css";
import { TooltipArrow } from "../shared/TooltipArrow";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import { ReactNode } from "react";

interface InnerPageProps {
  children: ReactNode;
}

export default function InnerPage({ children }: InnerPageProps) {
  const router = useRouter();
  return (
    <div className={css.wrapper}>
      <TooltipArrow
        placement="bottom"
        title="Go Back"
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

      {children}
    </div>
  );
}
