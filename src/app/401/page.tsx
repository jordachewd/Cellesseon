"use client";
import PageWrapper from "@/components/layout/page-wrapper";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();
  return (
    <PageWrapper className="items-center justify-center gap-10">
      <h1 className="heading-1 text-center">Unauthorized</h1>
      <div className="flex flex-col items-center gap-2 rounded-xl bg-red-800 p-8 shadow-lg">
        <h2 className="heading-6 text-center text-white">
          You do not have the necessary permissions to access this page.
        </h2>

        <p className="body-2 text-center text-white">
          Please contact your administrator if you believe this is an error.
        </p>
      </div>

      <button
        type="button"
        className="btn btn-sm btn-contained"
        onClick={() => router.push("/")}
      >
        Go Back
      </button>
    </PageWrapper>
  );
};

export default UnauthorizedPage;
