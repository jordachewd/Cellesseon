import ChatWrapper from "@/components/chat/ChatWrapper";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { getUserById } from "@/lib/actions/user.actions";
import { UserData } from "@/types/UserData.d";
import { auth } from "@clerk/nextjs/server";

export default async function ChatWorkspace() {
  const { userId } = await auth();
  let userData: UserData | undefined = undefined;

  if (userId) {
    userData = await getUserById(userId);
  }

  return userData ? (
    <ChatWrapper userData={userData} />
  ) : (
    <LoadingBubbles wrapped />
  );
}
