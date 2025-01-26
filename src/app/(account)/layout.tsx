import PageWrapper from "@/components/layout/PageWrapper";
import { AccountContextProvider } from "@/context/AccountContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AccountContextProvider>
      <PageWrapper>{children}</PageWrapper>
    </AccountContextProvider>
  );
}
