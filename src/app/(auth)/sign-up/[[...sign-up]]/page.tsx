import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";
export default function SignUpPage() {
  return (
    <Suspense fallback={<LoadingBubbles />}>
      <SignUp />
    </Suspense>
  );
}
