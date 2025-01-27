import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
export default function SignInPage() {
  return (
    <Suspense fallback={<LoadingBubbles />}>
      <SignIn />
    </Suspense>
  );
}
