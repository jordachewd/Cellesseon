import ChatHeader from "@/components/chat/ChatHeader";
import PageWrapper from "@/components/layout/PageWrapper";

interface RouteGroupLayoutProps {
  children: React.ReactNode;
}

export default function RouteGroupLayout({ children }: RouteGroupLayoutProps) {
  return (
    <>
      <ChatHeader />
      <PageWrapper id="PageWrapperContent" scrollable>
        {children}
      </PageWrapper>
    </>
  );
}
