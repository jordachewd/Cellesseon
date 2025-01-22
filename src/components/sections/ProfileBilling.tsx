import getFormattedDate from "@/lib/utils/getFormattedDate";
import { Typography } from "@mui/material";
import css from "@/styles/sections/ProfileBilling.module.css";
import { auth } from "@clerk/nextjs/server";
import SpinnerGrow from "@/components/shared/SpinnerGrow";
import { getAllTransactions } from "@/lib/actions/transaction.action";
import { Transaction } from "@/types/TransactionData.d";

export default async function ProfileBilling() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <section className={css.section}>
        <div className="flex justify-center items-center">
          <SpinnerGrow size="large" />
        </div>
      </section>
    );
  }

  const transactions: Transaction[] = await getAllTransactions(userId);

  return (
    <section className={css.section}>
      <div className={css.head}>
        <Typography variant="h3">Billing history</Typography>
      </div>
      <div className={css.content}>
        {transactions.length > 0 ? (
          <div key="unique-key-1" className="flex flex-col w-full gap-3 my-4">
            <div className="flex justify-between gap-3 p-3">
              <Typography variant="body1" sx={{ width: "30%" }}>
                <b>Date</b>
              </Typography>
              <Typography variant="body1">
                <b>Plan</b>
              </Typography>
              <Typography variant="body1">
                <b>Billing</b>
              </Typography>
            </div>
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id || index}
                className="flex justify-between gap-2 py-2 px-3 border rounded-md border-white/20"
              >
                <Typography variant="body2" sx={{ width: "30%", fontSize: 14 }}>
                  {getFormattedDate(transaction.createdAt)}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                  {transaction.plan}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                  ${transaction.amount} / {transaction.billing}
                </Typography>
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
  );
}
