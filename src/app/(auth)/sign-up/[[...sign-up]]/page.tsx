import InnerPage from "@/components/layout/InnerPage";
import { SignUp } from "@clerk/nextjs";
export default function SignUpPage() {
  return (
    <InnerPage>
      <div className="flex mx-auto ">
        <SignUp />
      </div>
    </InnerPage>
  );
}
