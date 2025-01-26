
import PageWrapper from "@/components/layout/PageWrapper";
import { AccountContextProvider } from "@/context/AccountContext";
import css from "@/styles/sections/MainPage.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AccountContextProvider>
      <PageWrapper>
        <div className={css.wrapper}>
          <div className={css.section}>{children}</div>
        </div>
      </PageWrapper>
    </AccountContextProvider>
  );
}
