import ChatHeader from "@/components/chat/ChatHeader";
import PageWrapper from "@/components/layout/PageWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChatHeader />
      <PageWrapper id="PageWrapperContent" scrollable>
        {children}
      </PageWrapper>
    </>
  );
}
