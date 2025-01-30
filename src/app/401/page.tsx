"use client";
import PageWrapper from "@/components/layout/PageWrapper";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();
  return (
    <PageWrapper className="justify-center items-center gap-10">
      <Typography variant="h1">Unauthorized</Typography>
      <div className="flex flex-col items-center gap-2 bg-red-800 p-8 rounded-xl shadow-lg">
        <Typography variant="h6">
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
