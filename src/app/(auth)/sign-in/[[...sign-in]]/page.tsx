import InnerPage from "@/components/layout/InnerPage";
import { SignIn } from "@clerk/nextjs";
export default function SignInPage() {
  return (
    <InnerPage>
      <div className="flex mx-auto ">
        <SignIn />
      </div>
    </InnerPage>
  );
}
