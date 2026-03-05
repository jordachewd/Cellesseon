"use client";
import {
  Alert,
  AlertTitle,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarCloseReason,
} from "@/components/shared/mui";

import { useMemo, useState } from "react";

export interface AlertParams {
  title: string;
  text?: string;
  severity?: "info" | "error" | "success" | "warning";
  variant?: "filled" | "outlined";
}

interface AlertMessageProps {
  message: AlertParams;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export default function AlertMessage({ message }: AlertMessageProps) {
  const { title, text = "", severity = "error", variant = "filled" } = message;
  const [dismissedAlert, setDismissedAlert] = useState<string | null>(null);
  const currentAlertKey = useMemo(
    () => `${title}:${text}:${severity}:${variant}`,
    [severity, text, title, variant],
  );
  const openAlert = text !== "" && dismissedAlert !== currentAlertKey;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    event?.preventDefault();
    if (reason === "clickaway") {
      return;
    }

    setDismissedAlert(currentAlertKey);
  };

  return (
    <Snackbar
      open={openAlert}
      onClose={handleClose}
      autoHideDuration={10000}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ zIndex: "100" }}
    >
      <Alert onClose={handleClose} variant={variant} severity={severity}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {text}
      </Alert>
    </Snackbar>
  );
}
