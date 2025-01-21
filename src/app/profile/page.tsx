import css from "@/styles/shared/Profile.module.css";
import InnerPage from "@/components/layout/InnerPage";
import SpinnerGrow from "@/components/shared/SpinnerGrow";
import getUserName, { stringAvatar } from "@/lib/utils/getUserName";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import PlanCard from "@/components/shared/PlanCard";
import { auth } from "@clerk/nextjs/server";
import { Avatar, Typography } from "@mui/material";
import { getUserById } from "@/lib/actions/user.actions";
import PlanCountDown from "@/components/shared/PlanCountDown";
import { getAllTransactions } from "@/lib/actions/transaction.action";
import { Transaction } from "@/types/TransactionData.d";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <section className={css.section}>
        <SpinnerGrow size="large" />
      </section>
    );
  }

  const profile = await getUserById(userId);
  const userName = getUserName({
    first_name: profile.firstName,
    last_name: profile.lastName,
    username: profile.username,
  });

  const transactions: Transaction[] = await getAllTransactions(userId);

  return (
    <InnerPage>
      <section className={css.section}>
        <div className={css.head}>
          <Typography variant="h2">My profile</Typography>
        </div>

        <div className={css.hero}>
          <div className={css.heroImg}>
            <Avatar
              {...stringAvatar(userName)}
              alt={userName}
              src={profile.clerkImg}
              sx={{ width: 80, height: 80 }}
            />
            <div className={css.heroImgContent}>
              <Typography variant="h4">{userName}</Typography>
              <Typography variant="body1">{profile.email}</Typography>
            </div>
          </div>

          <div className={css.heroContent}>
            <span>
              <b>Member since: </b> <br />
              {getFormattedDate(profile.registerAt)}
            </span>
            <span>
              <b>Last update: </b> <br /> {getFormattedDate(profile.updatedAt)}
            </span>

            <span>
              <b>Plan expires on: </b> <br />
              {getFormattedDate(profile.plan.expiresOn)}
            </span>

            <span>
              <PlanCountDown endDate={profile.plan.expiresOn} />
            </span>
          </div>

          <div className={css.heroPlan}>
            <PlanCard />
          </div>
        </div>
      </section>
      <section className={css.section}>
        <div className={css.head}>
          <Typography variant="h3">Billing history</Typography>
        </div>
        <div className={css.content}>
          {transactions.length > 0 ? (
            <div className="flex flex-col w-full gap-3 my-4">
              <div className="flex justify-between gap-3 p-3">
                <Typography variant="body1" sx={{ width: "220px" }}>
                  <b>Date</b>
                </Typography>
                <Typography variant="body1">
                  <b>Plan</b>
                </Typography>
                <Typography variant="body1">
                  <b>Amount</b>
                </Typography>
              </div>
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between gap-3 p-3 border rounded-lg border-white/20"
                >
                  <Typography variant="body2" sx={{ width: "220px" }}>
                    {getFormattedDate(transaction.createdAt)}
                  </Typography>
                  <Typography variant="body2">{transaction.plan}</Typography>
                  <Typography variant="body2">${transaction.amount}</Typography>
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="body1">
              You have no billing history yet.
            </Typography>
          )}
        </div>
      </section>
    </InnerPage>
  );
}
