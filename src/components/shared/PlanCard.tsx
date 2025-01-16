"use client";
import { Typography } from "@mui/material";
import css from "@/styles/shared/PlanCard.module.css";
import { getUserById } from "@/lib/actions/user.actions";
import SpinnerGrow from "./SpinnerGrow";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

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
      <div className={css.wrapper}>
        <SpinnerGrow />
      </div>
    );
  }

  return (
    <div className={css.wrapper}>
      <Typography
        variant="h6"
        sx={{ color: "var(--mui-palette-tertiary-contrastText)" }}
      >
        Current plan
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textTransform: "capitalize",
          color: "var(--mui-palette-tertiary-contrastText)",
        }}
      >
        {userData?.role}
      </Typography>
    </div>
  );
}
