import { SignUp } from "@clerk/nextjs";
export default function SignUpPage() {
  return (
    <div className="h-full min-h-dvh flex items-center justify-center">
      <SignUp />
    </div>
  );
}
