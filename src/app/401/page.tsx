"use client";
import PageWrapper from "@/components/layout/PageWrapper";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();
  return (
    <PageWrapper className="justify-center items-center">
      <Typography variant="h1">Unauthorized</Typography>
      <div className="flex flex-col items-center gap-1">
        <Typography variant="body1">
          You do not have the necessary permissions to access this page.
        </Typography>

        <Typography variant="body2">
          Please contact your administrator if you believe this is an error.
        </Typography>
      </div>

      <Button variant="contained" size="small" onClick={() => router.push("/")}>
        Go Back
      </Button>
    </PageWrapper>
  );
};

export default UnauthorizedPage;
