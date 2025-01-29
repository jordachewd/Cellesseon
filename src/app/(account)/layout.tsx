import ChatHeader from "@/components/chat/ChatHeader";
import InnerPage from "@/components/layout/InnerPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <InnerPage>
      <ChatHeader />
      {children}
    </InnerPage>
  );
}
