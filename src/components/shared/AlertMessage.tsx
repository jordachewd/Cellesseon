import {
  Alert,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";

import { useEffect, useState } from "react";

export interface AlertParams {
  text: string;
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
  const { text, severity = "error", variant = "filled" } = message;
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    event?.preventDefault();
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    if (text !== "") {
      setOpenAlert(true);
    }
  }, [message, text]);

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
        {text}
      </Alert>
    </Snackbar>
  );
}
