"use client";
import { Button, Typography } from "@mui/material";
import css from "@/styles/shared/PlanCard.module.css";
import { getUserById } from "@/lib/actions/user.actions";
import SpinnerGrow from "./SpinnerGrow";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getPlanIcon } from "@/constants/plans";

export default function PlanCard() {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState<{ role: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user && isLoaded) {
        const data = await getUserById(user?.id);
        setUserData(data);
      }
    };
    fetchData();
  }, [user, isLoaded]);

  if (!userData) {
    return (
      <div className={`${css.wrapper} min-h-40 items-center justify-center`}>
        <SpinnerGrow />
      </div>
    );
  }

  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <div className={css.badge}>Your plan</div>
        <Typography
          variant="h5"
          sx={{
            color: "var(--mui-palette-tertiary-contrastText)",
            trasnsition: "all 150ms",
            textTransform: "capitalize",
            alignItems: "center",
            display: "flex",
            gap: "1rem",
          }}
        >
          <i className={`${getPlanIcon(userData?.role)} text-4xl`}></i>
          <span>{userData?.role}</span>
        </Typography>

        <div className={css.details}>
          Unlock premium features with an upgrade!
        </div>

        <Button
          size="small"
          variant="contained"
          href="/plans"
          className="sizeSmall"
        >
          Upgrade now
        </Button>
      </div>

      <div className={css.background}></div>
    </div>
  );
}
