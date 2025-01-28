import ProfileBilling from "@/components/sections/ProfileBilling";
import ProfileHero from "@/components/sections/ProfileHero";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { getAllTransactions } from "@/lib/actions/transaction.action";
import { getUserById } from "@/lib/actions/user.actions";
import { Transaction } from "@/types/TransactionData.d";
import { UserData } from "@/types/UserData.d";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId } = await auth();
  let userData: UserData | undefined = undefined;
  let userTxns: Transaction[] | undefined = undefined;

  if (userId) {
    userData = await getUserById(userId);
    userTxns = await getAllTransactions(userId);
  }

  const stripeId = userData?.plan.stripeId;

  return (
    <>
      {userData ? (
        <>
          <ProfileHero userData={userData} />
          <ProfileBilling stripeId={stripeId} userTxns={userTxns} />
        </>
      ) : (
        <div className="flex justify-center items-center h-dvh">
          <LoadingBubbles />
        </div>
      )}
    </>
  );
}
